import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, company, service, message } = await req.json();

    // Send Email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vanguardbusinessservices37@gmail.com",
      subject: `📩 New Website Inquiry - ${name}`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>New Website Inquiry</h2>

          <table style="border-collapse:collapse;width:100%;">
            <tr>
              <td><strong>Name</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><strong>Company</strong></td>
              <td>${company || "-"}</td>
            </tr>

            <tr>
              <td><strong>Service</strong></td>
              <td>${service || "-"}</td>
            </tr>
          </table>

          <hr>

          <h3>Message</h3>

          <p>${message}</p>

        </div>
      `,
    });

    // Send Telegram Notification
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `📩 NEW WEBSITE INQUIRY

👤 Name: ${name}

📧 Email: ${email}

🏢 Company: ${company || "-"}

💼 Service: ${service || "-"}

📝 Message:
${message}`,
        }),
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}