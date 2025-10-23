import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
    {
        title: 'Smart Summarization',
        description:
            'Get instant summaries of your PDF. AskAI extracts key insights and saves hours of reading time by providing concise summaries.',
        icon: '🧠',
    },
    {
        title: 'Quick Q&A',
        description:
            'Ask questions about your PDF and get accurate, context-aware answers instantly — like chatting with your document.',
        icon: '💬',
    },
    {
        title: 'Instant PDF Translation',
        description:
            'Translate your PDF instantly without losing formatting. Switch between languages seamlessly for better understanding.',
        icon: '🌐',
    },
    {
        title: 'Multi-Language Support',
        description:
            'Chat with your PDFs in over 50+ languages. Break down language barriers and get responses in your preferred language.',
        icon: '📖',
    },
    {
        title: 'Multi-Format & AI Support',
        description:
            'Upload PDFs, Word, or PowerPoint files. AskAI uses leading AI models to provide fast, accurate, and human-like answers.',
        icon: '⚙️',
    },
    {
        title: 'Privacy Protection',
        description:
            'Your data stays secure with enterprise-grade encryption and private processing on safe servers.',
        icon: '🔒',
    },
]

const AskAIFeatures = () => {
    return (
        <section className="py-16 px-6 bg-background mt-10 rounded-md">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold">
                    Understand PDFs Instantly with <span className="text-primary">AskAI</span>
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                    Upload, chat, summarize, and translate PDFs effortlessly. Your AI assistant for smarter document interaction.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <Card key={index} className="shadow-sm border rounded-2xl hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <span className="text-2xl">{feature.icon}</span>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default AskAIFeatures