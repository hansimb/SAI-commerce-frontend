export function getFixloopProjectName() {
  const projectName = process.env.AGENTIC_FIX_LOOP_PROJECT_NAME?.trim();

  return projectName || undefined;
}

export function hasFixloopProjectName() {
  return Boolean(getFixloopProjectName());
}
