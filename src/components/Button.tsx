import { type ReactNode } from "react"

type Props = {
    children: ReactNode
    onClick: () => void
    disabled?: boolean
    className?: string
}

const Button = ({ children, onClick, disabled = false, className = "" }: Props) => {

    return (
        <button
            className={`rounded-xl px-4 py-2 text-white bg-white/10 hover:bg-white/20 transition ` + className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button