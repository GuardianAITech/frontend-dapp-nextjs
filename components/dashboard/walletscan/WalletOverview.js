"use client"
import React from 'react';
import { FaCheckCircle, FaTrashAlt, FaBan, FaHistory, FaClock } from 'react-icons/fa';

const WalletOverview = ({ scanData }) => {
  const totalApprovals = scanData?.approvals?.items?.length || 0;
  const dustCount = scanData?.spam?.dust_count || 0;
  const spamCount = scanData?.spam?.spam_count || 0;
  const firstTransaction = scanData?.first_transaction?.[0];
  const firstTransactionDate = firstTransaction ? new Date(firstTransaction.block_signed_at).toLocaleDateString() : 'N/A';
  const lastActivityDate = scanData?.last_activity?.sentence || 'N/A';

  const DataBox = ({ IconComponent, label, data }) => (
    <div className="flex flex-col items-center justify-center gap-4 p-2 border border-white bg-gray-800 text-center rounded-lg w-36 h-48 md:w-48 md:h-48 lg:w-72 lg:h-48">
      <IconComponent size="24" />
      <span className="text-xl mt-1 regular-text">{label}</span>
      <span className="font-light regular-text">{data}</span>
    </div>
  );

  return (
    <div className='softBg p-5 rounded-lg'>
      <h2 className='mb-5 font-light regular-text text-center text-2xl'>Wallet Scan Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-gray-200 items-center justify-items-center">
        <DataBox IconComponent={FaCheckCircle} label="Approvals" data={totalApprovals} />
        <DataBox IconComponent={FaTrashAlt} label="Dust Tokens" data={dustCount} />
        <DataBox IconComponent={FaBan} label="Spam Tokens" data={spamCount} />
        <DataBox IconComponent={FaHistory} label="First Transaction" data={firstTransactionDate} />
        <DataBox IconComponent={FaClock} label="Last Activity" data={lastActivityDate} />
      </div>
    </div>
  );
};

export default WalletOverview;


