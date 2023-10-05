"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      ...formData,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      alert(res.error);
    } else {
      alert("logged in successfully");
      router.push("/");
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div>
      <form
        action=""
        className="bg-[#313338] p-8 w-[550px] rounded-md font-bold"
        onSubmit={(e) => submitHandler(e)}
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
                htmlFor="email"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22]"
              />
            </div>

            <div className="">
              <Button
                className="w-full bg-[#5865f2] rounded-sm hover:bg-[#5865f2] hover:opacity-70 h-[3rem] text-white"
                type="submit"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
