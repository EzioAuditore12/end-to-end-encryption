import { z } from "zod";

import { tokensSchema } from "@/features/common/schemas/tokens.schema";

export const refreshParamSchema = tokensSchema.pick({ refreshToken: true });

export type RefreshParam = z.infer<typeof refreshParamSchema>;
