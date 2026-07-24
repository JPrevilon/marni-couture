"use client";

import { useState, type FormEvent } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

export function DropClub() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(body.message ?? "Unable to submit.");
      }

      setState("success");
      setMessage(
        body.message ??
          "You are on the preview list.",
      );
      event.currentTarget.reset();
      trackEvent("sign_up", { method: "email" });
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit.",
      );
    }
  }

  return (
    <section className="drop-club section-shell" id="drop-club">
      <div className="drop-club__inner section-shell__inner">
        <div className="drop-club__mark" data-reveal>
          <BrandLogo variant="monogram" />
        </div>
        <div className="drop-club__content" data-reveal>
          <p className="eyebrow">Drop club</p>
          <h2>Get the next drop before the feed does.</h2>
          <p>
            The form currently uses a safe local stub. Connect the
            approved email provider during the marketing integration
            step.
          </p>
          <form onSubmit={submit}>
            <label htmlFor="drop-email">
              Email address
            </label>
            <div>
              <input
                id="drop-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
              <button
                type="submit"
                disabled={state === "submitting"}
              >
                {state === "submitting"
                  ? "Joining…"
                  : "Join the drop"}
              </button>
            </div>
            <p
              className="form-message"
              role="status"
              data-state={state}
            >
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
