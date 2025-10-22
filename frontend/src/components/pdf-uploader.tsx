"use client"

import React, { useState, DragEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

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

  const handleUpload = () => {
    if (!file) return alert("No file selected!")
    // 🔥 You can call your upload API here
    alert(`Uploading: ${file.name}`)
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
            Upload PDF
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
