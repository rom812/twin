'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import VisualPanel from './VisualPanel';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface UIAction {
    type: string;
    payload: any;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [uiAction, setUiAction] = useState<UIAction | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            // Handle UI Action
            if (data.ui_action) {
                console.log("Received UI Action:", data.ui_action);
                setUiAction(data.ui_action);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            // Refocus the input after message is sent
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Check if avatar exists
    const [hasAvatar, setHasAvatar] = useState(false);
    useEffect(() => {
        // Check if avatar.png exists
        fetch('/avatar.png', { method: 'HEAD' })
            .then(res => setHasAvatar(res.ok))
            .catch(() => setHasAvatar(false));
    }, []);

    return (
        <div className="flex h-[800px] w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Left Panel: Chat Interface */}
            <div className="flex flex-col w-full lg:w-2/3 border-r border-slate-200 bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-slate-100 p-4">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Bot className="w-5 h-5 text-blue-600" />
                        AI Twin
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                            Live
                        </span>
                    </h2>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 mt-20">
                            {hasAvatar ? (
                                <img
                                    src="/avatar.png"
                                    alt="Digital Twin Avatar"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                                    <Bot className="w-10 h-10 text-white" />
                                </div>
                            )}
                            <h3 className="text-lg font-semibold text-gray-800">Hi, I'm the Digital Twin.</h3>
                            <p className="text-base mt-2 max-w-md mx-auto">Ask me about my experience, skills, or projects to see the magic happen!</p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            {message.role === 'assistant' && (
                                <div className="flex-shrink-0 mt-1">
                                    {hasAvatar ? (
                                        <img
                                            src="/avatar.png"
                                            alt="Bot"
                                            className="w-8 h-8 rounded-full border border-slate-200"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div
                                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${message.role === 'user'
                                    ? 'bg-slate-800 text-white rounded-tr-sm'
                                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap leading-relaxed text-base">{message.content}</p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                                <Sparkles className="w-4 h-4 text-white animate-spin" />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm rounded-tl-sm">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="bg-white p-4 border-t border-slate-100">
                    <div className="flex gap-2 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask me something..."
                            className="flex-1 pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                            disabled={isLoading}
                            autoFocus
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel: Visual Context */}
            <div className="hidden lg:block lg:w-1/3 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 p-6 overflow-y-auto">
                    <VisualPanel action={uiAction} />
                </div>
                {/* Decorative background elements could go here */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
            </div>
        </div>
    );
}