import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <form
        action=""
        className="bg-[#313338] p-8 w-[500px] rounded-md font-bold"
      >
        <div className="flex flex-col gap-6">
          <div className="header flex flex-col gap-2 text-center">
            <h1 className="text-[#f2f3f5] text-2xl font-bold">
              Create an account
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22] text-[#fff] text-[12px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                username
              </label>
              <input
                id="username"
                type="text"
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22] text-[#fff] text-[12px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                password
              </label>
              <input
                id="password"
                type="password"
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22]"
              />
            </div>

            <Button className="w-full bg-[#5865f2] rounded-sm hover:bg-[#5865f2] hover:opacity-70 h-[3rem] text-white">
              Register
            </Button>

            <div className="mt-4 text-[12px]">
              <Link
                href="/login"
                className="text-[#00a8fc] hover:underline text-[12px]"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
