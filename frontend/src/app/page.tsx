import FAQSection from '@/components/FAQ'
import Footer from '@/components/Footer'
import PdfUploader from '@/components/pdf-uploader'
import React from 'react'

const page = () => {
  return (
    <main className='flex flex-col gap-10 p-10 w-full h-full'>
      <header className=''>
        <h1 className='text-4xl font-bold'>Chat with any <span className='bg-[#9810FA] rounded-2xl px-2 text-white'>PDF</span></h1>
        <p className='mt-4 text-gray-500'>
          Join millions of <span className='underline text-amber-400'>students, researchers and professionals</span>  to instantly
          answer questions and understand research with AI
        </p>
      </header>
      <div className='w-full'>
        <PdfUploader />
        <FAQSection />
      </div>
      <Footer />
    </main>
  )
}

export default page
