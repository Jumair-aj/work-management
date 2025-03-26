import { UserButton,useUser } from '@clerk/clerk-react';
import React from 'react'
import { LuClipboardList } from "react-icons/lu";

export default function Header() {
    const user = useUser();
    console.log(user.user.fullName)
    return (
        <div className='flex justify-between p-5'>
            <div className="flex items-center gap-2 ">
                <LuClipboardList className="text-2xl text-[#2F2F2F] mt-0.5" />
                <h1 className="text-[#2F2F2F] text-3xl font-medium">Manage</h1>
            </div>
            <div className="flex  items-center gap-2 text-[#000]/50">
            <UserButton afterSignOutUrl="/" /> {user.user.fullName}
            </div>
        </div>
    )
}
