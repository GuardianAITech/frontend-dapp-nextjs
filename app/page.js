import dynamic from 'next/dynamic';

const QuickScan = dynamic(() => import('@/components/dashboard/QuickScan'), {
  loading: () => <p>Loading...</p>,
  ssr: true 
});


export default function Home() {


  return (
    <main className="flex-col gap-5 mt-5 md:flex-row">
      <QuickScan></QuickScan>
    </main>
  )
}
