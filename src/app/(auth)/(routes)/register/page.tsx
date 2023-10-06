"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      alert(data.message);

      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#313338] p-8 w-[500px] rounded-md font-bold"
      >
        <div className="flex flex-col gap-6">
          <div className="header flex flex-col gap-2 text-center">
            <h1 className="text-[#f2f3f5] text-2xl font-bold">
              Create an account
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22] text-[#fff] text-[12px]"
              />
            </div>

            {/* Email Input */}
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
                onChange={handleInputChange}
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22] text-[#fff] text-[12px]"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[#B5BAC1] text-[12px] uppercase font-bold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field p-[10px] h-[40px] w-full rounded-[3px] outline-none border-none bg-[#1E1F22]"
              />
            </div>

            {/* Register Button */}
            <Button type="submit" variant="primary" loading={loading}>
              Register
            </Button>

            {/* Link to Login */}
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
