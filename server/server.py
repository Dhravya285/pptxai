import asyncio
import websockets
import json
from models.hand_gesture import detect_gestures

# Store connected clients
connected_clients = set()

async def handler(websocket, path):
    """Handle incoming WebSocket connections and messages."""
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            print(f"Received from client: {data}")
    except websockets.exceptions.ConnectionClosedError:
        print("Client disconnected.")
    finally:
        connected_clients.remove(websocket)

async def send_gesture(gesture):
    """Send gesture data to all connected clients."""
    if connected_clients:
        message = json.dumps({"gesture": gesture})
        await asyncio.gather(*(client.send(message) for client in connected_clients))

async def main():
    """Start WebSocket server."""
    server = await websockets.serve(handler, "127.0.0.1", 9000)
    print("✅ WebSocket Server Started on ws://localhost:9000")
    await server.wait_closed()

if __name__ == "__main__":
    try:
        asyncio.run(main())  # Run the WebSocket server
    except KeyboardInterrupt:
        print("\nShutting down WebSocket server...")
