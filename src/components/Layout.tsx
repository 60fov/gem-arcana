import { type ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function LayoutFlexColCenter({ children }: Props) {
    // TODO: clsx or somethings
    return (
        <div
            className={`w-screen h-screen flex flex-col items-center justify-center gap-12`}
        >
            {children}
        </div>
    )
}