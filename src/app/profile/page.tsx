"use client";

import Header from "@/components/Header";
import { useProjects } from "@/components/useProjects";
import { useUser } from "@/components/useUser";
import { json } from "stream/consumers";

export default function ProfilePage() {
  const user = useUser((state: any) => state.user);
  const setUser = useUser((state: any) => state.setUser);
  const projects = useProjects((state: any) => state.projects);
  const addProject = useProjects((state: any) => state.addProject);
  const removeProject = useProjects((state: any) => state.removeProject);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('type', "startup");

    // console.log('Submitting form data:', Object.fromEntries(formData.entries()));
    
    const data = await fetch('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json());

    console.log('Startup posted:', data);

    if (data) {
      form.reset();
      addProject(data);
    } else {
      console.error('Failed to post startup');
    }
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
          <h2>New Startup</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" placeholder="Enter startup name" required />
            </label>
            <label>
              Description:
              <textarea name="description" placeholder="Enter startup description" />
            </label>
            <button type="submit">Post Startup</button>
          </form>
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
