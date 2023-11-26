"use client"
import Box from '@/components/Box'
import { FC } from 'react'
import { BounceLoader } from 'react-spinners'
interface loadingProps {
  
}

const loading: FC<loadingProps> = ({}) => {
    return <Box className='h-full flex items-center justify-center'>
      <BounceLoader color='#22c55e' size={40} />
  </Box>
}

export default loading