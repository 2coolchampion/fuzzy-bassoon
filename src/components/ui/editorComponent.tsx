"use client";

import { useEffect, useRef } from "react";
import EditorJS, { BlockToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";

export default function EditorComponent() {
  const editorRef = useRef<EditorJS | null>();

  useEffect(() => {
    // Initialize editor only if it hasn't been initialized yet
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          // your tools configuration
        },
        placeholder: "Let's write something!",
      });
      // Assign the instance to ref only after initialization
      editorRef.current = editor;
    }
    // Cleanup

    return () => {
      // Check if editor exists and has destroy method

      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        try {
          editorRef.current.destroy();
          editorRef.current = null;
        } catch (e) {
          console.error("ERROR destroying editor:", e);
        }
      }
    };
  }, []);

  return <div id="editorjs" className="prose bg-fuchsia-400 max-w-full" />;
}
