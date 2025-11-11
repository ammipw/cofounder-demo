"use client";

import Header from "@/components/Header";
import { useProjects } from "@/components/useProjects";
import { useUser } from "@/components/useUser";

export default function ProfilePage() {
  const user = useUser((state: any) => state.user);
  const setUser = useUser((state: any) => state.setUser);
  const projects = useProjects((state: any) => state.projects);
  const removeProject = useProjects((state: any) => state.removeProject);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    setUser({ name });
  }

  if (!user) {
    return (
      <div>
        <Header />
        <main>
          <h1>Profile</h1>
          <p>Please log in to view your profile.</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <div>
          <h1>Profile</h1>
          <p>Welcome, {user.name}!</p>
        </div>
        <section>
          <h2>My Projects</h2>
          <p>You have no projects listed.</p>
        </section>
        <section>
          <h2>Startups</h2>
          {
            projects.length === 0 ? (
              <p>No startups added yet.</p>
            ) : (
              <ul>
                {projects.map((project: any, index: number) => (
                  <li key={index}>
                    {project.name}
                    <button onClick={() => removeProject(project)}>Remove</button>
                  </li>
                ))}
              </ul>
            )
          }
        </section>
      </main>
    </div>
  );
}
