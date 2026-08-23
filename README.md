# BooChat

A real-time chat application with AI integration.

## What it does

Users can chat in real time via WebSockets - messages are delivered instantly as long as the server is running. The app integrates an external AI agent hosted on Google Cloud, allowing users to interact with AI directly in the chat. Messages are not persisted — the chat history exists only for the duration of the server session.

## Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Real-time:** WebSockets
- **AI Integration:** Bielik AI agent via Google Cloud

## The hard part

Integrating the external AI agent into the real-time chat flow - making sure the AI responses arrived and were displayed in the correct order relative to user messages, without blocking the WebSocket communication for other users in the chat.

## Screenshots / Demo

_(add a screenshot or a short GIF of the chat here)_

## How to run

```bash
git clone https://github.com/wszacka/boochat
npm install
# fill in .env (OLLAMA_API_BASE, BIELIK_MODEL_NAME)
npm start
```
