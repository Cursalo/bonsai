'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server' // Assuming alias '@' is setup for 'src'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // TODO: Handle error more gracefully (e.g., display message to user)
    console.error('Login error:', error.message)
    redirect('/login?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout') // Revalidate all paths starting from root
  redirect('/') // Redirect to homepage or dashboard after successful login
}

// TODO: Implement signup action similarly
export async function signup(formData: FormData) {
  // Implementation similar to login, using supabase.auth.signUp
  console.log('Signup action called, implementation pending.')
  // Remember to handle confirmation emails if enabled in Supabase settings
  redirect('/login?message=Signup functionality not yet implemented')
}
