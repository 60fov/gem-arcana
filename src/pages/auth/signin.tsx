import { type InferGetServerSidePropsType, type GetServerSideProps } from "next"
import { getProviders, signIn } from "next-auth/react"
import LayoutFlexColCenter from "../../components/Layout"


type Providers = Awaited<ReturnType<typeof getProviders>>

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (!providers) {
        return <>no providers</>
    }

    return (
        <LayoutFlexColCenter>
            <div className="w-[20em] p-4 border-2 border-white/10 rounded-2xl flex flex-col drop-shadow-2xl">
                <h2 className="text-white text-5xl mb-6 text-center font-semibold">Sign-in w/</h2>
                <div>

                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className={`
                                bg-white/20 text-white px-4 py-2 w-full h-full rounded-lg drop-shadow-sm
                                hover:translate hover:bg-white/30 hover:drop-shadow-xl hover:-translate-y-[1px] hover:scale-[1.01]
                                transition ease-in-out
                                `}
                                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                            >
                                {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutFlexColCenter>

    )
}

export const getServerSideProps: GetServerSideProps<{ providers: Providers }> = async () => {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}