"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuLinks = ({ item }) => {
    const pathname = usePathname()

    return (
        <Link href={item.path} className={`flex p-2 items-center gap-1 my-1 rounded-md  hover:bg-[#2e374a] ${pathname === item.path ? "bg-[#2e374a]" : ""}`}>
            {item.icon}
            <span className='hidden md:block'>{item.title}</span>
        </Link>
    )
}

export default MenuLinks
