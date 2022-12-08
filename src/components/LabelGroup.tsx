import { type ReactElement } from "react"
import type Label from "./Label"

// TODO: pass dark property to children
type Props = {
    children: ReactElement<typeof Label>[]
    col?: boolean
}
const LabelGroup = ({ col = false, children }: Props) => {

    return (
        <div className={`w-full flex gap-4 rounded-2xl ${col ? "flex-col" : ""}`}>
            {children}
        </div>
    )
}

export default LabelGroup