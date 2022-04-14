import Head from "next/head"
import Navbar from "../components/navbar"
export default function Index() {
    return (
        <>
        <Head>
            <title>CSE2021 | 20BPS1042 Home</title>
        </Head>
        <Navbar color="white"/>
            <div class="relative h-full md:h-screen overflow-hidden bg-indigo-900">
                <img src="/background.svg" class="absolute h-full w-full object-cover" />
                <div class="absolute inset-0 bg-black opacity-25"></div>
                <div class="container relative z-10 mx-auto my-24 flex w-4/5 items-center rounded-lg border-4 border-white py-16 md:my-32">
                    <div class="relative z-10 flex w-full flex-col items-center justify-between">
                        <p class="flex flex-col items-center text-center text-6xl font-extrabold text-white md:text-8xl pb-4">Real Time Irrigation System</p>
                        <p class="mt-6 flex max-w-lg flex-col items-center text-center text-xl font-extrabold text-white">CSE2021 Distributed Real Time Systems <br />J Component</p>
                        <p class="mt-6 flex max-w-lg flex-col items-center text-center text-2xl font-extrabold text-white">Presented By <br />Siddharth Suresh 20BPS1042</p>
                    </div>
                </div>
            </div>
            <div>
                {/* Add Content Here */}
            </div>
        </>
    )
}