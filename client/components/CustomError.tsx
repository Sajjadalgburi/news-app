import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

const CutomError = ({ error }: { error: Error | string }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 py-5 text-center max-w-screen-lg mx-auto">
      <p className="text-red-500 text-2xl font-bold">
        Error: {error instanceof Error ? error.message : error}
      </p>
      <Button className='w-fit mx-auto cursor-pointer' variant="outline" onClick={() => router.push("/")}>
        Go to Home
      </Button>
    </div>
  )
}

export default CutomError
