"use client";

import { Input } from "@/components/ui/input";
import { ColorPicker } from "./components/color-picker";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ColorPicker04() {
	const form = useForm({
		defaultValues: {
			color: "#FF0000",
		},
	});

	function onSubmit(data: any) {
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded bg-black p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<div className="flex flex-col space-y-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="color"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Select Color</FormLabel>
								<FormControl>
									<Popover>
										<div className="relative" id="color-input-03">
											<PopoverTrigger asChild>
												<div
													className="absolute top-1/2 left-1.5 -translate-y-1/2 size-6 border rounded focus:border-ring focus:ring-[3px] focus:ring-ring/20 cursor-pointer"
													style={{ backgroundColor: field.value }}
												/>
											</PopoverTrigger>
											<Input
												type="text"
												className="pl-10"
												{...field}
												required
											/>
										</div>
										<PopoverContent
											onOpenAutoFocus={(e) => e.preventDefault()}
											align="start"
											className="w-fit p-0 m-0 border-none rounded-2xl"
										>
											<ColorPicker
												onColorChange={(newColor) => {
													if (newColor.rgb !== field.value) {
														form.setValue("color", newColor.hex);
													}
												}}
												defaultColor={field.value}
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button size="sm" type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
