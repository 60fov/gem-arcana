import {
    type ChangeEventHandler,
    type KeyboardEventHandler,
    type ReactNode,
    useState,
    useRef
} from "react"

type Props = {
    placeholder?: string
    initialValue?: string
    disabled?: boolean
    prefixSymbol?: string
    submitSymbol?: string
    submitOnEnter?: boolean
    clearOnSubmit?: boolean
    onSubmit?: (value: string) => void
    onInput?: (value: string, old: string) => void
    children?: ReactNode
    // TODO: onTypeDebounce implement
    // onTypeDebounce?: (value: string, old: string) => void 
}

const Input = ({
    placeholder = "",
    initialValue = "",
    disabled = false,
    prefixSymbol = '🔎',
    submitSymbol = '→',
    submitOnEnter = true,
    clearOnSubmit = true,
    onSubmit = () => ({}),
    onInput = () => ({}),
    children
}: Props) => {

    const [value, setValue] = useState(initialValue)
    const ref = useRef<HTMLInputElement>(null)

    const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.currentTarget.value.trim()
        onInput(newValue, value)
        setValue(newValue)
    }

    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (submitOnEnter && event.key == "Enter") {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        onSubmit(value)
        if (clearOnSubmit) setValue("")
    }

    return (
        <div 
        className={`
        flex items-center gap-2 px-4 py-2 rounded-xl
        text-white text-xl tracking-wide cursor-text
        bg-white/10 shadow-md shadow-indigo-900/5 focus-within:shadow-xl
        border-2 border-white/20 hover:border-white/50 focus-within:border-white/70
        focus-within:-translate-y-[1px] focus-within:scale-105
        transition-all ease-out
        `}
        onClick={() => ref.current?.focus()}
        >
            <span className="cursor-cell">{prefixSymbol}</span>
            <input
                className={` outline-none bg-transparent box-content placeholder-white/50`}
                placeholder={placeholder}
                disabled={disabled}
                value={value} // TODO: audit
                onChange={handleInput}
                onKeyUp={handleKeyUp}
                ref={ref}
                style={{ width: `${22}ch` }}
            >
                {children}
            </input>
            <span 
            onClick={handleSubmit}
            className="opacity-50 hover:opacity-90 cursor-pointer">{submitSymbol}</span>
        </div>
    )
}

export default Input