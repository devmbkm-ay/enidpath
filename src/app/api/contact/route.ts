import { NextResponse } from "next/server";
import { z } from "zod";
import { getPayload } from "@/lib/payload";


// This API route handles contact form submissions. It validates the incoming data, stores it in the Payload CMS, and sends notification emails to both the team and the user who submitted the form.
const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(255),
  phone: z
    .string()
    .trim()
    .max(50)
    .optional()
    .transform((value) => value || undefined),
  subject: z.string().trim().min(2, "Subject is required").max(160),
  message: z.string().trim().min(10, "Message is too short").max(5000),
});

const TEAM_EMAIL = process.env.SMTP_FROM_ADDRESS || "info@enidpath.com";
const SITE_URL = process.env.SITE_URL || "https://www.enidpath.com";
const LOGO_URL = `${SITE_URL}/logo_enidpath-tight.png`;

function notificationHtml(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <div style="text-align:center;margin-bottom:24px">
    <img src="${LOGO_URL}" alt="EnidPath International" style="height:60px;width:auto;object-fit:contain" />
  </div>
  <div style="border-left:4px solid #1d4ed8;padding-left:16px;margin-bottom:24px">
    <h2 style="margin:0;color:#1d4ed8">New Contact Form Submission</h2>
    <p style="margin:4px 0 0;color:#6b7280;font-size:14px">EnidPath International — ${new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" })}</p>
  </div>

  <table style="width:100%;border-collapse:collapse;font-size:15px">
    <tr>
      <td style="padding:10px 12px;background:#f3f4f6;font-weight:600;width:120px;border-radius:4px 0 0 4px">Name</td>
      <td style="padding:10px 12px;background:#f9fafb">${data.name}</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;font-weight:600">Email</td>
      <td style="padding:10px 12px"><a href="mailto:${data.email}" style="color:#1d4ed8">${data.email}</a></td>
    </tr>
    <tr>
      <td style="padding:10px 12px;background:#f3f4f6;font-weight:600">Phone</td>
      <td style="padding:10px 12px;background:#f9fafb">${data.phone || "—"}</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;font-weight:600">Subject</td>
      <td style="padding:10px 12px">${data.subject}</td>
    </tr>
  </table>

  <div style="margin-top:20px">
    <p style="font-weight:600;margin-bottom:8px">Message</p>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;white-space:pre-wrap;font-size:15px;line-height:1.6">${data.message}</div>
  </div>

  <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb">
    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display:inline-block;background:#1d4ed8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600">Reply to ${data.name}</a>
  </div>
</body>
</html>`;
}

function confirmationHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <div style="text-align:center;margin-bottom:32px">
    <img src="${LOGO_URL}" alt="EnidPath International" style="height:60px;width:auto;object-fit:contain;margin-bottom:8px" /><br/>
    <p style="color:#6b7280;font-size:14px;margin:0">Your Gateway to UK Higher Education</p>
  </div>

  <h2 style="color:#1a1a1a">Hello ${name},</h2>
  <p style="font-size:15px;line-height:1.7;color:#374151">
    Thank you for reaching out to us. We have received your message and a member of our team will get back to you within <strong>1–2 business days</strong>.
  </p>
  <p style="font-size:15px;line-height:1.7;color:#374151">
    In the meantime, feel free to explore our programmes or reach us directly on WhatsApp if your enquiry is urgent.
  </p>

  <div style="margin:28px 0;text-align:center">
    <a href="https://www.enidpath.com/courses" style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px">Explore Our Courses</a>
  </div>

  <p style="font-size:15px;line-height:1.7;color:#374151">Warm regards,<br><strong>The EnidPath Team</strong></p>

  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center">
    EnidPath International · <a href="https://www.enidpath.com" style="color:#9ca3af">www.enidpath.com</a>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the form fields and try again.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = parsed.data;
    const payload = await getPayload();

    await payload.create({
      collection: "ContactSubmissions",
      data: { name, email, subject, message, ...(phone ? { phone } : {}) },
      overrideAccess: true,
    });

    await Promise.allSettled([
      payload.sendEmail({
        to: TEAM_EMAIL,
        replyTo: email,
        subject: `[Contact] ${subject} — ${name}`,
        html: notificationHtml({ name, email, phone, subject, message }),
      }),
      payload.sendEmail({
        to: email,
        subject: "We received your message — EnidPath International",
        html: confirmationHtml(name),
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to store contact submission", error);

    return NextResponse.json(
      { error: "Something went wrong while saving your message." },
      { status: 500 },
    );
  }
}
