import WalletScan from '@/components/dashboard/Walletscan';
import Rightbar from '@/components/dashboard/Rightbar';
import WalletAnalytics from '@/components/dashboard/WalletAnalytics';
import Image from 'next/image';
import { MdDateRange } from 'react-icons/md';

export default function Home() {

  const dateRange = "14 Jan, 2023 – 20 Jan, 2023";
  const totalTx = "54,081";
  const realtimeTx = "840";
  const nativeBalance = "$100,000.00";
  const assetBalance = "$60,000.00";
  const atRiskBalance = "$34,000.00";

  return (
    <main className="flex flex-col gap-5 mt-5 md:flex-row">
      <div className="flex flex-col gap-5 flex-[3] md:w-3/4 xl:w-4/5">
        <div className='flex justify-start items-center mb-5 gap-10'>
          <h1 className="text-5xl font-light regular-text text-white">Quick Scan</h1>
          <div className="flex items-center bg-[#20202c] px-4 py-1 rounded-full">
            <MdDateRange className="text-gray-200 mr-2" size={24} />
            <span className="text-sm text-gray-200">{dateRange}</span>
          </div>
        </div>
        <div className='flex justify-start'>
        <div className="flex items-start mr-12 gap-5">
            <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 mb-1">Native Balance</span>
              <span className="text-2xl text-blue-500 font-bold">{nativeBalance}</span>
            </div>
            <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" />
          </div>
          <div className="flex items-start mr-12 gap-5">
            <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 mb-1">Asset Balance</span>
              <span className="text-2xl text-blue-500 font-bold">{assetBalance}</span>
            </div>
            <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" />
          </div>
          <div className="flex items-start mr-12 gap-5">
            <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 mb-1">Total at Risk</span>
              <span className="text-2xl text-blue-500 font-bold">{atRiskBalance}</span>
            </div>
            <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" />
          </div>
          <div className="flex items-start mr-12 gap-5">
            <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 mb-1">Total Tx</span>
              <span className="text-2xl text-blue-500 font-bold">{totalTx}</span>
            </div>
            <Image src="/images/totaltx.png" width={100} height={50} alt="Total Tx" />
          </div>
          <div className="flex items-start mr-12 gap-5">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400 mb-1">Realtime tx</span>
              <span className="text-2xl text-blue-500 font-bold">{realtimeTx}</span>
              
            </div>
            <Image src="/images/realtimetx.png" width={100} height={50} alt="Realtime Tx" />
          </div>
        </div>
        <WalletAnalytics />
        <WalletScan />
      </div>
      <div className='flex-1 md:block'>
        <Rightbar />
      </div>
    </main>
  )
}
