import React, { useEffect, useState } from "react";

const PPTController = () => {
    const [gesture, setGesture] = useState(null);

    useEffect(() => {
        const fetchGesture = async () => {
            try {
                const response = await fetch("http://localhost:5000/get_gesture");
                const data = await response.json();
                if (data.gesture) {
                    setGesture(data.gesture);
                    console.log("Gesture received:", data.gesture);

                    if (data.gesture === "swipe_right") {
                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
                    } else if (data.gesture === "swipe_left") {
                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
                    } else if (data.gesture === "thumbs_up") {
                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "F5" }));
                    } else if (data.gesture === "thumbs_down") {
                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
                    }
                }
            } catch (error) {
                console.error("Error fetching gesture:", error);
            }
        };

        // Poll every 2 seconds
        const interval = setInterval(fetchGesture, 2000);
        return () => clearInterval(interval);
    }, []);

    return <h2>Latest Gesture: {gesture || "Waiting..."}</h2>;
};

export default PPTController;
