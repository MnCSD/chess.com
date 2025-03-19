import Image from "next/image";
import React from "react";

export const SignUpNavbar = () => {
  return (
    <div className="h-[80px] flex items-center justify-center">
      <Image src={"/logo_chess.png"} width={158} height={44} alt="Logo" />
    </div>
  );
};
