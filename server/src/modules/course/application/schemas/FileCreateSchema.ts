import { z } from "zod";

export namespace FileCreateSchema {
    export const inputSchema = z.object({
        courseId: z.string(),
        fileName: z.string(),
        file: z.instanceof(Buffer),
        title: z.string(),
        description: z.string(),
        mimeType: z.string()
    })

    export interface Input extends z.infer<typeof inputSchema> {}
} 