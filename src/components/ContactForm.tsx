"use client";

import { useState } from "react";
import { enquiryServiceOptions } from "@/src/data/services";
import { cx } from "@/src/lib/utils";

interface ContactFormProps {
  /** Pre-selected service slug (e.g. from ?service= on the URL). */
  defaultService?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  /** Honeypot — real users never fill this. */
  company: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  company: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please add a few words about your project.";
  }
  return errors;
}

export default function ContactForm({ defaultService }: ContactFormProps) {
  const [values, setValues] = useState<FormState>({
    ...initialState,
    service:
      defaultService &&
      enquiryServiceOptions.some((option) => option.slug === defaultService)
        ? defaultService
        : "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  const update =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFormMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: {
        ok?: boolean;
        delivered?: boolean;
        errors?: FieldErrors;
        message?: string;
      } = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setFormMessage(
          data.message ||
            "Something went wrong sending your request. Please try again.",
        );
        return;
      }

      setStatus("success");
      setFormMessage(
        data.delivered === false
          ? "Thanks — your request has been received. Our team will get back to you shortly."
          : "Thanks — your request has been sent. Our team will get back to you shortly.",
      );
      setValues({ ...initialState });
    } catch {
      setStatus("error");
      setFormMessage(
        "We couldn't reach the server. Please check your connection and try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="contact-form-success" role="status">
        <span className="contact-form-success-icon" aria-hidden="true">
          <i className="bi bi-check-lg" />
        </span>
        <h3>Request received</h3>
        <p>{formMessage}</p>
        <button
          type="button"
          className="contact-form-reset"
          onClick={() => {
            setStatus("idle");
            setFormMessage("");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — visually hidden, ignored by humans. */}
      <div className="contact-form-hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="name">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p className="contact-field-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="phone">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p className="contact-field-error" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="contact-field-error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={update("service")}
          >
            <option value="">Select a service (optional)</option>
            {enquiryServiceOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={update("message")}
          placeholder="Tell us about your signage requirement — size, material, location or a reference image."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p className="contact-field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>

      {formMessage && status === "error" && (
        <p className="contact-form-message contact-form-message-error" role="alert">
          {formMessage}
        </p>
      )}

      <button
        type="submit"
        className={cx("contact-submit", status === "submitting" && "is-loading")}
        disabled={status === "submitting"}
      >
        <span>
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </span>
        <i className="bi bi-arrow-up-right" aria-hidden="true" />
      </button>

      <p className="contact-form-note">
        We&apos;ll only use your details to respond to this enquiry.
      </p>
    </form>
  );
}
