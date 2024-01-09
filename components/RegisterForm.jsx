"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
          setError("All fields are necessary.");
          return;
        }
    
        try {
          const resUserExists = await fetch("api/userExists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
    
          const { user } = await resUserExists.json();
    
          if (user) {
            setError("User already exists.");
            return;
          }
    
          const res = await fetch("api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });
    
          if (res.ok) {
            const form = e.target;
            form.reset();
            router.push("/");
          } else {
            console.log("User registration failed.");
          }
        } catch (error) {
          console.log("Error during registration: ", error);
        }
      };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-10 rounded-lg border-t-4 border-purple-2">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-purple-2 text-white font-bold cursor-pointer px-6 py-2 rounded-md">
                        Register
                    </button>

                    {error && (
                        <div className="text-red-500 w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link href="/" legacyBehavior>
                        <a className="text-sm mt-3 text-right" >
                            Already have an account?{" "}
                            <span className="underline">Login</span>
                        </a>
                    </Link>
                </form>
            </div>
        </div>
    );
}