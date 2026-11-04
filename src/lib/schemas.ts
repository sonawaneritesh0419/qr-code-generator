import { z } from "zod";
import { cleanPhone, isValidUrl } from "@/lib/qr/payloads";

const PHONE_REGEX = /^\+?\d{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const URL_MESSAGE = "Enter a valid URL, e.g. https://example.com";
const PHONE_MESSAGE = "Enter a valid number, e.g. +919876543210";

/* reusable field rules */
const requiredUrl = z
  .string()
  .trim()
  .min(1, "URL is required")
  .refine(isValidUrl, URL_MESSAGE);

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || isValidUrl(v), URL_MESSAGE);

const requiredPhone = z
  .string()
  .trim()
  .min(1, "Mobile number is required")
  .refine((v) => PHONE_REGEX.test(cleanPhone(v)), PHONE_MESSAGE);

const optionalPhone = z
  .string()
  .trim()
  .refine((v) => v === "" || PHONE_REGEX.test(cleanPhone(v)), PHONE_MESSAGE);

const optionalEmail = z
  .string()
  .trim()
  .refine((v) => v === "" || EMAIL_REGEX.test(v), "Enter a valid email");

/* schemas */
export const textSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .max(1000, "Max 1000 characters (longer text is hard to scan)"),
});

export const urlSchema = z.object({ url: requiredUrl });

export const phoneSchema = z.object({ phone: requiredPhone });

export const wifiSchema = z
  .object({
    ssid: z
      .string()
      .trim()
      .min(1, "Network name is required")
      .max(32, "Max 32 characters"),
    encryption: z.enum(["WPA", "WEP", "nopass"]),
    password: z.string().max(63, "Max 63 characters"),
    hidden: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.encryption === "nopass") return;

    if (data.password.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Password is required",
      });
    } else if (data.encryption === "WPA" && data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "WPA password must be at least 8 characters",
      });
    }
  });

export const vcardSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().max(50),
  phone: optionalPhone,
  email: optionalEmail,
  organization: z.string().trim().max(100),
  jobTitle: z.string().trim().max(100),
  website: optionalUrl,
});

/* types (schema pasun auto) */
export type TextValues = z.infer<typeof textSchema>;
export type UrlValues = z.infer<typeof urlSchema>;
export type PhoneValues = z.infer<typeof phoneSchema>;
export type WifiValues = z.infer<typeof wifiSchema>;
export type VCardValues = z.infer<typeof vcardSchema>;