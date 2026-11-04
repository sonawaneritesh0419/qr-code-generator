export type QrType = "text" | "url" | "phone" | "wifi" | "vcard";

export type WifiEncryption = "WPA" | "WEP" | "nopass";

export interface WifiData {
  ssid: string;
  password?: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  organization?: string;
  jobTitle?: string;
  website?: string;
}

export type PayloadChangeHandler = (payload: string) => void;

export interface QrFormProps {
  onPayloadChange: PayloadChangeHandler;
}