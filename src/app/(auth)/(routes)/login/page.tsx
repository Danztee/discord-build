import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <form
        action=""
        className="bg-[#313338] p-8 w-[550px] rounded-md font-bold"
      >
        <div className="flex flex-col gap-6">
          <div className="header flex flex-col gap-2 text-center">
            <h1 className="text-[#f2f3f5] text-2xl font-bold">Welcome back!</h1>
            <p className="text-[#b5bac1] text-sm">
              We&apos;re so excited to see you again!
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="emailOrPhoneNumber"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                Email or Phone Number
              </label>
              <input
                id="emailOrPhoneNumber"
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

            <div className="">
              <Button className="w-full bg-[#5865f2] rounded-sm hover:bg-[#5865f2] hover:opacity-70 h-[3rem] text-white">
                Log in
              </Button>

              <div className="flex items-center gap-1 mt-4 text-[12px]">
                <p className="text-[#949bac]">Need an account?</p>{" "}
                <Link
                  href="/register"
                  className="text-[#00a8fc] hover:underline text-[12px]"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
