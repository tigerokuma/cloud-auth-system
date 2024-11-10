import React, { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

function HomePage() {
    const [currentPage, setCurrentPage] = useState('');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 text-center">
                    Welcome! Please choose an option
                </h2>
                {!currentPage && (
                    <div className="space-y-4 mt-6">
                        <button
                            onClick={() => setCurrentPage('login')}
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setCurrentPage('signup')}
                            className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
                {currentPage === 'login' && <Login />}
                {currentPage === 'signup' && (
                    <SignUp onLoginClick={() => setCurrentPage('login')} />
                )}
            </div>
        </div>
    );
}

export default HomePage;
