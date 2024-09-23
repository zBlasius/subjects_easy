import { z } from "zod";

export namespace getDetailsSchema {
  export const inputSchema = z.object({
    id: z.string(),
  });

  // Output schema
  export const outputSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    videoList: z
      .array(
        z.object({
          id: z.string(),
          bucketUrl: z.string(),
          fileName: z.string(),
        })
      )
      .optional(),
  });

  export interface Output extends z.infer<typeof outputSchema> {}
}
