"use client";

import Header from "@/components/Header";
import { useUser } from "@/components/useUser";

export default function LoginPage() {
  const user = useUser((state: any) => state.user);
  const setUser = useUser((state: any) => state.setUser);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    setUser({ name });
  }

  return (
    <div>
      <Header />
      <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" autoComplete="off" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}
