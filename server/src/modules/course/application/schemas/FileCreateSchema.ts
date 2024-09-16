import { z } from "zod";

export namespace FileCreateSchema {
    export const inputSchema = z.object({
        courseId: z.string(),
        title: z.string(),
        description: z.coerce.string(),
        file: z.instanceof(Buffer)
    })

    export interface Input extends z.infer<typeof inputSchema> {}
} 