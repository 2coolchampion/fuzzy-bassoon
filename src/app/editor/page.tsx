"use client";

import Layout2 from "@/components/ui/layout2";
import Layout1 from "@/components/ui/layout1";
import Conditional from "@/components/ui/conditional";
import { useState } from "react";

export const Main = () => {
  return <div className="w-full h-full">Main</div>;
};

const editor = () => {
  const [layout, setLayout] = useState<"layout1" | "layout2">("layout1");

  return (
    <>
      <Conditional when={layout} setAction={setLayout} />
    </>
  );
};

export default editor;
