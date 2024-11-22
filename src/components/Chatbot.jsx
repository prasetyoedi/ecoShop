import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Chatbot() {
    const [inputUser, setInputUser] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [error, setError] = useState('');
    const apiKey = import.meta.env.VITE_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const generationConfig = {
        maxOutputTokens: 100,
        temperature: 1,
    };

    // Validasi apakah pertanyaan terkait dengan produk EcoShop
    function isProductRelatedQuestion(question) {
        const keywords = ['ecoshop', 'produk', 'ramah lingkungan', 'green', 'manfaat', 'green technology', 'daur ulang', 'plastik', 'rekomendasi'];
        return keywords.some(keyword => question.toLowerCase().includes(keyword));
    }

    async function handlePromptSubmit() {
        if (!inputUser.trim()) return;

        // Validasi apakah pertanyaan terkait dengan produk EcoShop
        if (!isProductRelatedQuestion(inputUser)) {
            setError("Pertanyaan harus terkait dengan produk EcoShop atau informasinya. Coba lagi dengan pertanyaan lain.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const userMessage = inputUser;

            // Update riwayat chat dengan pesan pengguna
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'user', message: userMessage }
            ]);

            // Memulai sesi chat dengan GoogleGenerativeAI
            const chatSession = model.startChat({
                generationConfig,
                history: chatHistory.map((item) => ({
                    role: item.sender === 'user' ? 'user' : 'assistant',
                    content: item.message,
                })),
            });

            // Kirim pesan ke model dan dapatkan balasan
            const result = await chatSession.sendMessage(userMessage);
            const botResponse = result.response.text;

            // Update riwayat chat dengan balasan bot
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'bot', message: botResponse }
            ]);
        } catch (error) {
            console.error(error);
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'bot', message: 'Terjadi kesalahan. Silakan coba lagi.' }
            ]);
        } finally {
            setInputUser('');
            setLoading(false);
        }
    }

    function handleReset() {
        setInputUser('');
        setChatHistory([]);
        setError('');
    }

    function toggleChat() {
        setIsChatOpen(!isChatOpen);
    }

    return (
        <>
            {!isChatOpen && (
                <button
                    onClick={toggleChat}
                    className="btn btn-primary floating-icon"
                    aria-label="Open Chatbot"
                >
                    <i className="bi bi-chat"></i>
                </button>
            )}

            {isChatOpen && (
                <div className="p-3 container-bot">
                    <div className="card shadow-lg p-4 floating-bot">
                        <h5 className='text-center'>Tanya EcoShop Bot</h5>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="chat-history mb-4">
                            {chatHistory.map((chat, index) => (
                                <div key={index} className={`chat-bubble ${chat.sender}`}>
                                    <strong>
                                        {chat.sender === 'user' ? 'Kamu  ' : 'Eco Bot'}:
                                    </strong>{' '}
                                    {typeof chat.message === 'function' ? chat.message() : chat.message}
                                </div>
                            ))}
                        </div>
                        <div className="form-group mb-4">
                            <input
                                type="text"
                                id="userInput"
                                className="form-control custom-input"
                                placeholder="Ketik disini"
                                value={inputUser}
                                onChange={(e) => setInputUser(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePromptSubmit()}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                onClick={handlePromptSubmit}
                                type="button"
                                className="btn btn-primary w-100 me-2 submit-button"
                                disabled={loading || !inputUser.trim()}
                            >
                                {loading ? 'Memproses...' : 'Tanya'}
                            </button>
                            <button
                                onClick={handleReset}
                                type="button"
                                className="btn btn-secondary w-100 reset-button"
                                disabled={chatHistory.length === 0 && !inputUser}
                            >
                                Reset
                            </button>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="btn btn-danger close-chat-btn"
                            aria-label="Close Chatbot"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
