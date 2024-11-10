import React, { useState } from 'react';
import axios from 'axios';

function SignUp({ onLoginClick }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignUp = async () => {
        try {
            const response = await axios.post('/api/auth/register', {
                username,
                password,
            });

            if (response.data === "User registered successfully") {
                setSuccess(true);
                setError('');
            } else {
                throw new Error(response.data);
            }
        } catch (error) {
            setError("Error: Could not sign up.");
            setSuccess(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignUp();
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
                Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
                >
                    Sign Up
                </button>
            </form>

            {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            {success && (
                <div className="mt-4 text-center">
                    <p className="text-green-500 text-sm">
                        Registration successful! You can now log in.
                    </p>
                    <button
                        onClick={onLoginClick}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignUp;
