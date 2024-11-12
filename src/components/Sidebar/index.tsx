"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SidebarItem } from "./SidebarItem"
import { 
    LayoutGrid, 
    Atom, 
    Network, 
    Microscope, 
    Settings, 
    MessageSquareText, 
    X
} from "lucide-react"
import { useLocalStorage } from "@/hooks/UseLocalStorage"

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
    {
        name: "",
        menuItems: [
            {
                icon: <LayoutGrid size={25} />,
                label: "Dashboard",
                route: "/",
            },
            {
                icon: <Atom size={25} />,
                label: "Molecules Bank",
                route: "/molecule-bank",
            },
            {
                icon: <Network size={25} />,
                label: "Model",
                route: "/model",
            },
            {
                icon: <Microscope size={25} />,
                label: "Research",
                route: "/research",
            },
            {
                icon: <MessageSquareText size={25} />,
                label: "Messages",
                route: "/messages",
            }
        ]
    },
    {
        name: "OTHERS",
        menuItems: [
            {
                icon: <Settings size={25} />,
                label: "Settings",
                route: "/settings",
            }
        ]
    }
]

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();

    const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard');

    return (
        <aside className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-[#000000] lg:translate-x-0 ${
            sidebarOpen? "translate-x-0" : "-translate-x-full"
        }`}>
            <div className="flex items-center justify-between gap-2 px-6 lg:py-6">
                <Link href={"/"}>
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <div className="ml-2 rounded-lg bg-[#3C4FE0] p-1.5">
                            <Image
                                width={30}
                                height={30}
                                src={"/images/logo/logo.svg"}
                                alt="logo"
                                priority
                            />
                        </div>
                        <p className="text-xl font-semibold text-white">
                            MolRx
                        </p>
                    </div>
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"     
                    className="block lg:hidden"
                >
                    <X size={24} className="text-white" />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300">
                <nav className="mt-5 p-4 lg:mt-9 lg:px-6">
                    {
                        menuGroups.map((group, index) => (
                            <div key={index}>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
                                    {group.name}
                                </h3>
                                <ul className="mb-6 flex flex-col gap-2">
                                    
                                    {
                                        group.menuItems.map((item, index) => (
                                            <SidebarItem
                                                key={index}
                                                item={item}
                                                pageName={pageName}
                                                setPageName={setPageName}
                                            />
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </nav>
            </div>
        </aside>
    )
}
