"use client";

import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useProjects } from "./useProjects";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";

function LoginModal({isLoggedIn, isOpen}: {isLoggedIn: boolean, isOpen: boolean}) {
  return (
    <div></div>
  )
}

type Profile = {
  name: string;
  description?: string;
  audience?: string[];
}

export default function ProfileViewer() {
  const user = useUser((state: any) => state.user);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [index, setIndex] = useState(0);
  const projects = useProjects((state: any) => state.projects);
  const addProject = useProjects((state: any) => state.addProject);

  useEffect(() => {
    async function fetchProfiles() {
      const profiles = await fetch("/api/profiles").then(res => res.json());

      if (profiles.length > 0) {
        setProfiles(profiles);
      }

      console.log("Fetched profiles:", profiles);
    }

    fetchProfiles();
  }, []);

  function handleVerdict(event: React.MouseEvent<HTMLButtonElement>) {
    if (user === null) {
      // TODO: Show login modal instead of alert
      alert("Please log in to make a decision on profiles.");
      return;
    }

    const value = event.currentTarget.value;
    // console.log("User made a verdict on the profile:", value);

    if (value === "true" && profiles[index]) {
      addProject({ name: profiles[index].name });
    }

    nextProfile();
  }

  function nextProfile() {
    // Logic to fetch and display the next profile
    setIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <div className="h-[60vh] max-w-md">
      <div>
        <div className="w-full h-full mb-4 mx-auto bg-neutral-600">
          <img src="https://placehold.co/150x100" alt="Profile Picture" className="w-full h-full object-cover max-w-sm mb-4 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{profiles[index]?.name ?? "Unknown User"}</h3>
        <p className="mb-4">{profiles[index]?.description ?? "No description available."}</p>
        <div>
          <p>Looking for:</p>
          <ul>
            {profiles[index]?.audience?.map((item, index) => (
              <li key={index}>{item}</li>
            )) ?? <li>No preferences specified.</li>}
          </ul>
        </div>
        <div className="">
          <button className={"bg-red-900/40 rounded p-4 flex-1 hover:bg-red-900"} onClick={handleVerdict} value={"false"}>
            <FaRegThumbsDown size={24} /> Skip this 
          </button>
          <button className={"bg-green-900/40 rounded p-4 flex-1 hover:bg-green-900"} onClick={handleVerdict} value={"true"}>
            <FaRegThumbsUp size={24} /> I'm interested
          </button>
        </div>
      </div>
    </div>
  );
}