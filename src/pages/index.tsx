import { type NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {
    const { data: session, status: sessionStatus } = useSession()

    const router = useRouter()

    const { data: me } = trpc.user.me.useQuery(undefined, { enabled: !!session?.user?.id })

    if (sessionStatus == "loading") {
        return (
            <div className="text-9xl text-white">
                🫧
            </div>
        )
    }

    return (
        <div
            className="relative"
        >
            {
                sessionStatus === "authenticated" ?
                    <div className="absolute bottom-8 right-8">
                        <Button onClick={() => signOut()}>
                            {session ? 'sign out' : 'sign in'}
                        </Button>
                    </div>
                    :
                    <></>
            }

            <div className="w-screen h-screen flex flex-col items-center justify-center text-white gap-20">
                <h1 className="text-6xl">{!session ? `Gem Arcana` : `Welcome ${me?.name}`}</h1>
                <div className="flex gap-4">
                    {
                        sessionStatus === "authenticated" ?
                            <Button onClick={() => router.push("/transmutation")}>Arcane Transmutation</Button>
                            :
                            <Button onClick={() => router.push("/auth/signin")}>Sign-in</Button>
                    }
                </div>
            </div>




        </div>
    )
}

export default Home;