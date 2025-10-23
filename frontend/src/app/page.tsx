import FAQSection from '@/components/FAQ'
import AskAIFeatures from '@/components/Features'
import Footer from '@/components/Footer'
import PdfUploader from '@/components/pdf-uploader'
import VideoDemoComponent from '@/components/ProductDemo'
import AskAIStats from '@/components/Stats'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <main className='flex flex-col gap-10 p-10 w-full h-auto bg-linear-to-r from-purple-100 to-blue-100'>
      <div className=''>
        <AskAIStats />
        <header className=' flex flex-col items-center justify-center gap-2'>
          <h1 className='text-5xl font-bold text-center'>Chat with any <span className='bg-[#9810FA] rounded-xl px-2 text-white'>PDF</span></h1>
          <p className='mt-4 text-gray-500 text-center'>
            Join millions of <span className='underline text-amber-400'>students, researchers and professionals</span>  to instantly
            answer questions and understand research with AI
          </p>
          <a href="#pdf-uploader" className='mt-2'>
            <Button className='bg-amber-400 hover:bg-amber-500 cursor-pointer'>Get Started</Button>
          </a>
        </header>
      </div>
      <div className='w-full'>
        <VideoDemoComponent
          src="/PDF_Chat_Demo_Video_Generation.mp4"
          className='mb-10'
          description='AskAI is an intelligent platform that lets you chat directly with your PDFs. Simply upload a document, and AskAI instantly understands its content — allowing you to ask questions, summarize sections, and explore insights in natural conversation. Perfect for students, professionals, and researchers who want to save time and understand complex PDFs effortlessly.'
        />
        <div>
          <header className='flex max-w-2xl mb-2 m-auto flex-col'>
            <h1 className='text-2xl font-bold text-center mb-2'>Chat with PDF</h1>
            <p className='text-gray-500 text-center'>Upload any PDF to SciSpace Chat PDF, ask a question, and get concise, citation-linked answers, summaries, and follow-ups in seconds—free tier, 256-bit encrypted, no data training, supports 75 + languages.</p>
          </header>

          <PdfUploader />
        </div>
        <AskAIFeatures />
        {/* <TestimonialCarousel /> */}
        <FAQSection />
      </div>
      <Footer />
    </main>
  )
}

export default page
