import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import Label from "../components/Label"
import LabelGroup from "../components/LabelGroup"
import Panel from "../components/Panel"
import { trpc } from "../utils/trpc"

const Transmutation = () => {
    const { data: session } = useSession({ required: true })

    const [gemId, setGemId] = useState("")

    const tctx = trpc.useContext()

    const { data: gem } = trpc.gem.find.useQuery(gemId, { enabled: !!gemId })

    const mutation = trpc.gem.create.useMutation({
        onSuccess(newGem) {
            setGemId(newGem.id)
            tctx.gem.find.setData(newGem.id, () => newGem)

        },
        onError(error) {
            console.log(error)
        }
    })

    const onTransmute = () => {
        mutation.mutate()
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
            <div className="flex gap-12 items-center">
                <Panel title={"Gem Traits"} >
                    <Label label="ID" width={22}>{gem?.id}</Label>
                    <Label label="color" width={3}>{gem?.color}</Label>
                    <Label label="mass" width={4}>{gem?.mass}</Label>
                    <Label label="clarity" width={4}>{gem?.clarity?.toString().slice(0, 4)}</Label>
                </Panel>

                <Panel title={"Soul Traits"} className="bg-white text-black">
                    <LabelGroup col={true}>
                        <Label label="ID" width={22}>{gem?.soul?.id}</Label>
                        <Label label="color" width={22}>{gem?.soul?.color}</Label>
                        <LabelGroup>
                            <Label label="purity">{gem?.soul?.purity.toString().slice(0, 4)}</Label>
                            <Label label="efficacy">{gem?.soul?.efficacy.toString().slice(0, 4)}</Label>
                        </LabelGroup>
                        <Label label="freq">{gem?.soul?.freq}</Label>
                    </LabelGroup>
                </Panel>
            </div>

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