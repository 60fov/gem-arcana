import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import GemDisplay from "../components/GemDisplay"
import { trpc } from "../utils/trpc"

const Transmutation = () => {
    const { data: session } = useSession({ required: true })

    const [gemId, setGemId] = useState("")

    const tctx = trpc.useContext()

    const mutation = trpc.gem.create.useMutation({
        onSuccess(newGem) {
            setGemId(newGem.id)
            tctx.gem.find.setData(newGem.id, () => newGem)

        },
        onError(error) {
            console.log(error)
        }
    })

    useEffect(() => {
        console.log(mutation.isLoading)
    }, [mutation.isLoading])

    const onTransmute = () => {
        mutation.mutate()
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
            <GemDisplay gemId={gemId} />

            <Button
                className="text-6xl"
                onClick={onTransmute}
                disabled={mutation.isLoading}
            >
                {"🪄"}
            </Button>
        </div >
    )
}

export default Transmutation