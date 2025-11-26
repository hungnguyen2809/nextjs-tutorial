import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header>Auth Layout</header>
      <div>
        <Link href={"/"}>
          <Button>Back Home</Button>
        </Link>
      </div>
      {children}
    </section>
  );
}

export default AuthLayout;
