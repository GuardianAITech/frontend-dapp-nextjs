import './globals.css'
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Footer from '@/components/layout/Footer';
import SidebarMobile from '@/components/layout/sidebar/SidebarMobile';
import { Web3Modal, Web3ModalProvider } from "../context/Web3Modal";


export const metadata = {
  title: 'GuardianAI',
  description: 'GuardianAI - Tech',
  web3modal: {
    title: "Web3Modal",
    description: "Web3Modal Example",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='relative flex min-h-screen'>
          <div className='flex-1 hidden min-h-screen p-5 xl:block softBg'>
            <Sidebar/>
          </div>
          <div className='flex-[6] xl:flex-[5] p-4 lg:p-5'>
            <Navbar/>
            <Web3ModalProvider>{children}</Web3ModalProvider>
            <Footer/>
            <div className='fixed bottom-0 z-30 w-full softBg md:hidden '>
              <SidebarMobile/>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
