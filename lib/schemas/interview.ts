import * as z from "zod";

export const ZInterview = z.object({
  role: z.string(),
  level: z.string(),
  type: z.string(),
  amount: z.number(),
  userid: z.string(),
  questions: z.array(z.string()).nonempty(),
  techstack: z.string(),
});
