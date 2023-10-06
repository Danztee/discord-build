import { InitialModal } from "@/components/modals/create-server-modal";
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
          profileId: profile.id,
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
