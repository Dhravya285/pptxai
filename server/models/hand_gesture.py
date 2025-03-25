import cv2
import mediapipe as mp
import pyautogui

# Initialize MediaPipe Hand Tracking
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# Define gesture controls
def control_ppt(gesture):
    if gesture == "swipe_right":
        pyautogui.press("right")  # Next slide
    elif gesture == "swipe_left":
        pyautogui.press("left")  # Previous slide
    elif gesture == "thumbs_up":
        pyautogui.press("f5")  # Start presentation
    elif gesture == "thumbs_down":
        pyautogui.press("esc")  # Exit presentation

# Detect gestures from webcam
def detect_gestures():
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            continue

        frame = cv2.flip(frame, 1)  # Flip horizontally
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # Example: Detect open palm for slide navigation
                landmarks = hand_landmarks.landmark
                thumb_tip = landmarks[4].x
                index_tip = landmarks[8].x

                if thumb_tip < index_tip:  # Example: Swipe left
                    control_ppt("swipe_left")
                else:  # Swipe right
                    control_ppt("swipe_right")

        cv2.imshow("Hand Gesture Recognition", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    detect_gestures()
