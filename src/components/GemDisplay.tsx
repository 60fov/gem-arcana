import { trpc } from "../utils/trpc"
import Label from "./Label"
import LabelGroup from "./LabelGroup"
import Panel from "./Panel"

type Props = {
    gemId: string
}

const GemDisplay = ({ gemId }: Props) => {

    const { data: gem } = trpc.gem.find.useQuery(gemId)

    return (
        <div className="flex gap-8">
            <Panel title={"Gem Traits"} >
                <Label dark={true} label="ID">{gem?.id}</Label>
                <Label dark={true} label="color">{gem?.color}</Label>
                <Label dark={true} label="mass">{gem?.mass}</Label>
                <Label dark={true} label="clarity">{gem?.clarity?.toString().slice(0, 4)}</Label>
            </Panel>

            {
                gem?.soul ?
                    <Panel title={"Soul Traits"} className="bg-white text-black">
                        <LabelGroup col={true}>
                            <Label label="ID">{gem?.soul?.id}</Label>
                            <Label label="color">{gem?.soul?.color}</Label>
                            <LabelGroup>
                                <Label label="purity">{gem?.soul?.purity.toString().slice(0, 4)}</Label>
                                <Label label="efficacy">{gem?.soul?.efficacy.toString().slice(0, 4)}</Label>
                            </LabelGroup>
                            <Label label="freq">{gem?.soul?.freq}</Label>
                        </LabelGroup>
                    </Panel>
                    :
                    <>
                    </>
            }
        </div>
    )
}

export default GemDisplay