import Agent from "@/components/custom/agent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const InterviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const image = session?.user.image ?? "";
  return <Agent image={image} type="generation" />;
};

export default InterviewPage;
