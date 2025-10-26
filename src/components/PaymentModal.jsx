// src/components/PaymentModal.jsx
import React, { useState } from 'react';
import { FiX, FiLoader, FiCheckCircle, FiAlertCircle, FiExternalLink } from 'react-icons/fi';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';

const PaymentModal = ({ cartItems, totalPrice, onClose, onSuccess }) => {
  const { signer, account, chainId } = useWeb3();
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('confirm'); // confirm, processing, success, error

  const handlePayment = async () => {
    if (!signer) {
      setError('Wallet not connected');
      return;
    }

    setIsProcessing(true);
    setStep('processing');
    setError(null);

    try {
      // Convert USD to ETH (simplified conversion - in real app, use price oracle)
      const ethAmount = ethers.parseEther((totalPrice * 0.0003).toFixed(6)); // Rough conversion
      
      // Create a simple transaction to a demo address
      const demoAddress = '0x742d35Cc6634C0532925a3b8D0C4C4C4C4C4C4C4'; // Demo address
      
      const tx = await signer.sendTransaction({
        to: demoAddress,
        value: ethAmount,
        gasLimit: 21000,
      });

      setTxHash(tx.hash);
      setStep('success');
      
      // Wait for transaction confirmation
      await tx.wait();
      
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed');
      setStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 'confirm':
        return <FiCheckCircle className="w-6 h-6 text-blue-600" />;
      case 'processing':
        return <FiLoader className="w-6 h-6 text-yellow-600 animate-spin" />;
      case 'success':
        return <FiCheckCircle className="w-6 h-6 text-green-600" />;
      case 'error':
        return <FiAlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'confirm':
        return 'Confirm Payment';
      case 'processing':
        return 'Processing Payment';
      case 'success':
        return 'Payment Successful';
      case 'error':
        return 'Payment Failed';
      default:
        return '';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'confirm':
        return 'Review your order and confirm the blockchain payment';
      case 'processing':
        return 'Your transaction is being processed on the blockchain...';
      case 'success':
        return 'Your payment has been successfully processed!';
      case 'error':
        return 'There was an error processing your payment';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            {getStepIcon()}
            <h2 className="text-xl font-semibold text-gray-900">
              {getStepTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-gray-600 text-center">
            {getStepDescription()}
          </p>

          {/* Order Summary */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Order Summary</h3>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              
              {/* Payment Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">Payment Details:</p>
                  <p>• Network: {chainId === '0xaa36a7' ? 'Sepolia Testnet' : 'Current Network'}</p>
                  <p>• Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}</p>
                  <p>• Amount: ~{(totalPrice * 0.0003).toFixed(6)} ETH</p>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Hash */}
          {txHash && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-green-800">
                <FiCheckCircle className="w-4 h-4" />
                <span className="font-medium">Transaction Hash:</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <code className="text-xs bg-green-100 px-2 py-1 rounded font-mono">
                  {txHash.slice(0, 20)}...
                </code>
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-red-800">
                <FiAlertCircle className="w-4 h-4" />
                <span className="font-medium">Error:</span>
              </div>
              <p className="mt-2 text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {step === 'confirm' && (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                >
                  Confirm Payment
                </button>
              </>
            )}
            
            {(step === 'success' || step === 'error') && (
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
