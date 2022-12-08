import { trpc } from "../utils/trpc"
import Label from "./Label"
import Panel from "./Panel"

type Props = {
    idOrUsername: string
}

const UserDisplay = ({ idOrUsername }: Props) => {

    const { data: user } = trpc.user.find.useQuery(idOrUsername)
    const userId = user?.id || ""
    const { data: gems } = trpc.user.getGems.useQuery(userId, { enabled: !!userId })

    return (
        <div className="flex gap-8">
            <Panel
                title={`@${user?.username}`}
                className="border-[0.5px] border-white/70 bg-gradient-radial-tl from-fuchsia-500 to-rose-400"
            >
                <Label dark={true} label="ID">{user?.id}</Label>
                <Label dark={true} label="gem count">{gems?.length}</Label>
            </Panel>
        </div>
    )
}

export default UserDisplay