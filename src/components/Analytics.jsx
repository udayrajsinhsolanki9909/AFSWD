import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Analytics({ data }) {
    if (!data) return null;
    return (
        <div className="p-4 border rounded bg-white dark:bg-gray-900">
            <h3 className="font-semibold mb-2">Progress by Course</h3>
            <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                    <BarChart data={data.progressByCourse}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completedPercent" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
