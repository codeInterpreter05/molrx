import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarDropdown } from "./SidebarDropdown";

export const SidebarItem = ({ item, pageName, setPageName }: any) => {
    const handleClick = () => {
        const updatePageName = pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
        return setPageName(updatePageName)
    }

    const pathname = usePathname();
    
    const isActive = (item: any) => {
        if (item.route === pathname) return true;
        if (item.children) {
            return item.children.some((child: any) => isActive(child));
        }
        return false;
    }

    const isItemActive = isActive(item);

    return (
        <>
            <li>
                <Link
                    href={item.route}
                    onClick={handleClick}
                    className={`${
                        isItemActive ? "rounded-md bg-graydark dark:bg-[#1E1E1E]" : ""
                    } group relative flex items-center gap-2.5 rounded-md px-4 py-2 text-bodydark1/80 duration-300 ease-in-out hover:bg-graydark dark:hover-bg-[#1E1E1E]`}
                >
                    {item.icon}
                    {item.label}
                </Link>
                {
                    item.children && (
                        <div className={`translate transform overflow-hidden ${pageName !== item.label.toLowerCase() && "hidden"}`}>
                            <SidebarDropdown item={item.children} />
                        </div>
                    )
                }
            </li>
        </>
    )
}

