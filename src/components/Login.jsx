import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function submit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await onLogin(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submit} className="p-4 rounded shadow bg-white dark:bg-gray-800 max-w-md">
            <h3 className="text-lg font-semibold mb-2">Sign in</h3>

            <label className="block text-sm">Email</label>
            <input required type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded mb-2 border" />

            <label className="block text-sm">Password</label>
            <input required minLength={4} type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded mb-2 border" />

            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">
                {loading ? "Signing..." : "Sign in"}
            </button>
        </form>
    );
}
