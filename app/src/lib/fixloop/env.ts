export function getFixloopProjectName() {
  const projectName = process.env.AGENTIC_FIX_LOOP_PROJECT_NAME?.trim();

  if (!projectName) {
    throw new Error("Missing AGENTIC_FIX_LOOP_PROJECT_NAME.");
  }

  return projectName;
}
