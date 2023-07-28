"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import apiAuth from "@/api/auth";
import { logIn } from "@/redux/features/auth-slice";
import Header from "../header";
import Footer from "../footer";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login") return;
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await apiAuth.getUser();
      if (response.status === 200) {
        dispatch(logIn(response.data.user));
      }
    } catch (error: any) {
      console.log("error", error);
      router.push("/login");
    }
  };

  return (
    <div>
      {pathname !== "/login" && <Header />}
      {children}
      {pathname !== "/login" && <Footer />}
    </div>
  );
}
