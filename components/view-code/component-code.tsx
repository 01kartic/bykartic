"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { Event, trackEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function ComponentCode({
    code,
    highlightedCode,
    size
}: {
    code: string
    highlightedCode: string
    size?: number
}) {
    return (
        <figure className="relative" style={size !== undefined && size > 0 ? { "--height": `${size}` } as React.CSSProperties : undefined} data-rehype-pretty-code-figure >
            <CopyButton value={code} />
            <div className="overflow-auto no-scrollbar bg-code text-sm rounded-lg" dangerouslySetInnerHTML={{ __html: highlightedCode }} style={size !== undefined && size > 0 ? { height: `${size * 4}px`} : undefined} />
        </figure>
    )
}


export function copyToClipboardWithMeta(value: string, event?: Event) {
    navigator.clipboard.writeText(value)
    if (event) trackEvent(event)
}

export function CopyButton({
    value,
    className,
    variant = "ghost",
    event,
    ...props
}: React.ComponentProps<typeof Button> & {
    value: string
    src?: string
    event?: Event["name"]
}) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        if (hasCopied) {
            const timer = setTimeout(() => setHasCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [hasCopied])

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    data-slot="copy-button"
                    size="icon"
                    variant="ghost"
                    className={cn(
                        "bg-code absolute top-3 right-3 z-10 size-7",
                        className
                    )}
                    onClick={() => {
                        copyToClipboardWithMeta(
                            value,
                            event
                                ? { name: event, properties: { code: value } }
                                : undefined
                        )
                        setHasCopied(true)
                    }}
                    {...props}
                >
                    <span className="sr-only">Copy</span>
                    {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
                {hasCopied ? "Copied" : "Copy to Clipboard"}
            </TooltipContent>
        </Tooltip>
    )
}