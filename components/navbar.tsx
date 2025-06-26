"use client";

import {
  Barcode,
  SunMedium,
  MoonIcon
} from "lucide-react"
import * as React from "react";
import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";


export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter();
  const [star, setStar] = React.useState<number>(0);

  React.useEffect(() => {
    fetch("https://api.github.com/repos/01kartic/bykartic")
      .then((res) => res.json())
      .then((data) => {
        setStar(data.stargazers_count);
      })
      .catch((err) => console.error("Error fetching star count:", err));
  }, []);


  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[calc(100%-20px)] bg-background/50 backdrop-blur-sm flex h-12 items-center justify-between gap-4 px-2 rounded-xl">
      {/* Left side */}
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-6">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 p-2 items-center justify-center rounded-md cursor-pointer" onClick={() => router.replace("/")}>
            <Barcode />
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" className="has-[>svg]:px-2" onClick={() => router.push("https://github.com/01kartic/shadcn-components")}>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436c.55.096.756-.233.756-.522c0-.262-.013-1.128-.013-2.049c-2.764.509-3.479-.674-3.699-1.292c-.124-.317-.66-1.293-1.127-1.554c-.385-.207-.936-.715-.014-.729c.866-.014 1.485.797 1.691 1.128c.99 1.663 2.571 1.196 3.204.907c.096-.715.385-1.196.701-1.471c-2.448-.275-5.005-1.224-5.005-5.432c0-1.196.426-2.186 1.128-2.956c-.111-.275-.496-1.402.11-2.915c0 0 .921-.288 3.024 1.128a10.2 10.2 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371c2.104-1.43 3.025-1.128 3.025-1.128c.605 1.513.221 2.64.111 2.915c.701.77 1.127 1.747 1.127 2.956c0 4.222-2.571 5.157-5.019 5.432c.399.344.743 1.004.743 2.035c0 1.471-.014 2.654-.014 3.025c0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11" />
              </svg>
              {star > 0 ? star : null}
            </Button></TooltipTrigger>
          <TooltipContent>
            <p>Stars on GitHub</p>
            <p>Click to Open Repo</p>
          </TooltipContent>
        </Tooltip>
        <Button
          variant="ghost"
          size="icon"
          className="group size-8"
          data-state={theme === "dark" ? "on" : "off"}
          onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
        >
          <MoonIcon
            size={16}
            className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
            aria-hidden="true"
          />
          <SunMedium
            size={16}
            className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
            aria-hidden="true"
          />
        </Button>
      </div>
    </header>
  )
}
