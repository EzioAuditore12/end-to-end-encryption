import { z } from "zod";

import { tokensSchema } from "@/features/common/schemas/tokens.schema";

export const refreshResponseSchema = tokensSchema;

export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
