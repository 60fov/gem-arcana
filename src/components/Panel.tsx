import { type ReactNode } from "react"

type Props = {
    title: string
    className?: string
    children: ReactNode
}
const Panel = ({ title, className = "bg-neutral-900 text-white", children }: Props) => {
    
    return (
        <div className={`flex flex-col gap-4 rounded-2xl text-2xl px-5 py-5 ${className}`}>
            <h2 className="text-6xl opacity-90 font-semibold"> {title} </h2>
            {children}
        </div>
    )
}

export default Panel