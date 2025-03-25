import React, { useEffect, useState } from "react";

const PPTController = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:9000");

        ws.onopen = () => console.log("✅ Connected to WebSocket Server");
        ws.onerror = (error) => console.error("❌ WebSocket Error:", error);
        ws.onclose = () => console.log("🔴 WebSocket Disconnected");

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Gesture received:", data.gesture);

                if (data.gesture === "swipe_right") {
                    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
                } else if (data.gesture === "swipe_left") {
                    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
                } else if (data.gesture === "thumbs_up") {
                    document.dispatchEvent(new KeyboardEvent("keydown", { key: "F5" })); // Start Presentation
                } else if (data.gesture === "thumbs_down") {
                    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })); // Exit Presentation
                }
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        };

        setSocket(ws); // Store WebSocket instance

        return () => {
            ws.close(); // Clean up on unmount
        };
    }, []);

    return <h2>🎤 Listening for Hand Gestures...</h2>;
};

export default PPTController;
