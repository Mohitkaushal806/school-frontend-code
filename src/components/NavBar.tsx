import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import DarkModeToggle from './DarkModeToggle';
import { AuthContext } from '../context/AuthContext';
import { addTxn } from '../api/api';

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    const addTxns = async () => {
        const { data } = await addTxn();
        console.log('data: ', data);
        if(data) {
            window.location.href = data.collect_request_url
        }
    };
    
    return (
        <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-10 align-items-center">
                    <Link to="/">
                        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                            All Transactions
                        </h1>
                    </Link>
                    <Link to="/school-transactions">

                        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                            School Transactions
                        </h1>
                    </Link>

                    <Link to="/status-check">
                        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                            Check Transaction Status
                        </h1>
                    </Link>

                    <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200" onClick={addTxns}>
                        Add Transaction
                    </h1>
                </div>

                <div className="flex gap-10 align-items-center">
                    <DarkModeToggle />
                    <button className="px-4 py-2 rounded-lg text-white bg-red-400 dark:bg-red-400 dark:text-white-800 transition-all" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
};

export default Navbar;