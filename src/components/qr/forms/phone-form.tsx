"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { useSyncPayload } from "@/hooks/use-sync-payload";
import { buildPhonePayload } from "@/lib/qr/payloads";
import { phoneSchema, type PhoneValues } from "@/lib/schemas";
import type { QrFormProps } from "@/types/qr";

export function PhoneForm({ onPayloadChange }: QrFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<PhoneValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
    mode: "onChange",
  });

  const values = useWatch({ control });
  useSyncPayload(phoneSchema, values, buildPhonePayload, onPayloadChange);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-4">
      <FormField
        label="Mobile number"
        htmlFor="phone"
        required
        error={errors.phone?.message}
        hint="Country code sobat dya, e.g. +91."
      >
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </FormField>
    </form>
  );
}