# Collaborative_Canvas
Collaborative Canvas is a real-time multi-user drawing board built using Node.js, Socket.io, and Vanilla JavaScript. It allows multiple users to draw together on the same canvas simultaneously, with every stroke instantly reflected across all connected clients. The application supports brush and eraser tools, color and stroke size selection, undo and redo operations, and even a clear button to reset the entire board for everyone. It’s designed to demonstrate mastery of real-time synchronization, efficient canvas rendering, and clean frontend-backend communication using WebSockets.

# Overview

When a user joins, they’re prompted to enter their name, which helps identify their cursor and drawing activity on the shared canvas. The toolbar provides interactive controls for brush and eraser modes, color and size adjustment, and undo/redo actions. All changes are synchronized instantly through Socket.io, ensuring a seamless real-time collaborative experience.

The project uses Vanilla JavaScript and the HTML5 Canvas API for the drawing interface — no frameworks or external drawing libraries are used, which makes it lightweight and educationally transparent.

# Technologies Used

The frontend is built using HTML, CSS, and JavaScript, leveraging the Canvas API for rendering. The backend uses Node.js with Express.js and Socket.io for managing WebSocket connections and broadcasting updates to all users in real time. This setup provides a responsive and low-latency environment for drawing and synchronization.
Installation and Setup

To set up and run the project locally, follow these steps:

Clone the repository:

git clone https://github.com/YOUR_USERNAME/collaborative-canvas.git
cd collaborative-canvas


Install all required dependencies:

npm install


Start the development server:

npm start


Open your browser and visit http://localhost:3000
.
To test real-time functionality, open the same URL in multiple tabs or on different devices.

# How It Works

Every user connects to the server through Socket.io. When a drawing action begins, the client sends messages to the server describing the stroke — including its color, width, and coordinates. The server broadcasts these messages to all other connected clients, ensuring everyone sees the same drawing in real time.

Undo and redo operations are handled globally on the server. Each drawing stroke is stored in a shared history stack. When a user triggers “Undo,” the server removes the most recent stroke from the history and sends an updated state to all clients. Similarly, when “Redo” is triggered, the most recently undone stroke is restored and broadcast again.

# Undo, Redo, and Clear Logic

The backend maintains two stacks — one for completed strokes (history) and another for undone strokes (undone). When a user undoes an action, the last stroke is moved from history to undone. When a redo occurs, that stroke is moved back into history. Whenever either stack changes, the server sends the updated state to all connected clients, who then redraw their canvases accordingly.

The clear button sends a command that empties both stacks and clears the entire canvas for everyone simultaneously.

# User Interface and Experience

The user interface includes a modern, responsive toolbar positioned above the drawing canvas. It contains intuitive buttons and controls for tool selection, color picking, brush size adjustment, undo/redo, and clearing the board. The canvas area is large, clean, and centered, providing an intuitive drawing experience on both desktop and touch devices. The entire layout is styled using pure CSS for a lightweight and elegant design.

# Features Summary

Real-time collaboration: Multiple users can draw simultaneously on a shared board.

Custom tools: Choose between brush and eraser with adjustable size and color.

Undo/Redo: Global undo and redo actions that sync instantly across all clients.

Clear board: Instantly erase all drawings for everyone with a single click.

User identification: Each user provides a name on joining.

Responsive design: Works smoothly across devices and browsers.

# Design and Architecture

The application is structured into two main components: the client and the server.
The client handles user input, rendering, and interface updates. The server manages all communication, synchronization, and operation history.

When a user performs a drawing action, the client serializes the event data and sends it via WebSocket to the server. The server then broadcasts the event to all clients, including the sender, to ensure a consistent shared state. Undo, redo, and clear operations work on the same principle but involve updating shared history arrays.
