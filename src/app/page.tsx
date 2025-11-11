"use client";

import Header from "@/components/Header";
import ProfileViewer from "@/components/ProfileViewer";
import { useUser } from "@/components/useUser";

export default function Home() {
  const user = useUser((state: any) => state.user);

  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto text-center md:text-left">
          <div className="max-w-sm mx-auto p-4 py-16">
            <h1 className="text-4xl font-semibold mb-4">Find Your Perfect Co-Founder</h1>
            <p className="text-neutral-300">Connect with like-minded professionals to find your ideal co-founder.</p>
          </div>
          <div className="flex-1 md:mx-16 mx-auto text-center md:text-left">
            <ProfileViewer />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
