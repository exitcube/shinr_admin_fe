"use client";
import Image from "next/image";
import React, { useState } from "react";
import { HomeIcon } from "../assets/Icons/HomeIcon";
import { VendorIcon } from "../assets/Icons/VendorIcon";
import { CustomerIcon } from "../assets/Icons/CustomerIcon";
import { UserIcon } from "../assets/Icons/UserIcon";
import { BannerIcon } from "../assets/Icons/BannerIcon";
import { RewardIcon } from "../assets/Icons/RewardIcon";
import { VehicleIcon } from "../assets/Icons/VehicleIcon";
import { BookingIcon } from "../assets/Icons/BookingIcon";
import { OffersIcon } from "../assets/Icons/OffersIcon";
import { RevenueIcon } from "../assets/Icons/RevenueIcon";
import { PromotionsIcon } from "../assets/Icons/PromotionsIcon";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ServiceIcon } from "../assets/Icons/ServiceIcon";
import { OrganisationIcon } from "../assets/Icons/OrganisationIcon";
import { ShinrProductsIcon } from "../assets/Icons/ShinrProductsIcon";
import { SettingsIcon } from "../assets/Icons/SettingsIcon";
import { SupportIcon } from "../assets/Icons/SupportIcon";
import { LogoutIcon } from "../assets/Icons/LogoutIcon";
import { useAuthContext } from "@/provider/AuthContext";
import { PageLoadingOverlay } from "./PageLoader/PageLoading";
import { Button } from "../ui/button";

export const Sidebar: React.FC = () => {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const { logout } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      router.replace("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {isLoggingOut && <PageLoadingOverlay label="Logging out..." />}
      <div className="w-60 h-full bg-white shadow-lg flex flex-col">
      <div className="px-5 py-5 w-full">
        <Image
          src={"/assets/icons/shinr-logo-black.png"}
          alt="logo"
          width={81}
          height={28}
        />
      </div>

      <nav className="mt-8 flex-1">
        <ul className="flex flex-col">
          {sidebarMenue.map((menuItem) => (
            <li
              key={menuItem.id}
              className={` ${
                segment === menuItem.path.replace("/", "") &&
                "border-l-[6px] border-[#128C7E] rounded-r-sm"
              } hover:border-l-[6px] hover:border-[#128C7E] hover:rounded-r-sm`}
            >
              <Link
                href={menuItem.path}
                className="block px-6 py-3 rounded-lg hover:text-[#101010] transition text-[#878787]"
              >
                <div className={`flex items-center gap-2 ${segment === menuItem.path.replace("/", "") && 'text-[#101010]'}`}>
                  <menuItem.logoSvg />
                  <p className="font-normal text-sm">{menuItem.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 pb-6">
        <ul className="flex flex-col gap-4">
          {bottomMenuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="flex items-center gap-2 text-[#878787] hover:text-[#101010] transition"
              >
                <item.logoSvg />
                <p className="font-normal text-sm">{item.title}</p>
              </Link>
            </li>
          ))}
          <li>
            <Button
              type="button"
              variant='ghost'
              onClick={onLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 text-[#FF2D55] disabled:opacity-60 hover:cursor-pointer hover:text-[#94001b]"
            >
              <LogoutIcon />
              <p className="font-normal text-sm">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </p>
            </Button>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

const sidebarMenue = [
  {
    id: 1,
    title: "Dashboard Overview",
    path: "/dashboard",
    logoSvg: HomeIcon,
  },
  {
    id: 2,
    title: "Organisation",
    path: "/organisation",
    logoSvg: OrganisationIcon,
  },
  {
    id: 3,
    title: "Vendors",
    path: "/vendors",
    logoSvg: VendorIcon,
  },
  {
    id: 4,
    title: "Customers",
    path: "/customer",
    logoSvg: CustomerIcon,
  },
  {
    id: 5,
    title: "User",
    path: "/user",
    logoSvg: UserIcon,
  },
  {
    id: 6,
    title: "Banner",
    path: "/banner",
    logoSvg: BannerIcon,
  },
  {
    id: 7,
    title: "Rewards",
    path: "/rewards",
    logoSvg: RewardIcon,
  },
  {
    id: 8,
    title: "Vehicles",
    path: "/vehicles",
    logoSvg: VehicleIcon,
  },
  {
    id: 9,
    title: "Bookings",
    path: "/bookings",
    logoSvg: BookingIcon,
  },
  {
    id: 10,
    title: "Services",
    path: "/service",
    logoSvg: ServiceIcon,
  },
  {
    id: 11,
    title: "Shinr Products",
    path: "/shinr-products",
    logoSvg: ShinrProductsIcon,
  },
  {
    id: 12,
    title: "Offers",
    path: "/offers",
    logoSvg: OffersIcon,
  },
  {
    id: 13,
    title: "Revenue",
    path: "/revenue",
    logoSvg: RevenueIcon,
  },
  {
    id: 14,
    title: "Promotions",
    path: "/promotions",
    logoSvg: PromotionsIcon,
  },
];

const bottomMenuItems = [
  {
    id: 1,
    title: "Settings",
    path: "/settings",
    logoSvg: SettingsIcon,
  },
  {
    id: 2,
    title: "Support",
    path: "/support",
    logoSvg: SupportIcon,
  },
];
