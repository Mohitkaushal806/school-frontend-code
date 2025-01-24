import React, { useState } from 'react';
import { fetchTransactionStatus } from '../api/api';
import Navbar from './NavBar';

const StatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState('');
  const [status, setStatus] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!customOrderId) {
      alert('Please enter a Custom Order ID.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await fetchTransactionStatus(customOrderId);
      console.log('data: ', data);
      setStatus(data[0]);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch status. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Transaction Status Check</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Custom Order ID"
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={customOrderId}
            onChange={(e) => setCustomOrderId(e.target.value)}
          />
          <button
            className={`px-6 py-3 rounded-lg text-white ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition duration-200'
              }`}
            onClick={checkStatus}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        {status && (
          <div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700  dark:text-gray-200 mb-4">Status Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-bold text-gray-500 dark:text-gray-200">Status:</span>{' '}
                <span
                  className={`px-2 py-1 rounded-lg text-sm ${status.status === 'Success'
                      ? 'bg-green-100 text-green-800'
                      : status.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                  {status.status}
                </span>
              </p>
              <p className="text-gray-500 dark:text-gray-200">
                <span className="font-bold">Order Amount:</span>{' '}
                {status.order_amount}
              </p>
              <p className="text-gray-500 dark:text-gray-200">
                <span className="font-bold">Transaction Amount:</span>{' '}
                {status.transaction_amount}
              </p>
              <p className="text-gray-500 dark:text-gray-200">
                <span className="font-bold">Gateway:</span>{' '}
                {status.gateway}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatusCheck;
