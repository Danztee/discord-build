"use client";

import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { onOpen } = useModal();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/users");
        const user = data;
        if (!user.imageUrl) {
          onOpen("addProfilePhoto");
        } else {
          router.push("/channels/@me");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [onOpen, router]);

  return (
    <main>
      <div className="flex flex-col h-screen items-center justify-center gap-2">
        <h1>Developed by OLOWONIYI DANIEL</h1>
        <p className="text-xs">I&apos;m a fullstack web and mobile engineer</p>
      </div>
    </main>
  );
}
