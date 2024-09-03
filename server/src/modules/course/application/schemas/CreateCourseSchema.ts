import { z } from "zod";

export namespace CreateCourseSchema {
    export const inputSchema = z.object({
        title: z.string(),
        description: z.string(),
        userId: z.coerce.string()
    })

    export interface Input extends z.infer<typeof inputSchema> {}
}