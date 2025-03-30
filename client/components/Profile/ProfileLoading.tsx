import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProfileLoading = () => {
  return (
    <div className='flex flex-col gap-4 py-5 text-center max-w-2xl mx-auto'>
      <Skeleton className='w-full h-[250px] rounded-md' />
      <div className='grid grid-cols-2 gap-4'>
      <Skeleton className='w-full h-[30px] rounded-md' />
      <Skeleton className='w-full h-[30px] rounded-md' />
      <Skeleton className='w-full h-[30px] rounded-md' />
      <Skeleton className='w-full h-[30px] rounded-md' />
      </div>
      <Skeleton className='w-full h-[30px] rounded-md' />
    </div>
  )
}

export default ProfileLoading
