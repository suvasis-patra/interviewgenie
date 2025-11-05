import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { qeustionGenerationPrompt } from "@/lib/prompts";
import { ZInterview } from "@/lib/schemas/interview";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}

export async function POST(request: Request) {
  const validateFields = ZInterview.safeParse(await request.json());
  if (!validateFields.success) {
    console.log(validateFields.error);
    return Response.json(
      { success: false, error: "Invalid data" },
      { status: 400 }
    );
  }
  const { role, level, techstack, type, amount, userid } = validateFields.data;
  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: qeustionGenerationPrompt({
        role,
        level,
        techstack,
        type,
        amount,
      }),
    });
    const interview = {
      role,
      level,
      type,
      techstack: techstack.split(","),
      amount,
      userId: userid,
      questions: JSON.parse(questions),
    };
    await prisma.interview.create({ data: { ...interview } });
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}
