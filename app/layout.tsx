import "./globals.css";
import type { Metadata } from "next";

import { ReduxProvider } from "@/redux/provider";
import { AuthLayout } from "@/components/layout/Auth";

export const metadata: Metadata = {
  title: "CheckinGPS",
  description: "Application CheckinGPS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthLayout>{children}</AuthLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
