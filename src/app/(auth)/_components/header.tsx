import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 w-full">
      <div className="mx-auto w-full px-4 py-4 md:w-[90%]">
        <div className="">
          <Image
            src="/app/logo.png"
            alt=""
            width={480}
            height={480}
            className="h-12 w-auto"
          />
        </div>
      </div>
    </header>
  );
}
