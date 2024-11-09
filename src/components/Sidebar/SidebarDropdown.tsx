import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarDropdown = ({ item }: any) => {
    const pathname = usePathname();

    return (
        <>
            <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                <Link
                    href={item.route}
                    className={`group relative flex items-center gap-2.5 rounded-md px-4
                        ${pathname === item.route ? "text-white": ""}
                    `}
                >
                    {item.label}
                </Link>
            </ul>
        </>
    )
}