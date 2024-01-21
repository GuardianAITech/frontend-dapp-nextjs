"use client"
import React, { useState, useEffect } from 'react';
import TransactionScan from '@/components/dashboard/walletscan/TransactionScan';
import WalletOverview from '@/components/dashboard/walletscan/WalletOverview';
import { MdSearch } from "react-icons/md";
import Image from 'next/image';
import { MdDateRange } from 'react-icons/md';
import { useWeb3ModalAccount, useWeb3ModalEvents } from '@web3modal/ethers/react';
import { WalletLoadingModal } from '../modal/modals'
import { ErrorModal } from '../modal/modals';



const PercentageChangeIndicator = ({ change }) => {
  const changeNum = Number(change);
  const isPositive = changeNum > 0;
  const changeStr = `${isPositive ? '+' : ''}${(changeNum * 100).toFixed(2)}%`;

  const arrowStyle = {
    display: 'inline-block',
    width: '0',
    height: '0',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: isPositive ? '0' : '10px solid red',
    borderBottom: isPositive ? '10px solid green' : '0', 
  };

  return (
    <div className="flex items-center gap-2">
      <div style={arrowStyle} />
      <span className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {changeStr}
      </span>
    </div>
  );
};


const QuickScan = () => {
    const { isConnected, address } = useWeb3ModalAccount();
    const [inputaddress, setInputaddress] = useState('');
    const [isDataReady, setIsDataReady] = useState(false);
    const [manualscan, setManualscan] = useState(false);
    const [scanData, setScanData] = useState(null);
    const [balances, setBalances] = useState({ nativeBalance: 0, assetBalance: 0, totalTx: 0 , atRiskBalance: 0});
    const [showErrorModal, setShowErrorModal] = useState(false);
    
    const onStartScanClick = () => {
      if (inputaddress) {
        fetchData(inputaddress)
        setManualscan(true)
      }
    };

    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    function formatDate(date) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    const dateRange = `${formatDate(ninetyDaysAgo)} – ${formatDate(today)}`;

    const fetchData = async (providedaddress) => {
        setIsDataReady(false);
          try {
              const response = await fetch(`/api/scan?wallet=${providedaddress}`);
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setScanData(data.scanData);

              if (data.scanData && data.scanData.token_balances && Array.isArray(data.scanData.token_balances)) {
                  const etherBalanceInfo = data.scanData.token_balances.find(token => token.contract_ticker_symbol === 'ETH');
                  const nativeBalance = etherBalanceInfo ? parseFloat(etherBalanceInfo.pretty_quote).toFixed(2) : 0;
                  const tokenTotal = data.scanData.token_balances.find(token => token.total_asset_quote !== undefined);
                  const assetBalance = tokenTotal ? parseFloat(tokenTotal.total_asset_quote).toFixed(2) : 0;
                  const totalTx = data.scanData.total_transactions;
                  const atRiskBalance = parseFloat(data.scanData.approvals.total_at_risk).toFixed(2);
                  setBalances({ nativeBalance, assetBalance, totalTx, atRiskBalance});
              }
              setIsDataReady(true);

          } catch (error) {
              console.error('API call error:', error);
              setShowErrorModal(true);
          }
    };

    useEffect(() => {
      if (isConnected && address) {
        fetchData(address);
        setManualscan(false)
      }
    }, [isConnected, address]);

    if (!isConnected && !manualscan) {
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
                <input
                  type="text"
                  placeholder="Scan by Address"
                  className="bg-transparent border-none text-[#8692A6] placeholder-[#8692A6]"
                  value={inputaddress}
                  onChange={(e) => setInputaddress(e.target.value)}
                />
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
            <h2 className='mb-5 font-light regular-text text-center items-center text-2xl text-white'>Please Connect your wallet or scan manually!</h2>
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
                <input
                  type="text"
                  placeholder="Scan by Address"
                  className="bg-transparent border-none text-[#8692A6] placeholder-[#8692A6]"
                  value={inputaddress}
                  onChange={(e) => setInputaddress(e.target.value)}
                />
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
            <>
            <div className='flex flex-row flex-wrap justify-center md:justify-start gap-5'>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400">Native Balance</span>
                  <span className="text-2xl text-blue-500 font-bold">${balances.nativeBalance}</span>
                </div>
                <div className="hidden md:flex">
                  <PercentageChangeIndicator change={scanData.calculations?.last_scan_changes?.last_total_native_value?.percentage_change ?? 0} />
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 mb-1">Asset Balance</span>
                  <span className="text-2xl text-blue-500 font-bold">${balances.assetBalance}</span>
                </div>
                <div className="hidden md:flex">
                  <PercentageChangeIndicator change={scanData.calculations?.last_scan_changes?.last_total_assets_value?.percentage_change ?? 0} />
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 mb-1">Total at Risk</span>
                  <span className="text-2xl text-blue-500 font-bold">${balances.atRiskBalance}</span>
                </div>  
                <div className="hidden md:flex">
                  <PercentageChangeIndicator change={scanData?.calculations?.last_scan_changes?.last_total_at_risk?.percentage_change ?? 0} />
                </div>  
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm text-gray-400 mb-1">Total Tx</span>
                  <span className="text-2xl text-blue-500 font-bold">{balances.totalTx}</span>
                </div>  
                <div className="hidden md:flex">
                   <PercentageChangeIndicator change={scanData.calculations?.last_scan_changes?.last_total_transactions?.percentage_change} />
                </div>  
              </div>
            </div>
            <WalletOverview scanData={scanData} />
            <TransactionScan scanData={scanData} />
            </>
          )}
          <WalletLoadingModal show={!isDataReady} />
          <ErrorModal show={showErrorModal} onClose={() => setShowErrorModal(false)} />
      </div>
    </>
  );
}

export default QuickScan