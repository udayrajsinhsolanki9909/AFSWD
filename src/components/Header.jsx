import React from "react";

export default function Header({ user, onLogout, dark, setDark, cartCount }) {
    return (
        <header className="p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
            <div className="flex items-center gap-3">
                <div className="text-2xl font-bold">EduStream</div>
                <nav className="hidden md:flex gap-2 text-sm">
                    <a className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Courses</a>
                    <a className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => setDark(!dark)}
                    className="px-3 py-1 rounded border bg-gray-50 dark:bg-gray-700">
                    {dark ? "Light" : "Dark"}
                </button>

                <button className="px-3 py-1 rounded border bg-gray-50 dark:bg-gray-700">
                    Cart ({cartCount})
                </button>

                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{user.name}</span>
                        <button onClick={onLogout} className="px-2 py-1 rounded bg-red-500 text-white">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="text-sm">Not signed in</div>
                )}
            </div>
        </header>
    );
}
