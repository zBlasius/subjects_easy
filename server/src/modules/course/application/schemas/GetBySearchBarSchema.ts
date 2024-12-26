import { z } from "zod";

export namespace getBySearchBarSchema {
  export const inputSchema = z.object({
    value: z.string(),
  });
}
