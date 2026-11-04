"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { QrType } from "@/types/qr";

interface QrGeneratorProps {
  type: QrType;
}

export function QrGenerator({ type }: QrGeneratorProps) {
  const [value, setValue] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3 rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">
          Form for <span className="font-medium text-foreground">{type}</span>{" "}
          (Step 3)
        </p>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
      </div>

      <div className="flex min-h-64 items-center justify-center rounded-xl border p-6 text-sm text-muted-foreground">
        {value ? `Preview of: ${value}` : "QR preview will appear here (Step 4)"}
      </div>
    </div>
  );
}