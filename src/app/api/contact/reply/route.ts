import { NextResponse } from "next/server";
import { headers as nextHeaders } from "next/headers";
import { getPayload } from "@/lib/payload";

const SITE_URL = process.env.SITE_URL || "https://www.enidpath.com";
const LOGO_URL = `${SITE_URL}/logo_enidpath.png`;

export async function POST(request: Request) {
  try {
    const payload = await getPayload();
    const { user } = await payload.auth({ headers: await nextHeaders() });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { to, name, subject, message } = await request.json();

    if (!to || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await payload.sendEmail({
      to,
      subject: subject || "Re: Your enquiry — EnidPath International",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px">
  <div style="text-align:center;margin-bottom:24px">
    <img src="${LOGO_URL}" alt="EnidPath International" style="height:60px;width:auto;object-fit:contain;margin-bottom:8px" /><br/>
    <p style="color:#6b7280;font-size:14px;margin:0">Your Gateway to UK Higher Education</p>
  </div>

  <p style="font-size:15px;color:#374151">Hello ${name || ""},</p>

  <div style="font-size:15px;line-height:1.8;color:#374151;white-space:pre-wrap">${message}</div>

  <p style="font-size:15px;color:#374151;margin-top:24px">
    Warm regards,<br>
    <strong>The EnidPath Team</strong>
  </p>

  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center">
    EnidPath International · <a href="https://www.enidpath.com" style="color:#9ca3af">www.enidpath.com</a>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send reply", error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}
