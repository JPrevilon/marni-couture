import { NextResponse } from "next/server";

type NewsletterBody = {
  email?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as NewsletterBody;
  const email =
    typeof body.email === "string" ? body.email.trim() : "";

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {
        message: "Enter a valid email address.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Preview signup received. Connect the approved email provider before launch.",
  });
}
