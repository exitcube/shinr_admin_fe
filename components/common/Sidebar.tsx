import Image from "next/image";
import React from "react";
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

export const Sidebar: React.FC = () => {
  return (
    <div className="w-60 h-screen bg-white shadow-lg">
      <div className="px-5 py-5 w-full">
        <Image
          src={"/assets/icons/shinr-logo-black.png"}
          alt="logo"
          width={81}
          height={28}
        />
      </div>

      <nav className="mt-8">
        <ul className="flex flex-col">
          {sidebarMenue.map((menuItem) => (
            <li key={menuItem.id}>
              <Link
                href="#"
                className="block px-6 py-3 rounded-lg hover:text-[#101010] transition text-[#878787] hover:border-l-8"
              >
                <div className="flex items-center gap-2">
                  <menuItem.logoSvg />
                  <p className="font-normal text-sm">{menuItem.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
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
    title: "Vendors",
    path: "/vendors",
    logoSvg: VendorIcon,
  },
  {
    id: 3,
    title: "Customers",
    path: "/customer",
    logoSvg: CustomerIcon,
  },
  {
    id: 4,
    title: "User",
    path: "/user",
    logoSvg: UserIcon,
  },
  {
    id: 5,
    title: "Banner",
    path: "/banner",
    logoSvg: BannerIcon,
  },
  {
    id: 6,
    title: "Rewards",
    path: "/rewards",
    logoSvg: RewardIcon,
  },
  {
    id: 7,
    title: "Vehicles",
    path: "/vehicles",
    logoSvg: VehicleIcon,
  },
  {
    id: 8,
    title: "Bookings",
    path: "/bookings",
    logoSvg: BookingIcon,
  },
  {
    id: 9,
    title: "Offers",
    path: "/offers",
    logoSvg: OffersIcon,
  },
  {
    id: 10,
    title: "Revenue",
    path: "/revenue",
    logoSvg: RevenueIcon,
  },
  {
    id: 11,
    title: "Promotions",
    path: "promotions",
    logoSvg: PromotionsIcon,
  },
];
