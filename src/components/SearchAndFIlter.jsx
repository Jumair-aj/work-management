import React from 'react'
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


export default function SearchAndFIlter() {
    return (
        <div className='p-5 flex justify-between items-center text-sm'>
            <div className="flex gap-2 items-center text-[#00000099] ">
                Filter by:
                <select className="border border-[#00000033] px-1 py-1.5 rounded-full">
                    <option value="">Category</option>
                    <option value="Pending">Pending</option>
                    <option value="Progress">Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select className="border border-[#00000033] px-1 py-1.5 rounded-full">
                    <option value="">Due Date</option>
                    <option value="Pending">Pending</option>
                    <option value="Progress">Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="flex gap-4 items-center">

                <div className="border border-[#0000006B] rounded-full py-2.5 px-4  flex items-center gap-0.5">
                    <HiOutlineMagnifyingGlass />
                    <input type="text" placeholder="Search" className="border-none outline-none text-[#000000D1]" />
                </div>
                <button className='bg-[#7B1984] text-white py-3 px-8 rounded-full text-md  font-medium'>ADD TASK</button>
            </div>
        </div>
    )
}   
