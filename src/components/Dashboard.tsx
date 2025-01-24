import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/api';
import Navbar from './NavBar';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getTransactions = async () => {
      const { data } = await fetchTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (!filterStatus || transaction.status === filterStatus) &&
      (!searchTerm ||
        transaction.custom_order_id.includes(searchTerm) ||
        transaction.school_id.includes(searchTerm))
  );

  return (
    <>
      <Navbar/>
      <div>
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">
          Transactions Dashboard
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by School ID or Order ID"
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
          <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  Collect ID
                </th>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  School ID
                </th>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  Gateway
                </th>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  Order Amount
                </th>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  Transaction Amount
                </th>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  Status
                </th>
                <th className="border p-4 text-left font-medium text-gray-700 dark:text-gray-200">
                  Custom Order ID
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.collect_id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 dark:text-gray-200"
                >
                  <td className="border p-4">{transaction.collect_id}</td>
                  <td className="border p-4">{transaction.school_id}</td>
                  <td className="border p-4">{transaction.gateway}</td>
                  <td className="border p-4">{transaction.order_amount}</td>
                  <td className="border p-4">{transaction.transaction_amount}</td>
                  <td className="border p-4 ">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        transaction.status === 'Success'
                          ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'
                          : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="border p-4">
                    <span className="relative group">
                      {transaction.custom_order_id}
                      <span className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
                        Custom Order ID
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
