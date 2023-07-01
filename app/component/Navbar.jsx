import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className= 'sticky top-0 z-50 opacity-90 bg-slate-800 flex justify-between items-center px-8 py-3'>
        <Link href={'/'} className='text-white font-bold'>Home</Link>
        <Link href={'/addTopic'} className=' p-2 rounded-sm bg-white'>Add Post</Link>
    </div>
  )
}

export default Navbar