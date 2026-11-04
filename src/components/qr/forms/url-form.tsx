"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { useSyncPayload } from "@/hooks/use-sync-payload";
import { buildUrlPayload } from "@/lib/qr/payloads";
import { urlSchema, type UrlValues } from "@/lib/schemas";
import type { QrFormProps } from "@/types/qr";

export function UrlForm({ onPayloadChange }: QrFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<UrlValues>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "" },
    mode: "onChange",
  });

  const values = useWatch({ control });
  useSyncPayload(urlSchema, values, buildUrlPayload, onPayloadChange);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-4">
      <FormField
        label="Website URL"
        htmlFor="url"
        required
        error={errors.url?.message}
        hint="https:// nasel tar automatically add hoil."
      >
        <Input
          id="url"
          type="text"
          inputMode="url"
          placeholder="example.com"
          autoComplete="url"
          aria-invalid={!!errors.url}
          {...register("url")}
        />
      </FormField>
    </form>
  );
}