"use client"

import ColorPicker from '@/registry/new-york/color-picker/components/color-picker'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'

export default function PickerPlayground() {
  const [prop, setProp] = useState([
    { check: true, label: 'Opacity' },
    { check: true, label: 'Eye Dropper' },
    { check: true, label: 'Formats' }
  ])

  return <div className="w-full flex flex-col items-center justify-center gap-10 my-16">
    <ColorPicker
      isOpacity={prop[0].check}
      isEyeDropper={prop[1].check}
      isColorFormat={prop[2].check}
    />
    <div className="flex flex-wrap gap-3">
      {
        prop.map((item, index) => (
          <Button
            key={index}
            variant={item.check ? 'default' : 'outline'}
            className={`group transition-all duration-400 ease-in-out ${item.label === "Eye Dropper" ? "hidden md:flex" : ""}`}
            onClick={() => {
              const newProp = [...prop]
              newProp[index].check = !newProp[index].check
              setProp(newProp)
            }}
          >
            <Check className={`${item.check ? 'opacity-100' : 'opacity-0'} transition-all duration-400 ease-in-out`} />
            {item.label}
          </Button>
        ))
      }
    </div>
  </div>
}
