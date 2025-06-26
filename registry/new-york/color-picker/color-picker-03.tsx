"use client";

import { ColorPicker } from "./components/color-picker";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ColorPicker03() {
	const [colors, setColors] = useState<string[]>([]);
	const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);

	const addColor = () => {
		if (colors.length < 4) {
			const preColor = ["#64748b", "#6b7280", "#71717a", "#737373", "#78716c", "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];
			const randomIndex = Math.floor(Math.random() * preColor.length);
			setColors([...colors, preColor[randomIndex]]);
			setActiveColorIndex(colors.length);
		}
	};

	const removeColor = (index: number) => {
		const newColors = colors.filter((_, i) => i !== index);
		setColors(newColors);
		setActiveColorIndex(null);
	};

	const updateColor = (index: number, newColor: string) => {
		const newColors = [...colors];
		newColors[index] = newColor;
		setColors(newColors);
	};

	return (
		<div className="flex flex-wrap gap-3">
			{colors.map((color, index) => (
				<div key={index} className="relative">
					<Popover
						open={activeColorIndex === index}
						onOpenChange={(open) => {
							if (open) {
								setActiveColorIndex(index);
							} else if (activeColorIndex === index) {
								setActiveColorIndex(null);
							}
						}}
					>
						<PopoverTrigger
							className="size-9 border rounded-md focus:border-ring focus:ring-[3px] focus:ring-ring/20 cursor-pointer relative"
							style={{ backgroundColor: color }}
						>
							<Badge
								variant="destructive"
								className="absolute -top-2 -right-2 rounded-full size-5 p-0.5 text-white"
								onClick={(e) => {
									e.stopPropagation();
									removeColor(index);
								}}
							>
								<X size={12} strokeWidth={2.5} />
							</Badge>
						</PopoverTrigger>
						<PopoverContent
							onOpenAutoFocus={(e) => e.preventDefault()}
							align="start"
							className="w-fit p-0 m-0 border-none rounded-2xl"
						>
							<ColorPicker
								onColorChange={(newColor) => {
									if (newColor.hex !== color) {
										updateColor(index, newColor.hex);
									}
								}}
								defaultColor={color}
								isColorFormat={false}
								isOpacity={false}
							/>
						</PopoverContent>
					</Popover>
				</div>
			))}

			{colors.length < 4 && (
				<Button
					size="icon"
					variant="outline"
					className="border-dashed"
					onClick={addColor}
					title="Add Color"
				>
					<Plus />
				</Button>
			)}
		</div>
	);
}
