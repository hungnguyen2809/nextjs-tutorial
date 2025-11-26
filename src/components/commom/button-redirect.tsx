"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  children?: React.ReactNode;
};

function ButtonRedirect({ href, children }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return <button onClick={handleClick}>{children}</button>;
}

export default ButtonRedirect;
