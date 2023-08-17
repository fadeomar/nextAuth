"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState("");
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log({ error });
      toast.error("some thing went wrong!");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");

    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>profile</h1>
      <hr />

      <p>profile page</p>
      <h2 className="padding rounded bg-green-500">
        {!data ? (
          "not logged in"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        get data
      </button>
    </div>
  );
}
