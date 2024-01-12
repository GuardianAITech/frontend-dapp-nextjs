"use client";
import { MdSearch } from "react-icons/md";

const Navbar = () => {

    const onStartScanClick = () => {
        console.log('Start Scan clicked');
    };

    return (
        <nav className="flex items-center justify-between p-4 ">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#20202c] p-2" style={{ borderRadius: '15px' }}>
                    <MdSearch size={20} className="text-[#8692A6]" />
                    <input type="text" placeholder="Scan by Address" className="bg-transparent border-none text-[#8692A6] placeholder-[#8692A6]" />
                </div>
                <button onClick={onStartScanClick} className="bg-[#00D2FF] text-[#09101D] px-4 py-2 rounded-lg">
                    Start Scan
                </button>
            </div>
            <div className="flex-grow">
                <div className="flex justify-end items-center gap-12 pl-4">
                    <img src="/images/logo.webp" alt="Guardian AI Logo" className="h-20" />
                    <w3m-button className="text-[#00D2FF]"></w3m-button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


