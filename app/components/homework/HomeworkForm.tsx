'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/app/lib/supabase'

const homeworkSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  examType: z.enum(['SAT', 'ACT', 'GRE', 'GMAT', 'Other']),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  questions: z.array(
    z.object({
      type: z.enum(['multiple_choice', 'short_answer', 'essay']),
      question: z.string().min(3, 'Question must be at least 3 characters'),
      options: z.array(z.string()).optional(),
      answer: z.string().min(1, 'Answer is required'),
    })
  ).min(1, 'At least one question is required'),
  attachments: z.array(z.any()).optional(),
})

type HomeworkFormValues = z.infer<typeof homeworkSchema>

export default function HomeworkForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<HomeworkFormValues>({
    resolver: zodResolver(homeworkSchema),
    defaultValues: {
      title: '',
      description: '',
      examType: 'SAT',
      subject: '',
      questions: [
        {
          type: 'multiple_choice',
          question: '',
          options: ['', '', '', ''],
          answer: '',
        },
      ],
      attachments: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  const watchQuestionTypes = watch('questions')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: HomeworkFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Upload attachments if any
      const fileUrls = []
      
      if (files.length > 0) {
        for (const file of files) {
          const fileName = `${Date.now()}-${file.name}`
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('homework-attachments')
            .upload(fileName, file)

          if (uploadError) {
            throw new Error(`Error uploading file: ${uploadError.message}`)
          }

          const { data: urlData } = supabase.storage
            .from('homework-attachments')
            .getPublicUrl(fileName)

          fileUrls.push(urlData.publicUrl)
        }
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Submit homework
      const { error: submissionError } = await supabase
        .from('homework_submissions')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          exam_type: data.examType,
          subject: data.subject,
          content: { questions: data.questions },
          attachments: fileUrls,
          submitted_at: new Date().toISOString(),
          status: 'submitted',
        })

      if (submissionError) {
        throw submissionError
      }

      // Redirect to homework list
      router.push('/homework')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'An error occurred while submitting homework')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <div className="mt-1">
            <input
              id="title"
              type="text"
              className="input-field"
              disabled={isSubmitting}
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="examType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Exam Type
          </label>
          <div className="mt-1">
            <select
              id="examType"
              className="input-field"
              disabled={isSubmitting}
              {...register('examType')}
            >
              <option value="SAT">SAT</option>
              <option value="ACT">ACT</option>
              <option value="GRE">GRE</option>
              <option value="GMAT">GMAT</option>
              <option value="Other">Other</option>
            </select>
            {errors.examType && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.examType.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <div className="mt-1">
          <input
            id="subject"
            type="text"
            className="input-field"
            disabled={isSubmitting}
            placeholder="e.g., Mathematics, Reading, Science"
            {...register('subject')}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <div className="mt-1">
          <textarea
            id="description"
            rows={3}
            className="input-field"
            disabled={isSubmitting}
            placeholder="Briefly describe what you're working on and what you need help with"
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Questions</h3>
          <button
            type="button"
            onClick={() => append({ type: 'multiple_choice', question: '', options: ['', '', '', ''], answer: '' })}
            className="btn-secondary text-sm py-1"
            disabled={isSubmitting}
          >
            Add Question
          </button>
        </div>
        
        {errors.questions && errors.questions.root && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.questions.root.message}</p>
        )}

        <div className="mt-4 space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">Question {index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Question Type
                  </label>
                  <div className="mt-1">
                    <select
                      className="input-field"
                      disabled={isSubmitting}
                      {...register(`questions.${index}.type`)}
                    >
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="short_answer">Short Answer</option>
                      <option value="essay">Essay</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Question
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={2}
                      className="input-field"
                      disabled={isSubmitting}
                      {...register(`questions.${index}.question`)}
                    />
                    {errors.questions?.[index]?.question && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.questions[index]?.question?.message}
                      </p>
                    )}
                  </div>
                </div>

                {watchQuestionTypes[index]?.type === 'multiple_choice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Options
                    </label>
                    <div className="mt-1 space-y-2">
                      {[0, 1, 2, 3].map((optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <span className="mr-2 text-gray-500 dark:text-gray-400">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <input
                            type="text"
                            className="input-field"
                            disabled={isSubmitting}
                            {...register(`questions.${index}.options.${optionIndex}`)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Answer
                  </label>
                  <div className="mt-1">
                    {watchQuestionTypes[index]?.type === 'multiple_choice' ? (
                      <select
                        className="input-field"
                        disabled={isSubmitting}
                        {...register(`questions.${index}.answer`)}
                      >
                        <option value="">Select an answer</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    ) : watchQuestionTypes[index]?.type === 'short_answer' ? (
                      <input
                        type="text"
                        className="input-field"
                        disabled={isSubmitting}
                        {...register(`questions.${index}.answer`)}
                      />
                    ) : (
                      <textarea
                        rows={4}
                        className="input-field"
                        disabled={isSubmitting}
                        {...register(`questions.${index}.answer`)}
                      />
                    )}
                    {errors.questions?.[index]?.answer && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.questions[index]?.answer?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Attachments (Optional)
        </label>
        <div className="mt-1">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary-50 file:text-primary-700
              dark:file:bg-primary-900 dark:file:text-primary-300
              hover:file:bg-primary-100 dark:hover:file:bg-primary-800"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Upload any relevant files (images, PDFs, etc.)
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-2 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary mr-3"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Homework'}
          </button>
        </div>
      </div>
    </form>
  )
} 