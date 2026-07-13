import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
const resend = new Resend(process.env.RESEND_API_KEY);

function generateQuoteId() {
  const date = new Date();

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `VBS-${y}${m}${d}-${random}`;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);

const result = rateLimit(
  `contact:${ip}`,
  5,
  60 * 1000
);

if (!result.success) {
  return NextResponse.json(
    {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": Math.ceil(
          (result.resetAt - Date.now()) / 1000
        ).toString(),
      },
    }
  );
}
    const body = await req.json();

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const company = body.company?.trim() || "";
    const service = body.service?.trim() || "";
    const country = body.country?.trim() || "";
    const whatsapp = body.whatsapp?.trim() || "";
    const website = body.website?.trim() || "";
    const budget = body.budget?.trim() || "";
    const contactMethod = body.contactMethod?.trim() || "";
    const projectDetails = body.projectDetails?.trim() || "";

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Please select a service." },
        { status: 400 }
      );
    }

    const quoteId = generateQuoteId();
    const submittedAt = new Date().toISOString();

    const { error: dbError } = await supabase
      .from("quotes")
      .insert({
        quote_id: quoteId,
        full_name: name,
        email,
        whatsapp,
        country,
        business_name: company,
        website,
        service,
        budget,
        contact_method: contactMethod,
        project_details: projectDetails,
      });

    if (dbError) {
      console.error("Supabase Error:", dbError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to save quote.",
        },
        {
          status: 500,
        }
      );
    }

    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        quote_id: quoteId,
        service,
        amount:
          Number(String(budget || "0").replace(/[^0-9.]/g, "")) || 0,
        currency: "USD",
        payment_status: "pending",
      });

    if (paymentError) {
      console.error("Payment Table Error:", paymentError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to initialize payment.",
        },
        {
          status: 500,
        }
      );
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>New Quote Request</title>
</head>

<body style="margin:0;padding:30px;background:#f5f7fb;font-family:Arial,sans-serif;">

<h1>Vanguard Business Services</h1>

<p>A new consultation request has been received.</p>

<hr>

<p><strong>Quote ID:</strong> ${quoteId}</p>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Business:</strong> ${escapeHtml(company || "-")}</p>
<p><strong>Country:</strong> ${escapeHtml(country || "-")}</p>
<p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp || "-")}</p>
<p><strong>Website:</strong> ${escapeHtml(website || "-")}</p>
<p><strong>Service:</strong> ${escapeHtml(service)}</p>
<p><strong>Budget:</strong> ${escapeHtml(budget || "-")}</p>
<p><strong>Preferred Contact:</strong> ${escapeHtml(contactMethod || "-")}</p>

<hr>

<h3>Project Details</h3>

<p>${escapeHtml(projectDetails || "-")}</p>

</body>
</html>
`;
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vanguardbusinessservices37@gmail.com",
      replyTo: email,
      subject: `📩 ${quoteId} | ${service} | ${name}`,
      html,
    });

    const telegramMessage = `
📩 NEW CONSULTATION REQUEST

🆔 Quote ID
${quoteId}

👤 Name
${name}

📧 Email
${email}

🏢 Business
${company || "-"}

🌍 Country
${country || "-"}

📱 WhatsApp
${whatsapp || "-"}

🌐 Website
${website || "-"}

💼 Service
${service}

💰 Budget
${budget || "-"}

☎ Preferred Contact
${contactMethod || "-"}

🕒 Submitted
${submittedAt}

━━━━━━━━━━━━━━━━━━

📝 Project Details

${projectDetails || "-"}
`;

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: telegramMessage,
          }),
        }
      );

      const telegramResult = await telegramResponse.json();

      console.log("Telegram Status:", telegramResponse.status);
      console.log("Telegram Result:", telegramResult);

      if (!telegramResponse.ok) {
        console.error("Telegram API Error:", telegramResult);
      }
    } catch (telegramError) {
      console.error("Telegram Error:", telegramError);
    }

    return NextResponse.json({
      success: true,
      quoteId,
      message:
        "Your consultation request has been submitted successfully.",
    });

  } catch (error) {
    console.error("FULL CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      {
        status: 500,
      }
    );
  }
}