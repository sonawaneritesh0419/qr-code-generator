import type { VCardData, WifiData } from "@/types/qr";

/* ---------- helpers ---------- */

export function normalizeUrl(input: string): string {
  const value = input.trim();
  if (!value) return "";
  // https:// nasel tar auto add
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
}

export function isValidUrl(input: string): boolean {
  try {
    const url = new URL(normalizeUrl(input));
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return url.hostname === "localhost" || url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function cleanPhone(input: string): string {
  return input.replace(/[\s\-()]/g, "");
}

// WiFi QR madhe \ ; , : " la backslash lagto
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

// vCard text escape
function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/([;,])/g, "\\$1");
}

/* ---------- payload builders ---------- */

export function buildTextPayload({ text }: { text: string }): string {
  return text;
}

export function buildUrlPayload({ url }: { url: string }): string {
  return normalizeUrl(url);
}

export function buildPhonePayload({ phone }: { phone: string }): string {
  return `tel:${cleanPhone(phone)}`;
}

export function buildWifiPayload(data: WifiData): string {
  const parts = [`T:${data.encryption}`, `S:${escapeWifi(data.ssid)}`];

  if (data.encryption !== "nopass" && data.password) {
    parts.push(`P:${escapeWifi(data.password)}`);
  }
  if (data.hidden) parts.push("H:true");

  return `WIFI:${parts.join(";")};;`;
}

export function buildVCardPayload(data: VCardData): string {
  const first = data.firstName.trim();
  const last = data.lastName?.trim() ?? "";
  const fullName = [first, last].filter(Boolean).join(" ");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard(last)};${escapeVCard(first)};;;`,
    `FN:${escapeVCard(fullName)}`,
  ];

  if (data.organization) lines.push(`ORG:${escapeVCard(data.organization)}`);
  if (data.jobTitle) lines.push(`TITLE:${escapeVCard(data.jobTitle)}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${cleanPhone(data.phone)}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.website) lines.push(`URL:${normalizeUrl(data.website)}`);

  lines.push("END:VCARD");
  return lines.join("\r\n");
}