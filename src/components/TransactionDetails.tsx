import React, { useState } from 'react';
import { fetchTransactionsBySchool } from '../api/api';
import Navbar from './NavBar';

const TransactionDetails = () => {
  const [schoolId, setSchoolId] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);

  const getTransactions = async () => {
    const { data } = await fetchTransactionsBySchool(schoolId);
    setTransactions(data);
  };

  return (

    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Transactions by School</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter School ID"
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={getTransactions}
          >
            Fetch Transactions
          </button>
        </div>
        {transactions.length > 0 && (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
            <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">Collect ID</th>
                  <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">Gateway</th>
                  <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">Order Amount</th>
                  <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">Transaction Amount</th>
                  <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.collect_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 dark:text-gray-200">
                    <td className="border p-4">{transaction.collect_id}</td>
                    <td className="border p-4">{transaction.gateway}</td>
                    <td className="border p-4">{transaction.order_amount}</td>
                    <td className="border p-4">{transaction.transaction_amount}</td>
                    <td className="border p-4">
                      <span
                        className={`px-2 py-1 rounded-lg text-sm ${transaction.status === 'Success'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionDetails;
