"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Verifyemail() {
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [Verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verfiyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log({ error });
      console.log(error?.response?.data);
    }
  };

  React.useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  React.useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {Verified && (
        <div>
          <h2 className="text-2xl ">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
