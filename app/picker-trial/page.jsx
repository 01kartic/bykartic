"use client";
import { ColorPicker } from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [opacity, setOpacity] = useState(true);
  return <div className="fixed inset-0 z-80 bg-background flex flex-col items-center gap-10 p-16 md:p-32 w-full h-screen">
    <ColorPicker opacity={opacity} />
    <p className="max-w-96 text-center">A color picker component built with React Aria Components. If opacity is disabled then you can change color format also.</p>
    <Button size="sm" onClick={() => setOpacity(!opacity)}>{opacity ? "Disable" : "Enable"} Opacity</Button>
  </div>;
}