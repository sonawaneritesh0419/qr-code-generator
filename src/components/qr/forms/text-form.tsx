"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FormField } from "@/components/common/form-field";
import { Textarea } from "@/components/ui/textarea";
import { useSyncPayload } from "@/hooks/use-sync-payload";
import { buildTextPayload } from "@/lib/qr/payloads";
import { textSchema, type TextValues } from "@/lib/schemas";
import type { QrFormProps } from "@/types/qr";

export function TextForm({ onPayloadChange }: QrFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<TextValues>({
    resolver: zodResolver(textSchema),
    defaultValues: { text: "" },
    mode: "onChange",
  });

  const values = useWatch({ control });
  useSyncPayload(textSchema, values, buildTextPayload, onPayloadChange);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-4">
      <FormField
        label="Text"
        htmlFor="text"
        required
        error={errors.text?.message}
        hint="Up to 1000 characters."
      >
        <Textarea
          id="text"
          rows={5}
          placeholder="Enter any text or message"
          aria-invalid={!!errors.text}
          {...register("text")}
        />
      </FormField>
    </form>
  );
}