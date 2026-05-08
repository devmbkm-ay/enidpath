import { NextResponse } from "next/server";
import { z } from "zod";
import { getPayload } from "@/lib/payload";


// Validation schema for contact form submissions
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

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to store contact submission", error);

    return NextResponse.json(
      { error: "Something went wrong while saving your message." },
      { status: 500 },
    );
  }
}
