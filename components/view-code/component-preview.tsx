import React from "react"
import {
  Tab,
  TabContent,
  TabList,
  TabTrigger,
} from "@/components/ui/tab"
import { ComponentSource } from "@/components/view-code/component-source"
import { ComponentType } from "react"
import CopyCommand from "@/components/view-code/copy-command"
import { OpenInV0Button } from "@/components/open-in-v0-button"

export function ComponentPreview({ size = 100, component, src, name }: { size?: number, component?: ComponentType, src?: string, name?: string }) {
  return (
    <div className="flex w-full flex-col gap-4 py-10">
      <Tab defaultValue="preview">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <TabList>
            <TabTrigger value="preview">Preview</TabTrigger>
            <TabTrigger value="code">Code</TabTrigger>
          </TabList>
          <div className="flex items-center gap-2">
            <CopyCommand name={name || ""} />
            <OpenInV0Button name={name || ""} />
          </div>
        </div>
        <TabContent value="preview" className="flex items-center justify-center border rounded-lg px-10 md:-mx-6" style={{ minHeight: `${size * 4}px` }}>
          {component && React.createElement(component)}
        </TabContent>
        <TabContent value="code">
          <ComponentSource size={size} src={src} />
        </TabContent>
      </Tab>
    </div>
  )
}
