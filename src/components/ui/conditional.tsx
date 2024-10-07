import React from "react";
import Layout1 from "./layout1";
import Layout2 from "./layout2";
import { Layout } from "@/lib/types";

interface ConditionalProps extends React.HTMLAttributes<HTMLDivElement> {
  when: "layout1" | "layout2";
  setAction: React.Dispatch<React.SetStateAction<Layout>>;
}
const Conditional: React.FC<ConditionalProps> = ({
  when,
  children,
  setAction,
}: ConditionalProps) => {
  if (when === "layout1") {
    return <Layout1 setLayout={setAction} />;
  } else if (when === "layout2") {
    return <Layout2 setLayout={setAction} />;
  }
  return null;
};

export default Conditional;
