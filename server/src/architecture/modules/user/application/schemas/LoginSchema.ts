import { z } from "zod";

export namespace LoginSchema {
    export const inputSchema = z.object({
        username: z.string(),
        password: z.string()
    })

    export const outputSchema = z.object({
        token: z.string()
    })

    export interface Input extends z.infer<typeof inputSchema> {}
    export interface Output extends z.infer<typeof outputSchema> {}
}