import user from "@/lib/user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async () => {
  const { id } = await user();
  if (!id) throw new Error("user unauthorized");
  return { userId: id };
};

export const ourFileRouter = {
  serverFileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),

  messageFile: f(["image", "pdf"])
    .middleware(() => auth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
