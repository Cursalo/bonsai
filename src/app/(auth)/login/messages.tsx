'use client' // This component uses client-side logic (reading props)

import { useEffect, useState } from 'react'

interface MessagesProps {
  error?: string;
  message?: string;
}

export function Messages({ error, message }: MessagesProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Use useEffect to hide the message after a delay, but only if there's a message or error
  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount or prop change
    }
  }, [error, message]);

  if (!isVisible || (!error && !message)) {
    return null; // Don't render anything if no message/error or if hidden
  }

  return (
    <>
      {error && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center rounded-md">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center rounded-md">
          {message}
        </p>
      )}
    </>
  )
}
