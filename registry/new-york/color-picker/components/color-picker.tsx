"use client";

import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import convert from "color-convert";

export interface ColorObject {
	hex: string;
	rgb: string;
	hsl: string;
	hsv: string;
	values: {
		rgb: [number, number, number];
		hsl: [number, number, number];
		hsv: [number, number, number];
		alpha: number;
	};
}

export interface ColorPickerProps {
	onColorChange?: (color: ColorObject) => void;
	defaultColor?: string;
	defaultColorFormat?: "hex" | "rgb" | "hsl" | "hsv";
	isColorFormat?: boolean;
	isEyeDropper?: boolean;
	isOpacity?: boolean;
}

export type ColorFormats =
	| "hex"
	| "hexa"
	| "rgb"
	| "rgba"
	| "hsl"
	| "hsla"
	| "hsv"
	| "hsva";

const sliderStyles = `
  .hueSlider::-webkit-slider-thumb,
  .opacitySlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
    cursor: grab;
  }

  .hueSlider::-webkit-slider-thumb {
    background: var(--thumb-color);
  }

  .hueSlider::-webkit-slider-thumb:active,
  .opacitySlider::-webkit-slider-thumb:active {
    cursor: grabbing;
  }
`;

const hsvToRgb = (h: number, s: number, v: number) => {
	const scaled = convert.hsv.rgb([h * 360, s * 100, v * 100]);
	return { r: scaled[0], g: scaled[1], b: scaled[2] };
};

const RGBtoHex = (r: number, g: number, b: number, a: number = 1) => {
	const hex = convert.rgb.hex([r, g, b]);
	return a !== 1
		? `#${hex}${Math.round(a * 255)
				.toString(16)
				.padStart(2, "0")}`
		: `#${hex}`;
};

const getAllColorFormats = (
	r: number,
	g: number,
	b: number,
	a: number,
	isOpacity: boolean
): ColorObject => {
	const rgbArray: [number, number, number] = [r, g, b];
	const hslArray = convert.rgb.hsl(rgbArray);
	const hsvArray = convert.rgb.hsv(rgbArray);
	const includeAlpha = isOpacity && a < 1;

	return {
		hex: includeAlpha ? RGBtoHex(r, g, b, a) : `#${convert.rgb.hex(rgbArray)}`,
		rgb: includeAlpha
			? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
			: `rgb(${r}, ${g}, ${b})`,
		hsl: includeAlpha
			? `hsla(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%, ${a.toFixed(
					2
			  )})`
			: `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`,
		hsv: includeAlpha
			? `hsva(${hsvArray[0]}, ${hsvArray[1]}%, ${hsvArray[2]}%, ${a.toFixed(
					2
			  )})`
			: `hsv(${hsvArray[0]}, ${hsvArray[1]}%, ${hsvArray[2]}%)`,
		values: {
			rgb: rgbArray,
			hsl: hslArray,
			hsv: hsvArray,
			alpha: a,
		},
	};
};

const parseColor = (color: string, isOpacity: boolean) => {
	let h = 0,
		s = 1,
		v = 1,
		a = 1;

	try {
		if (!color) return { h, s, v, a };

		if (color.startsWith("#")) {
			const cleanHex = color.slice(1);
			let r = 0,
				g = 0,
				b = 0;

			if (cleanHex.length === 3 || cleanHex.length === 4) {
				r = parseInt(cleanHex[0] + cleanHex[0], 16);
				g = parseInt(cleanHex[1] + cleanHex[1], 16);
				b = parseInt(cleanHex[2] + cleanHex[2], 16);
				if (cleanHex.length === 4) {
					a = parseInt(cleanHex[3] + cleanHex[3], 16) / 255;
				}
			} else if (cleanHex.length >= 6) {
				r = parseInt(cleanHex.substring(0, 2), 16);
				g = parseInt(cleanHex.substring(2, 4), 16);
				b = parseInt(cleanHex.substring(4, 6), 16);
				if (cleanHex.length >= 8) {
					a = parseInt(cleanHex.substring(6, 8), 16) / 255;
				}
			}

			const hsv = convert.rgb.hsv([r, g, b]);
			h = hsv[0] / 360;
			s = hsv[1] / 100;
			v = hsv[2] / 100;
		} else if (color.startsWith("rgb")) {
			const values = color.match(/[\d.]+/g)?.map(Number) || [];
			if (values.length >= 3) {
				const [r, g, b] = values;
				const hsv = convert.rgb.hsv([r, g, b]);
				h = hsv[0] / 360;
				s = hsv[1] / 100;
				v = hsv[2] / 100;
				if (values.length >= 4) a = values[3];
			}
		} else if (color.startsWith("hsl")) {
			const values = color.match(/[\d.]+/g)?.map(Number) || [];
			if (values.length >= 3) {
				const [hVal, sVal, lVal] = values;
				const rgb = convert.hsl.rgb([hVal, sVal, lVal]);
				const hsv = convert.rgb.hsv(rgb);
				h = hsv[0] / 360;
				s = hsv[1] / 100;
				v = hsv[2] / 100;
				if (values.length >= 4) a = values[3];
			}
		} else if (color.startsWith("hsv")) {
			const values = color.match(/[\d.]+/g)?.map(Number) || [];
			if (values.length >= 3) {
				h = (values[0] % 360) / 360;
				s = Math.min(100, Math.max(0, values[1])) / 100;
				v = Math.min(100, Math.max(0, values[2])) / 100;
				if (values.length >= 4) a = values[3];
			}
		}
	} catch (error) {
		console.error("Error parsing color:", error);
	}

	return {
		h,
		s: Math.min(1, Math.max(0, s)),
		v: Math.min(1, Math.max(0, v)),
		a: isOpacity ? Math.min(1, Math.max(0, a)) : 1,
	};
};

export function ColorPicker({
	onColorChange,
	defaultColor = "#FF0000",
	defaultColorFormat = "hex",
	isColorFormat = true,
	isEyeDropper = true,
	isOpacity = true,
}: ColorPickerProps) {
	const [hue, setHue] = useState(0);
	const [saturation, setSaturation] = useState(1);
	const [value, setValue] = useState(1);
	const [alpha, setAlpha] = useState(1);
	const [userInputValue, setUserInputValue] = useState("");
	const [inputFormat, setInputFormat] = useState<ColorFormats>(
		isOpacity ? "hexa" : "hex"
	);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const pickerRef = useRef<HTMLDivElement>(null);
	const [isEyeDropperAvailable, setIsEyeDropperAvailable] = useState(false);

	useEffect(() => {
		const styleElement = document.createElement("style");
		styleElement.textContent = sliderStyles;
		document.head.appendChild(styleElement);
		return () => {
			document.head.removeChild(styleElement);
		};
	}, []);

	useEffect(() => {
		setIsEyeDropperAvailable("EyeDropper" in window);
	}, []);

	useEffect(() => {
		if (!isInitialized) {
			const initialColor =
				defaultColor || (isOpacity ? "#FF0000FF" : "#FF0000");
			const { h, s, v, a } = parseColor(initialColor, isOpacity);

			setHue(h);
			setSaturation(s);
			setValue(v);
			setAlpha(a);
			setUserInputValue(initialColor);

			let format: ColorFormats = isOpacity ? "hexa" : "hex";
			if (defaultColorFormat) {
				if (isOpacity) {
					switch (defaultColorFormat) {
						case "hex":
							format = "hexa";
							break;
						case "rgb":
							format = "rgba";
							break;
						case "hsl":
							format = "hsla";
							break;
						case "hsv":
							format = "hsva";
							break;
					}
				} else {
					format = defaultColorFormat;
				}
			}
			setInputFormat(format);
			setIsInitialized(true);
		}
	}, [defaultColor, isOpacity, defaultColorFormat, isInitialized]);

	const rgb = useMemo(
		() => hsvToRgb(hue, saturation, value),
		[hue, saturation, value]
	);

	const colorObject = useMemo(
		() => getAllColorFormats(rgb.r, rgb.g, rgb.b, alpha, isOpacity),
		[rgb.r, rgb.g, rgb.b, alpha, isOpacity]
	);

	const formatInputColor = useCallback((): string => {
		const { r, g, b } = rgb;
		const a = alpha;

		switch (inputFormat) {
			case "hex":
				return isOpacity && alpha < 1
					? RGBtoHex(r, g, b, a)
					: `#${convert.rgb.hex([r, g, b])}`;

			case "hexa":
				return RGBtoHex(r, g, b, a);

			case "rgb":
				return `rgb(${r}, ${g}, ${b})`;
			case "rgba":
				return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;

			case "hsl": {
				const [h, s, l] = convert.rgb.hsl([r, g, b]);
				return `hsl(${h}, ${s}%, ${l}%)`;
			}
			case "hsla": {
				const [h, s, l] = convert.rgb.hsl([r, g, b]);
				return `hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`;
			}

			case "hsv": {
				const [h, s, v] = convert.rgb.hsv([r, g, b]);
				return `hsv(${h}, ${s}%, ${v}%)`;
			}
			case "hsva": {
				const [h, s, v] = convert.rgb.hsv([r, g, b]);
				return `hsva(${h}, ${s}%, ${v}%, ${a.toFixed(2)})`;
			}

			default:
				return colorObject.hex;
		}
	}, [rgb, alpha, inputFormat, isOpacity, colorObject.hex]);

	useEffect(() => {
		if (!isInputFocused && isInitialized) {
			setUserInputValue(formatInputColor());
		}
	}, [formatInputColor, isInputFocused, isInitialized]);

	const prevColorRef = useRef<string>("");

	useEffect(() => {
		if (isInitialized && onColorChange) {
			const currentColorString = JSON.stringify(colorObject);
			if (currentColorString !== prevColorRef.current) {
				prevColorRef.current = currentColorString;
				onColorChange(colorObject);
			}
		}
	}, [colorObject, onColorChange, isInitialized]);

	const handleEyeDropper = async () => {
		if (!isEyeDropperAvailable) return;

		try {
			const eyeDropper = new (window as any).EyeDropper();
			const { sRGBHex } = await eyeDropper.open();
			const { h, s, v } = parseColor(sRGBHex, isOpacity);
			setHue(h);
			setSaturation(s);
			setValue(v);
		} catch {}
	};

	const handleColorCommit = () => {
		try {
			const { h, s, v, a } = parseColor(userInputValue, isOpacity);
			setHue(h);
			setSaturation(s);
			setValue(v);
			setAlpha(a);
			setUserInputValue(formatInputColor());
		} catch (error) {
			setUserInputValue(formatInputColor());
		}
		setIsInputFocused(false);
	};

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setUserInputValue(newValue);

		try {
			if (
				(inputFormat.startsWith("hex") &&
					/^#[0-9A-Fa-f]{6,8}$/.test(newValue)) ||
				(newValue.includes("(") && newValue.includes(")"))
			) {
				const { h, s, v, a } = parseColor(newValue, isOpacity);
				setHue(h);
				setSaturation(s);
				setValue(v);
				setAlpha(a);
			}
		} catch (err) {
			// Silently ignoring parsing errors during typing
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleColorCommit();
		}
	};

	const handleFormatChange = useCallback(
		(newFormat: ColorFormats) => {
			setInputFormat(newFormat);

			const { r, g, b } = rgb;
			const a = alpha;

			let formatted = "";
			switch (newFormat) {
				case "hex":
					formatted =
						isOpacity && alpha < 1
							? RGBtoHex(r, g, b, a)
							: `#${convert.rgb.hex([r, g, b])}`;
					break;
				case "hexa":
					formatted = RGBtoHex(r, g, b, a);
					break;
				case "rgb":
					formatted = `rgb(${r}, ${g}, ${b})`;
					break;
				case "rgba":
					formatted = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
					break;
				case "hsl": {
					const [h, s, l] = convert.rgb.hsl([r, g, b]);
					formatted = `hsl(${h}, ${s}%, ${l}%)`;
					break;
				}
				case "hsla": {
					const [h, s, l] = convert.rgb.hsl([r, g, b]);
					formatted = `hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`;
					break;
				}
				case "hsv": {
					const [h, s, v] = convert.rgb.hsv([r, g, b]);
					formatted = `hsv(${h}, ${s}%, ${v}%)`;
					break;
				}
				case "hsva": {
					const [h, s, v] = convert.rgb.hsv([r, g, b]);
					formatted = `hsva(${h}, ${s}%, ${v}%, ${a.toFixed(2)})`;
					break;
				}
			}

			if (formatted) {
				setUserInputValue(formatted);
			}
		},
		[rgb, alpha, isOpacity]
	);

	const handleInteraction = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			if (!pickerRef.current) return;

			const isTouch = "touches" in e;
			const clientX = isTouch
				? e.touches[0].clientX
				: (e as React.MouseEvent).clientX;
			const clientY = isTouch
				? e.touches[0].clientY
				: (e as React.MouseEvent).clientY;
			const rect = pickerRef.current.getBoundingClientRect();

			const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
				if (!pickerRef.current) return;

				const rect = pickerRef.current.getBoundingClientRect();
				const moveX =
					"touches" in moveEvent
						? moveEvent.touches[0].clientX
						: (moveEvent as MouseEvent).clientX;
				const moveY =
					"touches" in moveEvent
						? moveEvent.touches[0].clientY
						: (moveEvent as MouseEvent).clientY;

				const newSaturation = Math.max(
					0,
					Math.min(1, (moveX - rect.left) / rect.width)
				);
				const newValue = Math.max(
					0,
					Math.min(1, 1 - (moveY - rect.top) / rect.height)
				);

				setSaturation(newSaturation);
				setValue(newValue);
			};

			const endHandler = () => {
				document.removeEventListener(
					isTouch ? "touchmove" : "mousemove",
					moveHandler
				);
				document.removeEventListener(
					isTouch ? "touchend" : "mouseup",
					endHandler
				);
			};

			document.addEventListener(
				isTouch ? "touchmove" : "mousemove",
				moveHandler
			);
			document.addEventListener(isTouch ? "touchend" : "mouseup", endHandler);

			setSaturation(
				Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
			);
			setValue(
				Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height))
			);
		},
		[]
	);

	const pickerStyle = {
		background: `linear-gradient(to bottom, rgba(0,0,0,0), black), 
                linear-gradient(to right, white, hsl(${hue * 360}, 100%, 50%))`,
	};

	const thumbStyle = {
		left: `${saturation * 100}%`,
		top: `${(1 - value) * 100}%`,
		backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
	};

	if (!isInitialized) {
		return null;
	}

	return (
		<div
			className={`${
				isColorFormat ? "w-64" : "w-56"
			} bg-background border rounded-2xl shadow-lg mt-1`}
		>
			<div className="flex flex-col">
				<div className="flex m-2 gap-1.5">
					<Input
						value={userInputValue}
						onChange={handleColorChange}
						onFocus={() => setIsInputFocused(true)}
						onBlur={handleColorCommit}
						onKeyDown={handleKeyDown}
						className={`h-8 flex-1 text-xs md:text-xs px-2 py-1.5 ${
							inputFormat.startsWith("hex") ? "uppercase" : ""
						}`}
						placeholder={
							inputFormat.startsWith("hex")
								? "#FF0000"
								: inputFormat.startsWith("rgb")
								? "rgb(255, 0, 0)"
								: inputFormat.startsWith("hsl")
								? "hsl(0, 100%, 50%)"
								: "hsv(0, 100%, 100%)"
						}
					/>
					{isColorFormat && (
						<Select value={inputFormat} onValueChange={handleFormatChange}>
							<SelectTrigger size="sm" className="w-18 text-xs px-2 gap-1">
								<SelectValue placeholder="Format" />
							</SelectTrigger>
							<SelectContent align="end" className="min-w-24">
								<SelectItem
									className="text-xs"
									value={isOpacity ? "hexa" : "hex"}
								>
									Hex
								</SelectItem>
								<SelectItem
									className="text-xs"
									value={isOpacity ? "rgba" : "rgb"}
								>
									{isOpacity ? "RGBa" : "RGB"}
								</SelectItem>
								<SelectItem
									className="text-xs"
									value={isOpacity ? "hsla" : "hsl"}
								>
									{isOpacity ? "HSLa" : "HSL"}
								</SelectItem>
								<SelectItem
									className="text-xs"
									value={isOpacity ? "hsva" : "hsv"}
								>
									{isOpacity ? "HSVa" : "HSV"}
								</SelectItem>
							</SelectContent>
						</Select>
					)}
				</div>

				<div
					ref={pickerRef}
					className={`relative w-full ${
						isColorFormat ? "size-64" : "size-56"
					} border-y dark:border-[#1D1D1D] cursor-crosshair active:cursor-grabbing aspect-square`}
					style={pickerStyle}
					onMouseDown={handleInteraction}
					onTouchStart={handleInteraction}
				>
					<div
						className="absolute w-5 h-5 rounded-full border-4 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
						style={thumbStyle}
					/>
				</div>

				<div className="w-full flex justify-between items-center p-2 gap-2">
					{isEyeDropper && isEyeDropperAvailable && (
						<Button
							onClick={handleEyeDropper}
							variant="ghost"
							size="icon"
							className={`shrink-0 ${
								isOpacity && isColorFormat ? "p-2" : "size-7"
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="shrink-0 size-8"
								viewBox="0 0 36 36"
								fill="none"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M14.7063 13.6953C14.0267 14.3749 14.0267 15.4768 14.7063 16.1564L14.8826 16.3328L11.0194 20.196C10.3667 20.8487 10 21.734 10 22.6571V25.1311C10 25.6116 10.3896 26.0013 10.8701 26.0013H13.3441C14.2672 26.0013 15.1525 25.6345 15.8053 24.9818L19.6685 21.1186L19.8448 21.2949C20.5244 21.9745 21.6263 21.9745 22.306 21.2949L23.4945 20.1063C24.1739 19.427 24.1742 18.3256 23.4953 17.646L23.3181 17.4688L25.0101 15.777C26.3316 14.4554 26.3316 12.3127 25.0101 10.9911C23.6885 9.66956 21.5458 9.66956 20.2242 10.9911L18.5323 12.683L18.3561 12.5067C17.6764 11.8271 16.5745 11.8271 15.8949 12.5067L14.7063 13.6953ZM16.1132 17.5633L18.4379 19.888L14.5747 23.7512C14.2483 24.0775 13.8057 24.261 13.3441 24.261H11.7403V22.6571C11.7403 22.1956 11.9236 21.7529 12.25 21.4265L16.1132 17.5633Z"
									fill="currentColor"
								/>
							</svg>
						</Button>
					)}

					<div className="w-full flex flex-col gap-2">
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={hue}
							onChange={(e) => setHue(parseFloat(e.target.value))}
							className="hueSlider w-full h-5 rounded-full appearance-none"
							style={
								{
									background: `linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)`,
									"--thumb-color": `hsl(${hue * 360}, 100%, 50%)`,
								} as React.CSSProperties
							}
						/>
						{isOpacity && (
							<div className="relative">
								<div
									className="w-full h-5 border rounded-full opacity-25 z-0"
									style={{
										backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='%23787878' fill-opacity='0.4' /%3E%3Crect width='5' height='5' fill='white'/%3E%3Crect x='5' y='5' width='5' height='5' fill='white'/%3E%3C/svg%3E")`,
									}}
								/>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									value={alpha}
									onChange={(e) => setAlpha(parseFloat(e.target.value))}
									className="absolute opacitySlider w-full h-5 top-0 left-0 rounded-full z-20 appearance-none"
									style={
										{
											background: `linear-gradient(to right, transparent, rgb(${rgb.r},${rgb.g},${rgb.b})`,
										} as React.CSSProperties
									}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ColorPicker;
