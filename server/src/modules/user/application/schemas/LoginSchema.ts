import { z } from "zod";

export namespace LoginSchema {
  export const inputSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  export const outputSchema = z.object({
    token: z.string(),
    userInfo: z.object({
      userId: z.coerce.string(),
      email: z.string(),
      type: z.string(),
      fullName: z.string(),
    })
  });

  export interface Input extends z.infer<typeof inputSchema> {}
  export interface Output extends z.infer<typeof outputSchema> {}
}
