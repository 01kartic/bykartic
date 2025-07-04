"use client";

import { ColorPicker } from "./components/color-picker";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";

export default function ColorPicker01() {
	const [color, setColor] = useState("#FF0000");

	return (
		<div className="flex flex-col space-y-2">
			<Popover>
				<PopoverTrigger
					id="color-input-01"
					className="size-9 border rounded-md focus:border-ring focus:ring-[3px] focus:ring-ring/20 cursor-pointer"
					style={{ backgroundColor: color }}
				></PopoverTrigger>
				<PopoverContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					align="start"
					className="w-fit p-0 m-0 border-none rounded-2xl"
				>
					<ColorPicker
						onColorChange={(newColor) => {
							if (newColor.hex !== color) {
								setColor(newColor.hex);
							}
						}}
						defaultColor={color}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
