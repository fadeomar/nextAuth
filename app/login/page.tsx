"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("sign up success!", res);
      toast.success("Login success");
      router.push("/profile");
    } catch (error) {
      console.log("error!!! => ", error);
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user?.email?.length > 0 && user?.password?.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={handleLogin}
      >
        {buttonDisabled ? "no login" : "login"}
      </button>
      <Link href="/signup">do not have an account, go to sign up</Link>
    </div>
  );
}
