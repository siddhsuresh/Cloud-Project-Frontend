import Link from "next/link"
export default function Navbar(props) {
    return (
        <>
            <header class="font-mono absolute top-0 left-0 right-0 z-20">
                <nav class="container mx-auto px-6 md:px-12 py-4">
                    <div class="flex justify-center items-center flex-wrap">
                        <div class="items-center">
                            <Link href="/">
                            <a className={"text-lg uppercase mx-3 font-bold !text-[#F6A494] cursor-pointer"}>
                                Home
                            </a>
                            </Link>
                            <Link href="/project">
                            <a className={"text-lg uppercase mx-3 font-bold !text-[#F6A494] cursor-pointer"}>
                                Project
                            </a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}