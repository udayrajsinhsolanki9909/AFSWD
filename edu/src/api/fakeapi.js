export const fakeApi = {
    login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 600));
        if (!email.includes("@") || password.length < 4) {
            throw new Error("Invalid credentials");
        }
        const token = btoa(JSON.stringify({ email, ts: Date.now() }));
        return { token, user: { email, name: "Demo User" } };
    },

    getCourses: async () => {
        await new Promise((r) => setTimeout(r, 300));
        return [
            {
                id: "c1",
                title: "Intro to Web",
                media: [{ type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" }]
            },
            {
                id: "c2",
                title: "Audio Lecture: ML Basics",
                media: [{ type: "audio", src: "https://www.w3schools.com/html/horse.mp3" }]
            },
            {
                id: "c3",
                title: "video Lecture: ML Advance",
                media: [{ type: "video", src: "https://youtu.be/vStJoetOxJg" }]
            }
        ];
    },

    getAnalytics: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return {
            progressByCourse: [
                { name: "Intro to Web", completedPercent: 70 },
                { name: "ML Basics", completedPercent: 40 } ,
                { name: "ML Advance", completedPercent: 20 } 
            ],
            recentActivity: [
                { time: "2025-09-01", action: "Watched Video - Intro to Web" },
                { time: "2025-09-03", action: "Attempted Quiz - ML Basics" }
                // { time: "2025-09-02", action: "Attempted Quiz - ML Advance" }
            ]
        };
    },

    purchase: async (token, cart) => {
        if (!token) throw new Error("Not authenticated");
        await new Promise((r) => setTimeout(r, 700));
        return { success: true, orderId: "ORDER-" + Math.random().toString(36).slice(2, 9) };
    }
};
