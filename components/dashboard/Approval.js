"use client"
import React, { useState, useEffect } from 'react';
import ABI from '../../ABI/erc20abi.json'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers'

const SuccessModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1E1E2E] rounded-lg p-6 w-full max-w-md mx-auto text-center">
                <h3 className="text-lg font-medium leading-6 text-white">Success!</h3>
                <p className="mt-2 mb-4 text-sm text-gray-400">
                    The Revoke was successful!
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#00D2FF] hover:bg-[#009cbf] focus:outline-none focus:ring-2 focus:focus:ring-offset-2 focus:ring-[#00D2FF]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const ApprovalOverview = () => {

    const { isConnected, address } = useWeb3ModalAccount();
    const [isDataReady, setIsDataReady] = useState(false);
    const [approvals, setApprovals] = useState(null);
    const { walletProvider } = useWeb3ModalProvider();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fetchApprovals = async () => {
        if (isConnected && address) {
            try {
                const response = await fetch(`/api/approval?wallet=${address}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setApprovals(data.scanData.approvals);
                setIsDataReady(true);
                
            } catch (error) {
                console.error('API call error:', error);
            }
        }
    };

    useEffect(() => {
        fetchApprovals();
    }, [isConnected, address]);

    async function revoke(tokenAddress, spenderAddress){
        if(!isConnected) throw Error("User disconnected")
    
        const ethersProvider =  new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner()
        const tokenContract = new Contract(tokenAddress, ABI, signer);
        const amount = 0
        try {
            const tx = await tokenContract.approve(spenderAddress, amount);

            await tx.wait();
    
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error approving tokens:', error);
            throw error;
        }
    }

    const closeModal = () => {
        setShowSuccessModal(false);
        fetchApprovals();
    };

    return (
        <div className="flex flex-col gap-5 flex-[3] md:w-4/4 xl:w-5/5">
            <div className='flex justify-start items-center mb-5 gap-10'>
                <h1 className="text-5xl font-light regular-text text-white">Approval Check</h1>
                <div className="flex-grow">
                    <div className="flex justify-end items-center gap-12 pl-4">
                        <img src="/images/logo.webp" alt="Guardian AI Logo" className="h-20" />
                        <w3m-button className="text-[#00D2FF]"></w3m-button>
                    </div>
                </div>
            </div>
            <div className='h-[450px] p-5 rounded-lg softBg'>
                <h2 className='mb-5 font-light text-white regular-text text-2xl'>Approval Overview</h2>
                <span className="text-sm text-gray-400 mb-5 block">Review all your approvals and instantly revoke them if necessary!</span>
            
                {isDataReady && approvals && (
                    <div className="overflow-auto max-h-96">
                        <div className="text-sm text-gray-400 mb-2 font-medium">
                            <div className="grid grid-cols-12 gap-4 text-lg text-white mb-1 items-center">
                                <div className="col-span-1 flex items-center justify-center">Asset</div>
                                <div className="col-span-2 flex items-center justify-center">Balance</div>
                                <div className="col-span-2 flex items-center justify-center">Value at Risk</div>
                                <div className="col-span-2 flex items-center justify-center">Allowance</div>
                                <div className="col-span-2 flex items-center justify-center" >Spender</div>
                                <div className="col-span-1 flex items-center justify-center">Risk Factor</div>
                            </div>
                        </div>
                        {approvals.items.map((item, index) => (
                            item.spenders.map((spender, spenderIndex) => (
                                <div
                                    key={`${index}-${spenderIndex}`}
                                    className="grid grid-cols-12 gap-4 text-sm text-white mb-4 items-center rounded-lg border border-gray-400 bg-gray-800 p-2"
                                    style={{ backgroundColor: '#1E1E2E' }}
                                >
                                    <div className="col-span-1 flex items-center justify-center">
                                        <img src={item.logo_url} alt={`${item.ticker_symbol} Logo`} className="w-4 h-4 mr-2" />
                                        {item.ticker_symbol}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center">{item.pretty_balance_quote}</div>
                                    <div className="col-span-2 flex items-center justify-center">{item.pretty_value_at_risk_quote}</div>
                                    <div className="col-span-2 flex items-center justify-center">{spender.pretty_allowance_quote}</div>
                                    <a
                                        href={`https://etherscan.io/address/${spender.spender_address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="col-span-2 truncate flex items-center justify-center hover:text-blue-300"
                                        title={spender.spender_address}>
                                        {`${spender.spender_address.substring(0, 8)}...${spender.spender_address.substring(spender.spender_address.length - 8)}`}
                                    </a>
                                    <div className="col-span-1 flex items-center justify-center">{spender.risk_factor}</div>
                                    <button
                                        className="col-span-2 bg-[#00D2FF] hover:bg-[#009cbf] text-white font-bold py-1 px-4 rounded"
                                        onClick={() => revoke(item.token_address, spender.spender_address )}
                                    >
                                    REVOKE
                                    </button>
                                </div>
                            ))
                        ))}
                    </div>
                )}
                {showSuccessModal && (
                    <SuccessModal show={showSuccessModal} onClose={closeModal} />
                )}
            </div>
        </div>
    );
}

export default ApprovalOverview
