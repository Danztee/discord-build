"use client";

import { useModal } from "@/hooks/use-modal-store";
import { currentProfile } from "@/lib/current-profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const router = useRouter();
  const { onOpen } = useModal();

  useEffect(() => {
    onOpen("addProfilePhoto");
  }, [onOpen]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const profile = await currentProfile();
  //     console.log(profile);

  //     if (!profile.imageUrl) {
  //       onOpen("addProfilePhoto");
  //     }
  //   };

  //   fetchData();
  // }, [onOpen]);

  // setTimeout(() => {
  //   router.push("/channels/@me");
  // }, 500);

  return (
    <main>
      <div className="flex flex-col h-screen items-center justify-center gap-2">
        <h1>Developed by OLOWONIYI DANIEL</h1>
        <p className="text-xs">I&apos;m a fullstack web and mobile engineer</p>
      </div>
    </main>
  );
}
