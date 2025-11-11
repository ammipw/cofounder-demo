import { create } from "zustand";

export type Project = {
  name: string;
}

export const useProjects = create((set) => ({
  projects: [] as Project[],
  addProject: (project: Project) => set((state: any) => ({
    projects: [...state.projects, project]
  })),
  removeProject: (project: Project) => set((state: any) => ({
    projects: state.projects.filter((p: Project) => p !== project)
  })),
}));
