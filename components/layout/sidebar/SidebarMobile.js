import React from 'react'
import { menuItems } from '../../../constants/index.js';
import MenuLinks from './MenuLinks.js';

const SidebarMobile = () => {
    return (
        <ul className='flex items-center justify-center space-x-4'>
            {menuItems.map((item) => (
                <MenuLinks item={item} key={item.title} />
            ))}
        </ul>
    );
}

export default SidebarMobile
