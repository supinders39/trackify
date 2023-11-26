"use client"
import Box from '@/components/Box'
import { FC } from 'react'

interface errorProps {
  
}

const error: FC<errorProps> = ({}) => {
    return <Box className='h-full flex items-center justify-center'>
      <div className=' text-neutral-400'>Something went wrong!</div>
  </Box>
}

export default error