import { getProviders, signIn } from "next-auth/react";


function getProvidersName(providers) {
    if (providers) {
        return Object.values(providers);
    }return [];
}

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <div className="text-white">
                Login Page
            </div>
            {getProvidersName(providers).map((provider) => (
                <div key={provider.name}>
                    <button className="bg-[#18D860] text-white p-5 rounded-full"
                            onClick={() => signIn(provider.id, {callbackUrl: '/'})}
                    >
                        Login With {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }

    }
}

export default Login;