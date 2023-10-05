import { InitialModal } from "@/components/modals/iniital-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const Page = async () => {
  const profile = await initialProfile();
  console.log(profile, "from setup-page");

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profile: profile,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <InitialModal />
    </div>
  );
};

export default Page;
