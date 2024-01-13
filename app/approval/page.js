import React from 'react'
import ApprovalOverview from '@/components/dashboard/Approval';

const page = async () => {
    
    return (
        <div>
            <div className="flex flex-col gap-5 flex-[3] md:w-4/4 xl:w-5/5">
                <div className='flex justify-start items-center mb-5 gap-10'>
                    <h1 className="text-5xl font-light regular-text text-white">Approval Check</h1>
                </div>
                <ApprovalOverview/>
            </div>
        </div>
    )
}

export default page
