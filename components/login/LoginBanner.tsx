import Image from "next/image";
import React from "react";

export const LoginBanner: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 font-poppins">
      <div className="self-start bg-white rounded-xl p-2.5 ">
        <Image
          src={"/assets/icons/shinr-logo-black.png"}
          alt="logo"
          width={100}
          height={40}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-[42px] text-white">Hey, Admin!</h3>
        <p className="font-normal text-xl text-white">
          Sign in to manage everything with ease.
        </p>
      </div>
      <Image
        src={"/assets/illustrator/login-illustrator.svg"}
        alt="illustrator"
        width={276}
        height={263}
      />
    </div>
  );
};
