import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // Initialize Resend inside the POST function
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();

    const { name, email, company, service, message } = body;

    // Send Email
    const emailResult = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vanguardbusinessservices37@gmail.com",
      subject: "📩 New Website Inquiry",
      html: `
        <h2>New Client Inquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service:</strong> ${service}</p>

        <hr />

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    console.log("Email Result:", emailResult);

    // Send Telegram Message
    const telegramResult = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `
📩 New Website Inquiry

👤 Name: ${name}

📧 Email: ${email}

🏢 Company: ${company}

💼 Service: ${service}

📝 Message:
${message}
`,
        }),
      }
    );

    console.log("Telegram Status:", telegramResult.status);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}