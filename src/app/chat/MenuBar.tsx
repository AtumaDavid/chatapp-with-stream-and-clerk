import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";
import React from "react";

export default function MenuBar() {
  return (
    <div className="flex items-center justify-between gap-3 border-e border-e-[#dbdde1] bg-white p-3">
      {/* when user signs out, goto route "/" */}
      <UserButton afterSignOutUrl="/" />
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
