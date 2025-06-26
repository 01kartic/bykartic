import { ComponentPreview } from '@/components/view-code/component-preview'
import ColorPicker01 from '@/registry/new-york/color-picker/color-picker-01'
import ColorPicker02 from '@/registry/new-york/color-picker/color-picker-02'
import PropertieTable from '../../components/color-picker/properties-table'
import ColorPicker03 from '@/registry/new-york/color-picker/color-picker-03'
import ColorPicker04 from '@/registry/new-york/color-picker/color-picker-04'
import PickerPlayground from '../../components/color-picker/picker-playground'

export default function Page() {
    return <>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-pretty md:text-5xl pt-16 md:pt-24">
            Color Picker
        </h1>
        <p className="leading-7 text-muted-foreground">
            A color input with fresh color picker.
        </p>

        <PickerPlayground />

        <p className="leading-7 [&:not(:first-child)]:mt-6">
            This component provides a user-friendly interface for selecting colors, enhancing the user experience in applications that require color input. It features a popover with a color picker and an input field to display the selected color in any format like <strong>Hex</strong>, <strong>RGB</strong>, <strong>HSL</strong> and <strong>HSV</strong>.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            The component is designed to be easily integrated into forms or standalone, providing flexibility for developers.
        </p>

        <h3 className="text-2xl font-semibold tracking-tight mt-10">Properties</h3>

        <PropertieTable />

        <h3 className="text-2xl font-semibold tracking-tight mt-10">Example</h3>

        <h4 className="flex items-center text-xl font-semibold tracking-tight mt-8 -mb-4"><Dropper /> Color Input</h4>
        <ComponentPreview size={64} name="color-picker-01" component={ColorPicker01} src='/registry/new-york/blocks/color-picker/color-picker-01.tsx' />

        <h4 className="flex items-center text-xl font-semibold tracking-tight mt-8 -mb-4"><Dropper /> Color Input with Formated Value</h4>
        <ComponentPreview size={64} name="color-picker-02" component={ColorPicker02} src='/registry/new-york/blocks/color-picker/color-picker-02.tsx' />

        <h4 className="flex items-center text-xl font-semibold tracking-tight mt-8 -mb-2"><Dropper /> Color Palette Input</h4>
        <p className="leading-7 text-muted-foreground pl-10 -mb-4">Can add max 4 colors</p>
        <ComponentPreview size={64} name="color-picker-03" component={ColorPicker03} src='/registry/new-york/blocks/color-picker/color-picker-03.tsx' />

        <h4 className="flex items-center text-xl font-semibold tracking-tight mt-8 -mb-4"><Dropper /> Color Input in Shadcn Form</h4>
        <ComponentPreview size={72} name="color-picker-04" component={ColorPicker04} src='/registry/new-york/blocks/color-picker/color-picker-04.tsx' />
    </>
}

const Dropper = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" className="text-primary shrink-0 size-10 hover:text-chart-1" viewBox="0 0 36 36" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.7063 13.6953C14.0267 14.3749 14.0267 15.4768 14.7063 16.1564L14.8826 16.3328L11.0194 20.196C10.3667 20.8487 10 21.734 10 22.6571V25.1311C10 25.6116 10.3896 26.0013 10.8701 26.0013H13.3441C14.2672 26.0013 15.1525 25.6345 15.8053 24.9818L19.6685 21.1186L19.8448 21.2949C20.5244 21.9745 21.6263 21.9745 22.306 21.2949L23.4945 20.1063C24.1739 19.427 24.1742 18.3256 23.4953 17.646L23.3181 17.4688L25.0101 15.777C26.3316 14.4554 26.3316 12.3127 25.0101 10.9911C23.6885 9.66956 21.5458 9.66956 20.2242 10.9911L18.5323 12.683L18.3561 12.5067C17.6764 11.8271 16.5745 11.8271 15.8949 12.5067L14.7063 13.6953ZM16.1132 17.5633L18.4379 19.888L14.5747 23.7512C14.2483 24.0775 13.8057 24.261 13.3441 24.261H11.7403V22.6571C11.7403 22.1956 11.9236 21.7529 12.25 21.4265L16.1132 17.5633Z" fill="currentColor" />
    </svg>
}