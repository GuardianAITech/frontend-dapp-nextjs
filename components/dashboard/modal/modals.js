import React from 'react';

const ErrorModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1E1E2E] rounded-lg p-6 w-full max-w-md mx-auto text-center">
                <h3 className="text-lg font-medium leading-6 text-white">Error Loading Data</h3>
                <p className="mt-2 mb-4 text-sm text-gray-400">
                    Refresh the page and try again.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1E1E2E] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:focus:ring-offset-2 focus:ring-[#1E1E2E]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const ApprovalLoading = ({ show }) => {
    if (!show) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1E1E2E] rounded-lg p-6 w-full max-w-md mx-auto text-center">
                <div className="flex justify-center">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
                <p className="mt-2 text-lg text-white">
                    Loading Approval Data...
                </p>
            </div>
        </div>
    );
};

const RevokeSuccessModal = ({ show, onClose }) => {
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

const WalletLoadingModal = ({ show }) => {
    if (!show) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1E1E2E] rounded-lg p-6 w-full max-w-md mx-auto text-center">
                <div className="flex justify-center">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
                <p className="mt-2 text-lg text-white">
                    Loading Wallet Data...
                </p>
            </div>
        </div>
    );
};

const CAScanLoadingModal = ({ show }) => {
    if (!show) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1E1E2E] rounded-lg p-6 w-full max-w-md mx-auto text-center">
                <div className="flex justify-center">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
                <p className="mt-2 text-lg text-white">
                    Loading Contract Data...
                </p>
            </div>
        </div>
    );
};

export { ErrorModal, ApprovalLoading, WalletLoadingModal, RevokeSuccessModal , CAScanLoadingModal};