"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_KEY || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
