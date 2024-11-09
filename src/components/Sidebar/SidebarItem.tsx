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
}

