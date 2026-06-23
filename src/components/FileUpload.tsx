'use client'

import { useRef, useState } from 'react'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from '@/lib/constants'
import type { UploadedFile } from '@/lib/types'

interface FileUploadProps {
  label: string
  accept?: string
  value: UploadedFile | null
  onChange: (file: UploadedFile | null) => void
  error?: string
}

export function FileUpload({
  label,
  accept = 'image/jpeg,image/jpg,image/png,application/pdf',
  value,
  onChange,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024

  const validate = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type as typeof ALLOWED_FILE_TYPES[number])) {
      return 'Only JPG, PNG, and PDF files are accepted.'
    }
    if (file.size > maxBytes) {
      return `File size must be less than ${MAX_FILE_SIZE_MB} MB.`
    }
    return null
  }

  const handleFile = async (file: File) => {
    const validationError = validate(file)
    if (validationError) {
      onChange(null)
      return
    }

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = (err) => reject(err)
    })

    onChange({
      file,
      base64,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      <label className="label-text">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all ${
          dragActive
            ? 'border-accent-500 bg-accent-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-slate-200 bg-slate-50 hover:border-accent-400 hover:bg-accent-50/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />

        {value ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900">{value.name}</p>
                <p className="text-xs text-slate-500">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              aria-label="Remove file"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft">
              <Upload size={22} className="text-accent-600" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-500">
              JPG, PNG, or PDF up to {MAX_FILE_SIZE_MB} MB
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
