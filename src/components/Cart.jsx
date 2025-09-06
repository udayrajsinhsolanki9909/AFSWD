import React from "react";

export default function Cart({ items, onPurchase, loading }) {
    const total = items.length * 10;
    return (
        <div className="p-4 border rounded bg-white dark:bg-gray-900">
            <h3 className="font-semibold">Shopping Cart</h3>
            {items.length === 0 ? (
                <div className="text-sm mt-2">Cart is empty</div>
            ) : (
                <ul className="mt-2 space-y-2">
                    {items.map((it) => (
                        <li key={it.id} className="flex justify-between">
                            <span>{it.title}</span>
                            <span>$10</span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-3 flex items-center justify-between">
                <div className="text-lg font-bold">Total: ${total}</div>
                <button disabled={loading || items.length === 0} onClick={onPurchase}
                    className="px-3 py-1 bg-blue-600 text-white rounded">
                    {loading ? "Processing..." : "Purchase"}
                </button>
            </div>
        </div>
    );
}
