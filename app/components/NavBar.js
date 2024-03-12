import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link"
function NavBar() {
  return (
    <nav className="flex items-center justify-between  bg-white p-6 shadow-md">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Project Management System
        </span>
      </div>
      <Button asChild>
        <Link href="#">Login</Link>
      </Button>
    </nav>
  );
}

export default NavBar;
