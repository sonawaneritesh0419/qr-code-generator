"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { useSyncPayload } from "@/hooks/use-sync-payload";
import { buildVCardPayload } from "@/lib/qr/payloads";
import { vcardSchema, type VCardValues } from "@/lib/schemas";
import type { QrFormProps } from "@/types/qr";

export function VCardForm({ onPayloadChange }: QrFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<VCardValues>({
    resolver: zodResolver(vcardSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      organization: "",
      jobTitle: "",
      website: "",
    },
    mode: "onChange",
  });

  const values = useWatch({ control });
  useSyncPayload(vcardSchema, values, buildVCardPayload, onPayloadChange);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="First name"
          htmlFor="firstName"
          required
          error={errors.firstName?.message}
        >
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
        </FormField>

        <FormField
          label="Last name"
          htmlFor="lastName"
          error={errors.lastName?.message}
        >
          <Input
            id="lastName"
            autoComplete="family-name"
            {...register("lastName")}
          />
        </FormField>
      </div>

      <FormField label="Mobile" htmlFor="phone" error={errors.phone?.message}>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
      </FormField>

      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Company" htmlFor="organization">
          <Input id="organization" {...register("organization")} />
        </FormField>

        <FormField label="Job title" htmlFor="jobTitle">
          <Input id="jobTitle" {...register("jobTitle")} />
        </FormField>
      </div>

      <FormField
        label="Website"
        htmlFor="website"
        error={errors.website?.message}
      >
        <Input
          id="website"
          placeholder="example.com"
          aria-invalid={!!errors.website}
          {...register("website")}
        />
      </FormField>
    </form>
  );
}