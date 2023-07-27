"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import styles from "./styles.module.css";
import apiAuth from "@/api/auth";
import { logOut } from "@/redux/features/auth-slice";

const Navigation = () => {
  const user = useAppSelector((state) => state.authReducer.value);

  const [navLinks] = useState([
    {
      label: "Chấm công",
      url: "/checkin",
      role: "User",
    },
    {
      label: "Danh sách chấm công",
      url: "/checkin-list",
      role: "User",
    },
    {
      label: "Quản lí chấm công",
      url: "/checkin-management",
      role: "Admin",
    },
  ]);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const pathname = usePathname();

  const renderNavLinks = useMemo(() => {
    if (!user.isAuth) return;
    const roleUser = "User";

    if (user.user?.role === roleUser) {
      return navLinks.filter((nav) => {
        if (nav.role === roleUser) {
          return { ...nav };
        }
      });
    }

    return navLinks;
  }, [user, navLinks]);

  const onHandleLogout = async () => {
    try {
      const response = await apiAuth.logout();
      if (response.status === 200) {
        dispatch(logOut());
        deleteCookie("access_token");
        router.push("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-between items-center h-20">
      <Link href="/">
        <Image src="/vmo-logo.png" alt="logo-vmo" width="150" height="100" />
      </Link>
      <div className="">
        <ul className="flex gap-28">
          {renderNavLinks &&
            renderNavLinks.map((link) => {
              const isActive = pathname === link.url;

              return (
                <Link
                  className={`text-xl font-semibold hover:text-[#fe4f18] ${
                    isActive ? "text-[#fe4f18]" : "text-black"
                  }`}
                  href={link.url}
                  key={link.url}
                >
                  {link.label}
                </Link>
              );
            })}
        </ul>
      </div>
      <div className={styles.info_user}>
        <Image
          src={
            user.user?.avatar_url ||
            "https://phongchongluadao.vn/images/avatar.png"
          }
          alt="avatar-user"
          width="50"
          height="50"
          className="rounded-full"
        />
        <span>{user.user?.full_name || "Nguyễn Văn A"}</span>
        <div className={styles.dropdown_info_user}>
          <div className="hover:bg-[#F5F5F5] px-3 py-1">Thông tin hồ sơ</div>
          <div
            className="hover:bg-[#F5F5F5] px-3 py-1"
            onClick={onHandleLogout}
          >
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
