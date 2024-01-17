"use client"
import React, { useState, useEffect } from 'react';
import TransactionScan from '@/components/dashboard/TransactionScan';
import WalletOverview from '@/components/dashboard/WalletOverview';
import { MdSearch } from "react-icons/md";
import Image from 'next/image';
import { MdDateRange } from 'react-icons/md';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';


const QuickScan = () => {
    const { isConnected, address } = useWeb3ModalAccount();
    const [isDataReady, setIsDataReady] = useState(false);
    const [scanData, setScanData] = useState(null);
    const [balances, setBalances] = useState({ nativeBalance: 0, assetBalance: 0, totalTx: 0 , atRiskBalance: 0});

    const onStartScanClick = () => {
      console.log('Start Scan clicked');
    };

    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    function formatDate(date) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    const dateRange = `${formatDate(ninetyDaysAgo)} – ${formatDate(today)}`;

    useEffect(() => {
        const fetchData = async () => {
            if (isConnected && address) {
                try {
                    const response = await fetch(`/api/scan?wallet=${address}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setScanData(data.scanData);
                    console.log("Data:", data.scanData)

                    if (data.scanData && data.scanData.token_balances && Array.isArray(data.scanData.token_balances)) {
                        const etherBalanceInfo = data.scanData.token_balances.find(token => token.contract_ticker_symbol === 'ETH');
                        const nativeBalance = etherBalanceInfo ? etherBalanceInfo.pretty_quote : 0;
                        const tokenTotal = data.scanData.token_balances.find(token => token.total_asset_quote !== undefined);
                        const assetBalance = tokenTotal ? tokenTotal.total_asset_quote : 0;
                        const totalTx = data.scanData.total_transactions;
                        const atRiskBalance = data.scanData.approvals.total_at_risk;
                        setBalances({ nativeBalance, assetBalance, totalTx, atRiskBalance});
                    }
                    setIsDataReady(true);

                } catch (error) {
                    console.error('API call error:', error);
                }
            }
        };

        fetchData();
    }, [isConnected, address]);

    if (!isConnected) {
      return (
        <div className="flex flex-col gap-5 flex-[3] md:w-4/4 xl:w-5/5">
          <div className='flex flex-col md:flex-row justify-between items-center mb-5 gap-4 md:gap-10'>
            <h1 className="text-3xl md:text-5xl font-light regular-text text-white">Quick Scan</h1>
            <div className="flex items-center gap-4 md:gap-12">
              <img src="/images/logo.webp" alt="Guardian AI Logo" className="h-16 md:h-20" />
              <w3m-button className="text-[#00D2FF]"></w3m-button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#20202c] p-2 rounded-lg">
                <MdSearch size={20} className="text-[#8692A6]" />
                <input type="text" placeholder="Scan by Address" className="bg-transparent border-none text-[#8692A6] placeholder-[#8692A6]" />
              </div>
              <button onClick={onStartScanClick} className="bg-[#00D2FF] text-white px-4 py-2 rounded-lg">
                Start Scan
              </button>
            </div>
            <div className="inline-flex items-center bg-[#20202c] px-4 py-1 rounded-full">
              <MdDateRange className="text-gray-200 mr-2" size={24} />
              <span className="text-sm text-gray-200">{dateRange}</span>
            </div>
          </div>
          <div className='h-[450px] softBg p-5 rounded-lg flex justify-center items-center'>
            <h2 className='mb-5 font-light regular-text text-center items-center text-2xl text-white'>Please Connect your wallet!</h2>
          </div>
        </div>
      );
    }

  return (
      <>
        <div className="flex flex-col gap-5 flex-[3] md:w-4/4 xl:w-5/5">
          <div className='flex flex-col md:flex-row justify-between items-center mb-5 gap-4 md:gap-10'>
            <h1 className="text-3xl md:text-5xl font-light regular-text text-white">Quick Scan</h1>
            <div className="flex items-center gap-4 md:gap-12">
              <img src="/images/logo.webp" alt="Guardian AI Logo" className="h-16 md:h-20" />
              <w3m-button className="text-[#00D2FF]"></w3m-button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#20202c] p-2 rounded-lg">
                <MdSearch size={20} className="text-[#8692A6]" />
                <input type="text" placeholder="Scan by Address" className="bg-transparent border-none text-[#8692A6] placeholder-[#8692A6]" />
              </div>
              <button onClick={onStartScanClick} className="bg-[#00D2FF] text-white px-4 py-2 rounded-lg">
                Start Scan
              </button>
            </div>
            <div className="inline-flex items-center bg-[#20202c] px-4 py-1 rounded-full">
              <MdDateRange className="text-gray-200 mr-2" size={24} />
              <span className="text-sm text-gray-200">{dateRange}</span>
            </div>
          </div>

          {isDataReady && (
            <div className='flex flex-row flex-wrap justify-center md:justify-start gap-5'>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400">Native Balance</span>
                  <span className="text-2xl text-blue-500 font-bold">${balances.nativeBalance}</span>
                </div>
                <div className="hidden md:flex">
                  <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx"/>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 mb-1">Asset Balance</span>
                  <span className="text-2xl text-blue-500 font-bold">${balances.assetBalance}</span>
                </div>
                <div className="hidden md:flex">
                  <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" className="hidden md:block"/>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 mb-1">Total at Risk</span>
                  <span className="text-2xl text-blue-500 font-bold">${balances.atRiskBalance}</span>
                </div>  
                <div className="hidden md:flex">
                  <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" className="hidden md:block"/>
                </div>  
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 mb-1">Total Tx</span>
                  <span className="text-2xl text-blue-500 font-bold">{balances.totalTx}</span>
                </div>  
                <div className="hidden md:flex">
                  <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" className="hidden md:block"/>
                </div>  
              </div>
            </div>
          )}
          {!isDataReady && <div>Loading Balance...</div>}
        <WalletOverview scanData={scanData} />
        <TransactionScan scanData={scanData} />
      </div>
    </>
  );

}

export default QuickScan