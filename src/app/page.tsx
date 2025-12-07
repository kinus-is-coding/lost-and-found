import Feedlist from '@/components/feed/Feedlist'
import React from 'react'

const page = () => {
  return (
    <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        <Feedlist/>
    </div>
  )
}

export default page