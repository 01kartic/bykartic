"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button';
import { toast } from "sonner"

export default function PropertieTable() {
    const example = {
        hex: "#00FF00",
        rgb: "rgb(0, 255, 0)",
        hsl: "hsl(120, 100%, 50%)",
        hsv: "hsv(120, 100%, 100%)",
        values: {
            rgb: [0, 255, 0],
            hsl: [120, 100, 50],
            hsv: [120, 100, 100],
            alpha: 1
        }
    }

    const properties = [
        {
            name: 'onColorChange',
            type: 'function',
            description: () => (
                <p>
                    Callback function called with color object when color changes. See{" "}
                    <span
                        className="font-semibold underline underline-offset-3 cursor-pointer hover:no-underline"
                        onClick={() => toast("Example of returned color", {
                            description: (
                                <>
                                    <pre className="mt-2 w-full rounded bg-black p-4">
                                        <code className="text-white">{JSON.stringify(example, null, 2)}</code>
                                    </pre>
                                    <div className="mt-2 flex items-center gap-2 [&>button]:h-7 [&>button]:p-2.5">
                                        <Button className="hidden md:flex" variant="outline" size="sm" onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(example, null, 2))
                                            toast.success("Copied to clipboard")
                                        }}>Copy</Button>
                                        <Button variant="destructive" size="sm" onClick={() => toast.dismiss("color-example")}>Close</Button>
                                    </div>
                                </>
                            ),
                            id: "color-example",
                            duration: 10000
                        })}>example</span>
                </p >
            ),
        },
        {
            name: 'defaultColor',
            type: 'string',
            description: () => (
                <p>Set default selected color when picker will open. Allowed formates are <strong>hex</strong>, <strong>rgb</strong>, <strong>hsl</strong> and <strong>hsv</strong>.</p>
            ),
        },
        {
            name: 'defaultColorFormat',
            type: 'string',
            description: () => (
                <p>Set default selected color format for defaultColor from <strong>hex</strong>/<strong>rgb</strong>/<strong>hsl</strong>/<strong>hsv</strong>.</p>
            ),
        },
        {
            name: 'isOpacity',
            type: 'boolean',
            description: () => (
                <p>Show and allow to select <strong>Opacity</strong> in picker. by default <code className="bg-muted text-xs px-1 py-0.5 rounded">true</code></p>
            ),
        },
        {
            name: 'isColorFormat',
            type: 'boolean',
            description: () => (
                <p>Show color format changer in picker. by default <code className="bg-muted text-xs px-1 py-0.5 rounded">true</code></p>
            ),
        },
        {
            name: 'isEyeDropper',
            type: 'boolean',
            description: () => (
                <p>Show eye dropper in picker. by default <code className="bg-muted text-xs px-1 py-0.5 rounded">true</code></p>
            ),
        },
    ]

    const getBadgeType = (type: string) => {
        switch (type) {
            case 'string': return 'secondary';
            case 'function': return 'outline';
            case 'boolean': return 'default';
            default: return 'default';
        }
    }

    return <div className="md:-mx-6 my-4 border rounded-lg overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr className="m-0 p-0 bg-muted [&>th]:px-4 [&>th]:py-2 [&>th]:text-left text-sm font-semibold">
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {properties.map((prop) => (
                    <tr key={prop.name} className="border-t m-0 p-0 [&>td]:px-4 [&>td]:py-3 [&>td]:text-left [&>td]:text-sm">
                        <td className="font-mono">
                            {prop.name}
                        </td>
                        <td>
                            <Badge className="font-mono" variant={getBadgeType(prop.type)}>
                                {prop.type}
                            </Badge>
                        </td>
                        <td className="min-w-64">
                            {prop.description()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}