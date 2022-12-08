import { type NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import GemDisplay from "../components/GemDisplay";
import Input from "../components/Input";

import UserDisplay from "../components/UserDisplay";
import { trpc } from "../utils/trpc";
import { zValidator } from "../utils/validators";


const Home: NextPage = () => {
    const { data: session, status: sessionStatus } = useSession()

    const router = useRouter()

    const [isUserSearch, setIsUserSearch] = useState(true)
    const [inputId, setInputId] = useState("")

    const { data: me } = trpc.user.me.useQuery(undefined, { enabled: !!session?.user?.id })

    useEffect(() => {
        console.log(zValidator.username.safeParse("j$"))
    }, [])

    if (sessionStatus == "loading") {
        return (
            <div className="text-9xl text-white">
                🫧
            </div>
        )
    }

    const onSearchEnter = (value: string) => {
        setInputId(value)
    }

    return (
        <div
            className="relative"
        >
            <div className="absolute top-8 w-full flex justify-center">
                <Input placeholder="search" onSubmit={onSearchEnter} />
            </div>
            {
                sessionStatus === "authenticated" ?
                    <>
                        <div className="absolute bottom-8 right-8">
                            <Button onClick={() => signOut()}>
                                {session ? 'sign out' : 'sign in'}
                            </Button>
                        </div>
                    </>
                    :
                    <></>
            }

            <div className="w-screen h-screen flex flex-col items-center justify-center text-white gap-20">
                <div>
                    {
                        inputId ?
                            isUserSearch ?
                                <UserDisplay idOrUsername={inputId} />
                                :
                                <GemDisplay gemId={inputId} />
                            :
                            <h1 className="text-6xl">{!session ? `Gem Arcana` : `Welcome ${me?.name}`}</h1>
                    }
                </div>

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