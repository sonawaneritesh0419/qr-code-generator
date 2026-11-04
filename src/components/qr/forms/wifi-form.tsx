"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormField } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSyncPayload } from "@/hooks/use-sync-payload";
import { buildWifiPayload } from "@/lib/qr/payloads";
import { wifiSchema, type WifiValues } from "@/lib/schemas";
import type { QrFormProps } from "@/types/qr";

export function WifiForm({ onPayloadChange }: QrFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<WifiValues>({
    resolver: zodResolver(wifiSchema),
    defaultValues: { ssid: "", encryption: "WPA", password: "", hidden: false },
    mode: "onChange",
  });

  const values = useWatch({ control });
  useSyncPayload(wifiSchema, values, buildWifiPayload, onPayloadChange);

  const needsPassword = values.encryption !== "nopass";

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-4">
      <FormField
        label="Network name (SSID)"
        htmlFor="ssid"
        required
        error={errors.ssid?.message}
      >
        <Input
          id="ssid"
          placeholder="MyHomeWiFi"
          aria-invalid={!!errors.ssid}
          {...register("ssid")}
        />
      </FormField>

      <FormField label="Security" htmlFor="encryption">
        <select
          id="encryption"
          className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("encryption")}
        >
          <option value="WPA">WPA / WPA2 / WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No password</option>
        </select>
      </FormField>

      {needsPassword && (
        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password?.message}
        >
          <Input
            id="password"
            type="text"
            autoComplete="off"
            placeholder="Network password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
        </FormField>
      )}

      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label htmlFor="hidden">Hidden network</Label>
        <Controller
          control={control}
          name="hidden"
          render={({ field }) => (
            <Switch
              id="hidden"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </div>
    </form>
  );
}