import { type ReactNode } from "react"

type Props = {
    children?: ReactNode
    label: string
    width?: number
    className?: string
}

const Label = ({ label, width, className = "", children = "✧.｡･˚ﾟ･ﾟ✧☽" }: Props) => {
    return (
        <div className={`border-2 border-gray-600/30 px-3 py-1 rounded-lg inline-block w-full ${className}`}>
            <div className=" relative text-xl font-mono">
                {children}
            </div>
            <div className="opacity-30 relative leading-none tracking-wide text-[12px] font-semibold">
                {label}
            </div>
        </div>
    )
}

export default Label