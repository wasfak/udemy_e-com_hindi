"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Verify({ searchParams }) {
  const { userId, token } = searchParams;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      body: JSON.stringify({ userId, token }),
    }).then(async (res) => {
      const apiRes = await res.json();
      const { error, message } = apiRes;
      if (res.ok) {
        toast.success(message);
        router.replace("/");
      }
      if (!res.ok && error) {
        toast.error(error);
      }
    });
  });

  if (!userId || !token) redirect("/404");

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      please wait...
      <p>we are verifying your email</p>
    </div>
  );
}
