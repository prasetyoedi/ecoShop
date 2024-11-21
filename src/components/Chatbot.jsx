import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { keyword } from '../data/keyWord';

export default function Chatbot() {
    const [inputUser, setInputUser] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const generationConfig = {
        maxOutputTokens: 100,
        temperature: 1,
    };

    // Fungsi untuk menangani input pengguna dan memberikan respons
    async function handlePromptSubmit() {
        if (!inputUser.trim()) return;

        setLoading(true);
        try {
            const userMessage = inputUser;
            let botResponse = '';

            // Simpan input pengguna ke riwayat
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'user', message: userMessage }
            ]);

            const productMatch = keyword.find(p =>
                new RegExp(p.name, 'i').test(userMessage)
            );

            if (productMatch) {
                // Jika ditemukan produk yang cocok
                botResponse = `Aku merekomendasikan kamu ${productMatch.description}. Yang memiliki manfaat ${productMatch.benefits}. Dengan harga Rp ${productMatch.price},-.`;
            } else if (/rekomendasi/i.test(userMessage)) {
                // Jika pengguna meminta rekomendasi produk
                const product = keyword[0];
                botResponse = `Rekomendasi produk: ${product.name}. Deskripsi: ${product.description}. Manfaat: ${product.benefits}. Harga: ${product.price}.`;
            } else if (/manfaat/i.test(userMessage)) {
                // Jika pengguna menanyakan manfaat produk
                const productBenefits = keyword.map(p => `${p.name}: ${p.benefits}`).join("\n");
                botResponse = `Manfaat produk kami:\n${productBenefits}`;
            } else {
                // Gunakan API AI jika input tidak cocok dengan respons yang disiapkan
                const chatSession = model.startChat({
                    generationConfig,
                    history: chatHistory.map((item) => ({
                        role: item.sender === 'user' ? 'user' : 'assistant',
                        content: item.message,
                    })),
                });
                const result = await chatSession.sendMessage(userMessage);
                botResponse = result.response.text;
            }

            // Simpan respons chatbot ke riwayat
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
                        <h5>Tanya EcoBot</h5>
                        <div className="chat-history mb-4">
                            {chatHistory.map((chat, index) => (
                                <div key={index} className={`chat-bubble ${chat.sender}`}>
                                    <strong>
                                        {chat.sender === 'user' ? 'Kamu' : 'EcoBot'}:
                                    </strong>{' '}
                                    {chat.message}
                                </div>
                            ))}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="userInput" className="form-label">Kamu mau beli apa hari ini?</label>
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
