import Link from 'next/link'
import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Bonsai Prep
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-primary-200 to-primary-400 dark:from-primary-900 dark:to-primary-700 flex items-center justify-center">
          <div className="p-12 max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Start Your Learning Journey</h2>
            <p className="text-lg text-white opacity-90">
              Join Bonsai Prep today and experience personalized AI tutoring that adapts to your learning style and helps you master standardized exams.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 