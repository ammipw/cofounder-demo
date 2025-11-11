"use client";

import Link from "next/link";
import { useUser } from "./useUser";

export default function Header() {
  const user = useUser((state: any) => state.user);
  const setUser = useUser((state: any) => state.setUser);

  return (
    <header>
      <div className="container mx-auto flex justify-between items-center p-8">
        <h1><Link href="/">CoFoundr</Link></h1>
        <nav>
          <ul className="flex space-x-4">
            {
              user ? (
                <>
                  <li><span>Welcome, {user.name}</span></li>
                  <li><Link href="/profile">Profile</Link></li>
                  <li><button onClick={() => setUser(null)}>Logout</button></li>
                </>
              ) : (
                <li><Link href="/login">Login</Link></li>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}