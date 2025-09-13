"use client";

import * as Aria from "react-aria-components";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";

const DROPPER = () => {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.7063 5.69535C6.0267 6.37495 6.0267 7.47686 6.7063 8.15646L6.8826 8.33285L3.0194 12.1961C2.3667 12.8488 2 13.7341 2 14.6572V17.1312C2 17.6117 2.3896 18.0014 2.8701 18.0014H5.3441C6.2672 18.0014 7.1525 17.6346 7.8053 16.9819L11.6685 13.1187L11.8448 13.295C12.5244 13.9746 13.6263 13.9746 14.306 13.295L15.4945 12.1064C16.1739 11.4271 16.1742 10.3257 15.4953 9.64605L15.3181 9.46885L17.0101 7.77706C18.3316 6.45546 18.3316 4.31275 17.0101 2.99116C15.6885 1.66962 13.5458 1.66962 12.2242 2.99116L10.5323 4.68305L10.3561 4.50675C9.6764 3.82715 8.5745 3.82715 7.8949 4.50675L6.7063 5.69535ZM8.1132 9.56335L10.4379 11.8881L6.5747 15.7513C6.2483 16.0776 5.8057 16.2611 5.3441 16.2611H3.7403V14.6572C3.7403 14.1957 3.9236 13.753 4.25 13.4266L8.1132 9.56335Z"
        fill="currentColor"
      />
    </svg>
  );
};

function ColorPicker({ className, ...props }) {
  return <Aria.ColorPicker className={className} {...props} />;
}

function ColorSwatch({ className, disabled, ...props }) {
  return (
    <Aria.ColorSwatch
      className={cn(
        "w-10 h-9 border rounded-lg focus-visible::border-ring focus-visible::ring-[3px] focus-visible::ring-ring/20 active:ring-[3px] active:ring-ring/20 shrink-0 cursor-pointer",
        disabled && "cursor-not-allowed active:ring-0",
        className
      )}
      style={({ color }) => ({
        background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
      disabled={disabled}
      {...props}
    />
  );
}

function ColorArea({ className, ...props }) {
  return (
    <Aria.ColorArea
      colorSpace="hsb"
      xChannel="saturation"
      yChannel="brightness"
      className={cn(
        "max-w-full size-56 border-y cursor-crosshair active:cursor-grabbing aspect-square",
        className
      )}
      {...props}
    >
      <ColorThumb />
    </Aria.ColorArea>
  );
}

function ColorThumb({ className, ...props }) {
  return (
    <Aria.ColorThumb
      className={cn(
        "size-6 rounded-full border-5 border-white outline-1 outline-border -outline-offset-5 cursor-grab active:cursor-grabbing",
        props.slider && "translate-y-1/2",
        className
      )}
      {...props}
    />
  );
}

function ColorField({ className, ...props }) {
  return (
    <Aria.ColorField {...props} aria-label="Color value">
      <Aria.Input
        className={cn(
          "placeholder:text-muted-foreground dark:bg-input/30 border-input h-8 w-full min-w-0 rounded-md border bg-transparent px-2 py-1 text-xs shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          className
        )}
        title={props.title}
      />
    </Aria.ColorField>
  );
}

function ColorFieldWithFormats({ className, opacity }) {
  const formats = ["hex", "rgb", "hsl", "hsb"];
  const [format, setFormat] = useState(0);
  return !opacity ? (
    <div className="flex items-center gap-1.5">
      <Button
        size="sm"
        className={cn(
          "px-2 text-xs uppercase cursor-pointer",
          className
        )}
        aria-label="Color space"
        onClick={() => setFormat((format + 1) % formats.length)}
        title="Change color format"
      >
        {formats[format]}
      </Button>
      {format !== 0 ? (
        Aria.getColorChannels(formats[format]).map((channel) => (
          <ColorField
            key={channel}
            colorSpace={formats[format]}
            channel={channel}
            style={{ flex: 1 }}
          />
        ))
      ) : (
        <ColorField />
      )}
    </div>
  ) : (
    <ColorField />
  );
}

function ColorHueSlider({ className, ...props }) {
  return (
    <Aria.ColorSlider colorSpace="hsb" channel="hue" {...props}>
      <Aria.SliderTrack className={cn("w-full h-6 rounded-full", className)}>
        <ColorThumb slider />
      </Aria.SliderTrack>
    </Aria.ColorSlider>
  );
}

function ColorOpacitySlider({ className, ...props }) {
  return (
    <Aria.ColorSlider channel="alpha" {...props}>
      <Aria.SliderTrack
        className={cn("w-full h-6 rounded-full", className)}
        style={({ defaultStyle }) => ({
          background: `${defaultStyle.background},
            repeating-conic-gradient(#CDCDCD 0% 25%, white 0% 50%) 50% / 14px 14px`,
        })}
      >
        <ColorThumb slider />
      </Aria.SliderTrack>
    </Aria.ColorSlider>
  );
}

function EyeDropper({ className }) {
  let state = useContext(Aria.ColorPickerStateContext);

  // Check browser support.
  return (
    window.EyeDropper && (
      <Button
        variant="ghost"
        className={cn("size-8 [&_svg:not([class*='size-'])]:size-5", className)}
        aria-label="Eye dropper"
        onClick={() => {
          new window.EyeDropper()
            .open()
            .then((result) => state.setColor(Aria.parseColor(result.sRGBHex)))
            .catch((e) => {
              console.error(e);
            });
        }}
      >
        {DROPPER()}
      </Button>
    )
  );
}

function ColorSwatchPicker({ className, ...props }) {
  return (
    <Aria.ColorSwatchPicker
      className={cn("flex flex-wrap gap-1 p-2 border-t", className)}
      {...props}
    />
  );
}

function ColorSwatchPickerItem({ className, ...props }) {
  return (
    <Aria.ColorSwatchPickerItem {...props}>
      <ColorSwatch
        className={cn("size-6.5 rounded-md aspect-square", className)}
      />
    </Aria.ColorSwatchPickerItem>
  );
}

function ColorInput({
  className,
  opacity = false,
  eyedropper = true,
  showSuggestedColor = true,
  suggestedColor = [
    "#E63946",
    "#F1FAEE",
    "#A8DADC",
    "#457B9D",
    "#1D3557",
    "#FF6B6B",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#073B4C",
    "#8338EC",
    "#FF9F1C",
  ],
  disabled,
  ...props
}) {
  return (
    <ColorPicker className={className} {...props}>
      <Popover open={disabled ? false : undefined}>
        <PopoverTrigger asChild>
          <ColorSwatch disabled={disabled} />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-56 bg-background border rounded-2xl shadow-lg p-0 z-100"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-1.5 p-2">
            <ColorFieldWithFormats opacity={opacity} />
            {opacity && (
              <ColorField
                channel="alpha"
                className="w-13 text-end"
                title="Alpha"
              />
            )}
          </div>
          <ColorArea />
          <div className="flex items-center gap-2 p-2">
            {eyedropper && <EyeDropper className={opacity && "mx-1"} />}
            <div className="w-full flex flex-col gap-2">
              <ColorHueSlider />
              {opacity && <ColorOpacitySlider />}
            </div>
          </div>
          {showSuggestedColor && (
            <ColorSwatchPicker>
              {suggestedColor.map((color) => (
                <ColorSwatchPickerItem key={color} color={color} />
              ))}
            </ColorSwatchPicker>
          )}
        </PopoverContent>
      </Popover>
    </ColorPicker>
  );
}

export {
  ColorPicker,
  ColorSwatch,
  ColorArea,
  ColorThumb,
  ColorField,
  ColorFieldWithFormats,
  ColorHueSlider,
  ColorOpacitySlider,
  EyeDropper,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorInput,
};