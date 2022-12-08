import { type ReactNode } from "react"

type Props = {
    children?: ReactNode
    label: string
    dark?: boolean
    className?: string
}

const Label = ({ label, dark = false, className = "", children = "✧.｡･˚ﾟ･ﾟ✧☽" }: Props) => {
    return (
        <div className={`
        border-2 px-3 py-1 rounded-lg inline-block w-full 
        ${dark ? `border-white/20` : `border-black/10`}
        ${className}`
        }>
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