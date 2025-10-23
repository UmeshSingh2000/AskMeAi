"use client"

import React, { useState, DragEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"





export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // handle file select
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    } else {
      alert("Please select a valid PDF file.")
    }
  }

  // drag & drop
  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setPreviewUrl(URL.createObjectURL(droppedFile))
    } else {
      alert("Please upload a PDF file.")
    }
  }

  const handleClear = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  const handleUpload = async () => {
    try {
      setLoading(true)
      if (!file) return alert("No file selected!")
      // 🔥 You can call your upload API here
      const formData = new FormData();
      formData.append('pdf', file)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/uploadpdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        }
      })
      if (response.status === 200) {
        toast("Upload successful!")
        setFile(null)
        setPreviewUrl(null)
        router.push(`/chat/${response.data.chatId}`)
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-background mx-auto">
      {/* Upload Area */}
      {!previewUrl ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          htmlFor="pdf-upload"
          className={`flex flex-col items-center justify-center w-full p-10 rounded-lg cursor-pointer transition 
        ${isDragging ? "bg-muted/40 border-primary" : "bg-muted/20"}`}
        >
          <FileText className="w-12 h-12 text-primary mb-4" />
          <Button className="bg-purple-600 hover:bg-purple-700 text-white mb-2">
            <Upload className="mr-2 h-4 w-4" />
            Click or drag here to upload
          </Button>
          <p className="text-sm text-muted-foreground">Upload via link</p>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        /* Preview Section */
        <div className="w-full flex flex-col items-center gap-3">
          <div className="relative w-full h-[500px] border rounded-lg overflow-hidden shadow-md">
            <iframe
              src={previewUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-sm text-foreground">
            Selected file: <b>{file?.name}</b>
          </p>

          <Button onClick={handleUpload} className="bg-purple-600 hover:bg-purple-700 text-white">
            {loading ? <Spinner /> : "Upload PDF"}
          </Button>
        </div>
      )}

      {/* File Info (only show if not previewing) */}
      {!previewUrl && (
        <p className="text-xs text-center text-muted-foreground mt-3">
          File types supported: <b>PDF</b> | Max file size: <b>50MB</b>
          <br />
          Max Token: <b>100K</b> (≈70,000 words or characters)
        </p>
      )}
    </div>
  )
}
