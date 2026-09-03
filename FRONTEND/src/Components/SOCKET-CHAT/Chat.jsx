import React, { useEffect, useRef, useState } from "react";
import socket from "../../api/socket.js";
import "./Chat.css";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [
                ...prev,
                data
            ]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);


    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!message.trim())
            return;

        socket.emit("send_message", {
            text: message,
            senderId: socket.id
        });

        setMessage("");
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-card">
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <span className="status-dot"></span>
                        <h3>College Community Chat</h3>
                    </div>
                    <span className="chat-subtitle">Real-time Discussion</span>
                </div>

                {/* Message Area */}
                <div className="chat-messages">
                    {messages.slice().reverse().map((msg, index) => {

                        const isMe = msg.senderId === socket.id

                        return (
                            <div key={index} className={`message ${isMe ? "message-sent" : "message-received"}`}>
                                <span className="sender-name">{isMe ? "You" : "Other"}</span>
                                <div className="bubble">{msg.text}</div>
                                <span className="timestamp">Just now</span>
                            </div>
                        );
                    })}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        className="chat-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;