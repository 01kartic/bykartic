"use client";

import * as React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const components = [
    {
      name: "Color Picker",
      logo: "/images/ColorPicker.png",
      link: "/color-picker",
      new: true
    },
  ]

  React.useEffect(() => {
    router.replace("/picker-trial");
  }, [router]);

  // return (
  //   <>
  //     <div className="py-8 pt-16 md:pt-24 text-center">
  //       <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dashed p-1 pr-3 text-sm">
  //         <Badge className="rounded-full">NEW</Badge>
  //         Introducing Shadcn CLI ✨
  //       </div>
  //       <h1 className="mb-6 text-3xl font-bold tracking-tight text-pretty md:text-5xl">
  //         React-based Components for your next project
  //       </h1>
  //       <p className="text-muted-foreground md:text-lg">
  //         Build your next project with new fress components, You can use it in <span className="text-primary font-semibold">Pure React</span>, <span className="text-primary font-semibold">NextJS</span> or <span className="text-primary font-semibold">Shadcn UI</span> projects.
  //       </p>
  //     </div>
  //     <div className="flex flex-col items-start gap-3 mt-4">
  //       <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Featured Components</h2>
  //       <div className="w-full flex flex-col items-center gap-1">
  //         {components.map((component, index) =>
  //           <div className="flex items-center justify-between self-stretch py-2 md:p-2 rounded-xl gap-2 hover:bg-secondary transition-all duration-300 ease-in-out cursor-pointer" key={index} onClick={() => router.replace(component.link)}>
  //             <div className="flex items-center gap-3">
  //               <Image src={component.logo} alt={component.name} width={40} height={40} className="w-10 h-10 rounded-md border" />
  //               <span className="font-bold text-lg">{component.name}</span>
  //               {component.new && <Badge variant="secondary" className="rounded-full font-mono">NEW</Badge>}
  //             </div>
  //             <ArrowUpRight className="size-5 text-muted-foreground mr-2" />
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // )
}
