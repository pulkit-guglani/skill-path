/** Centralized API path registry — add domain paths here */

export const user = {
  get: {
    profile: () => "/v1/user",
  },
};

export const goals = {
  generateSkills: () => "/v1/goals/generate-skills",
  generateSkillContent: () => "/v1/goals/generate-skill-content",
  create: () => "/v1/goals",
  deleteAll: () => "/v1/goals",
  active: () => "/v1/goals/active",
  byId: (id: string) => `/v1/goals/${id}`,
  confirm: (id: string) => `/v1/goals/${id}/confirm`,
  skills: (id: string) => `/v1/goals/${id}/skills`,
  completion: (goalId: string, skillId: string) =>
    `/v1/goals/${goalId}/skills/${skillId}/completion`,
};
