"use client";

import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Terminal, Check } from 'lucide-react';

export default function CopyCommand({ name }: { name: string }) {
    const [isCopied, setIsCopied] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const copyCommand = (type: string) => {
        let command = ""
        switch (type) {
            case "pnpm": {
                command = `pnpm add https://${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`
                break
            }
            case "npm": {
                command = `npm install https://${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`
                break
            }
            case "yarn": {
                command = `yarn add https://${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`
                break
            }
            case "bun": {
                command = `bunx --bun shadcn@latest add https://${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`
                break
            }
        }

        if (command) {
            try {
                navigator.clipboard.writeText(command).catch(() => {
                    const textarea = document.createElement('textarea');
                    textarea.value = command;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                });
                setIsCopied(true);
                setIsDisabled(true);
                setTimeout(() => {
                    setIsCopied(false);
                    setIsDisabled(false);
                }, 3000);
            } catch (error) {
                console.error('Failed to copy: ', error);
            }
        }
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" disabled={isDisabled}>
                {isCopied ? (
                    <>
                        <Check className="mr-1 h-4 w-4" /> Copied !
                    </>
                ) : (
                    <>
                        <Terminal className="mr-1 h-4 w-4" /> CLI
                    </>
                )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => copyCommand("pnpm")}>pnpm</DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyCommand("npm")}>npm</DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyCommand("yarn")}>yarn</DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyCommand("bun")}>bun</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
