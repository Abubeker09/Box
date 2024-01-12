import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className=' mt-20 lg:flex bg-[#1e1919] dark:bg-slate-800'>
      <div className='p-10 flex flex-col bg-[#2b2929] dark:bg-slate-800 text-white space-y-5'>
        <h1 className='text-3xl font-bold'>
          <span className='text-5xl text-blue-300'>Welcome to Box.</span> <br /><br />
        Your personal digital space
        </h1>
        <p className='text-red-200'>
          Simplify your digital world with Box - the ultimate solution for managing your personal and professional files
        </p>

        <Link href='/dashboard' className='flex bg-orange-500 rounded-md gap-1 hover:gap-2 p-2 w-fit'>
          Try it for Free <ArrowRight />
        </Link>
      </div>
      <div className='bg-[#1e1919] dark:bg-slate-800 h-full p-10'>
        <video autoPlay loop muted className='rounded-lg'>
          <source src="https://cdn.dribbble.com/userupload/5548723/file/original-515d3722cc2e1f34d94c2aade58eb767.mp4" 
          type="video/mp4" />
          Your browser dose not support the video tag.
        </video>
      </div>
    </div>
  )
}
