import * as z from "zod";

export const ZInterview = z.object({
  role: z.string(),
  level: z.string(),
  type: z.string(),
  amount: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      const num = Number(val);
      return isNaN(num) ? val : num;
    }
    return val;
  }, z.number()),
  userid: z.string(),
  techstack: z.string(),
});
