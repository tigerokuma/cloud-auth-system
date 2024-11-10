import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            });
            const jwtToken = response.data;

            setToken(jwtToken);
            localStorage.setItem('token', jwtToken);
            setError('');
            setSuccess(true);
            fetchProfile(jwtToken);
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            setSuccess(false);
        }
    };

    const fetchProfile = async (authToken) => {
        try {
            const response = await axios.get('/api/auth/profile', {
                headers: { Authorization: `Bearer ${authToken || token}` },
            });
            setProfile(response.data);
        } catch (error) {
            setError("Failed to fetch profile data.");
            setSuccess(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
                Login
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
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                >
                    Login
                </button>
            </form>

            {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            {success && (
                <p className="mt-4 text-green-500 text-sm text-center">
                    Login successful!
                </p>
            )}

            {profile && (
                <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">
                        User Profile
                    </h3>
                    <p className="text-gray-600">
                        <strong>Username:</strong> {profile.username}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Login;
