"use client";

import { useState, type ComponentType } from "react";
import { PhoneForm } from "@/components/qr/forms/phone-form";
import { TextForm } from "@/components/qr/forms/text-form";
import { UrlForm } from "@/components/qr/forms/url-form";
import { VCardForm } from "@/components/qr/forms/vcard-form";
import { WifiForm } from "@/components/qr/forms/wifi-form";
import type { QrFormProps, QrType } from "@/types/qr";

// type → kon-ta form
const FORMS: Record<QrType, ComponentType<QrFormProps>> = {
  text: TextForm,
  url: UrlForm,
  phone: PhoneForm,
  wifi: WifiForm,
  vcard: VCardForm,
};

interface QrGeneratorProps {
  type: QrType;
}

export function QrGenerator({ type }: QrGeneratorProps) {
  const [payload, setPayload] = useState("");
  const Form = FORMS[type];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border p-6">
        <Form onPayloadChange={setPayload} />
      </div>

      <div className="space-y-3 rounded-xl border p-6">
        <p className="text-sm font-medium">QR content (Step 4 madhe QR yeil)</p>
        {payload ? (
          <pre className="whitespace-pre-wrap break-all rounded-lg bg-muted p-3 font-mono text-xs">
            {payload}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">
            Form valid bharla ki ithe generated value distil.
          </p>
        )}
      </div>
    </div>
  );
}