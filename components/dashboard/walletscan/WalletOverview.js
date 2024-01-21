"use client"
import React from 'react';
import { FaCheckCircle, FaTrashAlt, FaBan, FaHistory, FaClock, FaShieldAlt } from 'react-icons/fa';

const WalletOverview = ({ scanData }) => {
  const totalApprovals = scanData?.approvals?.items?.length || 0;
  const dustCount = scanData?.spam?.dust_count || 0;
  const spamCount = scanData?.spam?.spam_count || 0;
  const firstTransaction = scanData?.first_transaction?.[0];
  const firstTransactionDate = firstTransaction ? new Date(firstTransaction.block_signed_at).toLocaleDateString() : 'N/A';
  const lastActivityDate = scanData?.last_activity?.sentence || 'N/A';
  const safetyScore = parseFloat(scanData?.ai?.safety_score).toFixed(2) || '0'
  const safetySummary = scanData?.ai?.summary || 'Safety Score not calculated!'

  const DataBox = ({ IconComponent, label, data }) => (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border border-gray-200 bg-gray-800 text-center rounded-lg shadow-lg w-full h-auto">
      <IconComponent size="32" className="text-gray-300" />
      <span className="text-lg bold-text text-gray-300">{label}</span>
      <span className="text-xl regulart-text text-white">{data}</span>
    </div>
  );
  

  return (
    <div className='softBg p-5 rounded-lg'>
      <h2 className='mb-5 font-light regular-text text-center text-4xl'>Wallet Scan Overview</h2>
      <div className="mb-4 text-center">
        <div className="font-light regular-text mb-5">{safetySummary}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <DataBox IconComponent={FaShieldAlt} label="Safety Score" data={`${safetyScore}/10`} />
          <DataBox IconComponent={FaCheckCircle} label="Approvals" data={totalApprovals} />
          <DataBox IconComponent={FaTrashAlt} label="Dust/Spam Tokens" data={`${dustCount}/${spamCount}`} />
          <DataBox IconComponent={FaHistory} label="First Transaction" data={firstTransactionDate} />
          <DataBox IconComponent={FaClock} label="Last Activity" data={lastActivityDate} />
        </div>
      </div>
    </div>
  );
  
  
  
};

export default WalletOverview;


