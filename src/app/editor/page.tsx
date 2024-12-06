import Editor from "@/components/ui/deprecated/Editor";
import EditorSidebar from "@/components/ui/editor-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <>
      <EditorSidebar />
      <main className="relative w-full">
        <div className="flex-1 flex justify-center items-center h-full w-full">
          <SidebarTrigger className="absolute top-4 left-4" />
          <h1>Just start writing...</h1>
        </div>
      </main>
    </>
  );
};

export default page;
