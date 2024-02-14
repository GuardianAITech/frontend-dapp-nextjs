"use client"
import React, { useState } from 'react';
import { MdSearch } from "react-icons/md";
import { ErrorModal } from '../modal/modals';
import { CAScanLoadingModal } from '../modal/modals';

const CaScanner = () => {
    const [inputAddress, setInputAddress] = useState('');
    const [contractData, setContractData] = useState(null);
    const [isDataReady, setIsDataReady] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false)

    const onStartScanClick = async () => {
        if (inputAddress) {
            setIsDataReady(false);
            setShowLoadingModal(true);
            try {
                const response = await fetch(`/api/cascanner?contract=${inputAddress}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("data",data)
                setContractData(data.scanData);
                setIsDataReady(true);
                setShowLoadingModal(false)
            } catch (error) {
                console.error('API call error:', error);
                setShowErrorModal(true);
            }
        }
    };

  const renderSummary = () => {
      if (Array.isArray(contractData.summary)) {
          return (
              <>
                  <h2 className='text-2xl font-semibold text-white mb-2'>Safety Score: {contractData.summary[0].safety_score}</h2>
                  <h3 className='text-lg font-semibold text-white mb-4'>Summary</h3>
                  <p className='text-center text-white mb-4'>{contractData.summary[0].text}</p>
              </>
          );
      } else {
          return (
              <>
                  <h2 className='text-2xl font-semibold text-white mb-2'>Safety Score: {contractData.summary.safety_score}</h2>
                  <h3 className='text-lg font-semibold text-white mb-4'>Summary</h3>
                  <p className='text-center text-white mb-4'>{contractData.summary.text}</p>
              </>
          );
      }
  };

    return (
        <>
            <div className="flex flex-col gap-5 flex-[3] md:w-4/4 xl:w-5/5">
                <div className='flex flex-col md:flex-row justify-between items-center mb-5 gap-4 md:gap-10'>
                    <h1 className="text-3xl md:text-5xl font-light text-white">Contract Scanner</h1>
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
                                placeholder="Scan by Contract"
                                className="bg-transparent border-none text-[#8692A6] placeholder-[#8692A6]"
                                value={inputAddress}
                                onChange={(e) => setInputAddress(e.target.value)}
                            />
                        </div>
                        <button onClick={onStartScanClick} className="bg-[#00D2FF] text-white px-4 py-2 rounded-lg">
                            Start Scan
                        </button>
                    </div>
                </div>
                {isDataReady && contractData ? (
                    <div className='flex flex-col items-center p-5 rounded-lg'>
                        {renderSummary()}
                        <div className='w-full'>
                            {contractData.functions.map((func, index) => (
                                <div key={index} className="bg-[#20202c] p-4 rounded-lg mb-3 text-center">
                                    <h4 className="text-xl font-semibold text-[#00D2FF]">{func.name}</h4>
                                    <p className="text-white">{func.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='h-[450px] p-5 rounded-lg flex justify-center items-center'>
                        <h2 className='font-light text-center text-2xl text-white'>Please enter a contract address and press scan!</h2>
                    </div>
                )}
            </div>
            <CAScanLoadingModal show={showLoadingModal} />
            <ErrorModal show={showErrorModal} onClose={() => setShowErrorModal(false)} />
        </>
    );
}

export default CaScanner;
