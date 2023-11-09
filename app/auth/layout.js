import React from "react";

export const metadata = {
  title: "Sign up page",
  description: "sign up page",
};

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
}
