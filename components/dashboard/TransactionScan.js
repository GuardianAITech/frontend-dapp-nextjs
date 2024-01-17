"use client"
import React from 'react';

const TransactionScan = ({ scanData }) => {

  if (!scanData) {
    return <div>Loading transactions...</div>;
  }
  const latestTransactions = scanData.latest_transactions.slice(1, 11);

  const isMobile = window.innerWidth <= 768;

  return (
    <div className='softBg p-5 rounded-lg'>
      <h2 className='mb-5 font-light regular-text text-center text-2xl text-white'>Latest Transactions</h2>
      <div className="overflow-auto">
        <div className="grid grid-cols-12 gap-4 font-medium text-lg text-white mb-1 items-center text-center p-2">
          <div className="col-span-3">TxHash</div>
          <div className="col-span-3">To</div>
          <div className="col-span-3">Value</div>
          <div className="col-span-3">Time</div>
        </div>
        {latestTransactions.map((tx, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-5 text-md text-white mb-4 items-center rounded-lg border border-gray-400 bg-gray-800 p-4"
          >
            <div className="col-span-3 truncate flex items-center justify-center">
              <a 
                href={`https://etherscan.io/tx/${tx.tx_hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300"
                title={tx.tx_hash}
              >
                {isMobile ? `${tx.tx_hash.substring(0, 1)}...${tx.tx_hash.substring(tx.tx_hash.length - 4)}` : `${tx.tx_hash.substring(0, 10)}...${tx.tx_hash.substring(tx.tx_hash.length - 10)}`}
              </a>
            </div>
            <div className="col-span-3 truncate flex items-center justify-center">
              <a
                href={`https://etherscan.io/address/${tx.to_address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300"
                title={tx.to_address}
              >
                {isMobile ? `${tx.to_address.substring(0, 1)}...${tx.to_address.substring(tx.to_address.length - 4)}` : `${tx.to_address.substring(0, 10)}...${tx.to_address.substring(tx.to_address.length - 10)}`}
              </a>
            </div>
            <div className="col-span-3 flex items-center justify-center">
              ${parseFloat(tx.value_quote).toFixed(2)}
            </div>
            <div className="col-span-3 flex items-center justify-center">
              {new Date(tx.block_signed_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionScan;