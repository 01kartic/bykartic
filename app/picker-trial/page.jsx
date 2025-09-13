"use client";
import { ColorInput } from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [opacity, setOpacity] = useState(false);
  const [color, setColor] = useState("#000000");
  return <div className="fixed inset-0 z-80 bg-background flex flex-col items-center gap-10 px-10 py-32 md:p-48 w-full h-screen">
    <div className="fixed top-0 w-full h-20 md:h-32" style={{backgroundColor: color}} />
    <ColorInput opacity={opacity} value={color} onChange={setColor} />
    <p className="max-w-96 text-center">A color picker component built with React Aria Components. If opacity is disabled then you can change color format also.</p>
    <Button size="sm" onClick={() => setOpacity(!opacity)}>{opacity ? "Disable" : "Enable"} Opacity</Button>
  </div>;
}