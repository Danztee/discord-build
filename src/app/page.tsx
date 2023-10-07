"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/channels/@me");
  }, 1000);

  return (
    <main>
      <div className="flex flex-col h-screen items-center justify-center gap-2">
        <h1>Developed by OLOWONIYI DANIEL</h1>
        <p className="text-xs">I&apos;m a fullstack web and mobile engineer</p>
      </div>
    </main>
  );
}
