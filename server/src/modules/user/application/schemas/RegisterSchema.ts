import { z } from "zod";

export namespace RegisterSchema {
    export const inputSchema = z.object({
        fullName: z.string(),
        email: z.string().email(),
        password: z.string(),
        type: z.enum(["Teacher", "Student"])
    });
    

    export const outputSchema = z.object({
        token: z.string()
    })

    export interface Input extends z.infer<typeof inputSchema> {}
    export interface Output extends z.infer<typeof outputSchema> {}
}