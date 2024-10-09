"use client";
import ResponsiveChecker from "@/components/ui/ResponsiveChecker";

import Sidebar from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <ResponsiveChecker>
      <Sidebar />
    </ResponsiveChecker>
  );
};

export default page;
