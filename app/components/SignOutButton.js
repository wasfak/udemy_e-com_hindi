import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton({ children }) {
  return <div onClick={async () => await signOut()}>{children}</div>;
}
