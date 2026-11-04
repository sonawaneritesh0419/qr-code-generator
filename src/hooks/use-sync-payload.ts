import { useEffect } from "react";
import type { z } from "zod";

/**
 * Form values valid asle tar payload string banvto ani parent la deto,
 * invalid asle tar "" deto.
 */
export function useSyncPayload<T>(
  schema: z.ZodType<T>,
  values: unknown,
  build: (data: T) => string,
  onPayloadChange: (payload: string) => void,
) {
  useEffect(() => {
    const result = schema.safeParse(values);
    onPayloadChange(result.success ? build(result.data) : "");
  }, [schema, values, build, onPayloadChange]);
}