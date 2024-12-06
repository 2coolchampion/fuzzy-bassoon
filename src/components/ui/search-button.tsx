"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCommand } from "./command-global";

export function SearchButton() {
  const { setOpen } = useCommand();

  return (
    <Button
      className="w-full flex justify-start"
      variant="sidebarMenuButton"
      size="sidebarMenuButton"
      onClick={() => setOpen(true)}
    >
      <div className="flex items-center p-2 justify-start w-full">
        <Search className="w-4" />
        <span className="ml-2">Search</span>
      </div>
    </Button>
  );
}
