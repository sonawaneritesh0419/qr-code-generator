import { Contact, Link2, Phone, Type, Wifi, type LucideIcon } from "lucide-react";
import type { QrType } from "@/types/qr";

export interface QrTypeConfig {
  id: QrType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const QR_TYPES: QrTypeConfig[] = [
  {
    id: "text",
    label: "Text",
    description: "Any plain text or message.",
    icon: Type,
  },
  {
    id: "url",
    label: "URL",
    description: "Open a website when scanned.",
    icon: Link2,
  },
  {
    id: "phone",
    label: "Phone",
    description: "Dial a mobile number instantly.",
    icon: Phone,
  },
  {
    id: "wifi",
    label: "WiFi",
    description: "Join a WiFi network without typing the password.",
    icon: Wifi,
  },
  {
    id: "vcard",
    label: "vCard",
    description: "Share contact details in one scan.",
    icon: Contact,
  },
];

export function getQrType(id: string): QrTypeConfig | undefined {
  return QR_TYPES.find((t) => t.id === id);
}