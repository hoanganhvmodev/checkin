import "./globals.css";
import type { Metadata } from "next";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReduxProvider } from "@/redux/provider";

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
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
