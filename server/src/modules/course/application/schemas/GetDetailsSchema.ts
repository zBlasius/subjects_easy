import { z } from "zod";

export namespace getDetailsSchema {
    export const inputSchema = z.object({
        id: z.string()
    })

    export interface Input extends z.infer<typeof inputSchema> {}
}