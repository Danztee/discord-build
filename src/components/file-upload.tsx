"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";

type FileUploadProps = {
  onChange: (url: string) => void;
  value: string;
  endpoint: "messageFile" | "serverFileImage";
};

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const fileType = value.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-[6rem] w-[6rem]">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url!);
        }}
        onUploadError={(error) => {
          console.log(error);
        }}
      />
    </div>
  );
};
export default FileUpload;
