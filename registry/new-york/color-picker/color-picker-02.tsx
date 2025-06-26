"use client";

import { Input } from "@/components/ui/input";
import { ColorPicker } from "./components/color-picker";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";

export default function ColorPicker02() {
	const [color, setColor] = useState("rgb(255, 0, 0)");

	return (
		<div className="flex flex-col space-y-2">
			<Popover>
				<div className="relative" id="color-input-03">
					<PopoverTrigger asChild>
						<div
							className="absolute top-1/2 left-1.5 -translate-y-1/2 size-6 border rounded focus:border-ring focus:ring-[3px] focus:ring-ring/20 cursor-pointer"
							style={{ backgroundColor: color }}
						/>
					</PopoverTrigger>
					<Input
						type="text"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						className="pl-10"
					/>
				</div>
				<PopoverContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					align="start"
					className="w-fit p-0 m-0 border-none rounded-2xl"
				>
					<ColorPicker
						onColorChange={(newColor) => {
							if (newColor.rgb !== color) {
								setColor(newColor.rgb);
							}
						}}
						defaultColor={color}
						defaultColorFormat="rgb"
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
