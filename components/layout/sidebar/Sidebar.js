import React from 'react'
import MenuLinks from './MenuLinks';
import Image from 'next/image';
import { menuItems } from '../../../constants/index.js';

const Sidebar = () => {
    return (
        <div className='sticky top-10 '>
            <div className='flex items-center gap-5 mb-5'>
            <Image src="/images/SHEILD.png" alt="logo" width={100} height={100} className='object-cover rounded-full' />
                <div className='flex flex-col'>
                    <span className='font-medium'>GUARDIAN AI</span>
                    <span className='text-xs text-softText'>DASHBOARD</span>
                </div>
            </div>
            <ul>
                {menuItems.map((item) => (
                    <MenuLinks item={item} key={item.title} />
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
