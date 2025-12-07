'use client';
import React,{useState} from 'react'
import useLoginModal from '@/hooks/useLoginModal';
import Modals from './Modals';
const LoginModal = () => {
    const LoginModal=useLoginModal()
    const [isLoading, setIsLoading] = useState(false);
    const content=(
      <>
       
    
    <form action="" className='space-y-4'>
        
        <input 
            placeholder='Enter your username' 
            type="email"  
            className='w-full h-[54px] px-4 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            // Added bg-white and text-black
        />
        
        <input 
            placeholder='Enter your password' 
            type="password"  
            className='w-full h-[54px] px-4 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            // Added bg-white and text-black
        />
       <div className='p-5 bg-red-700 text-white rounded-xl'>
          error message
      </div>
        <button
    type="submit" // IMPORTANT: This makes it a submit button for the form
    disabled={isLoading} // IMPORTANT: Disabled when the login process is running
    className="
        mt-4 
        w-full 
        h-[54px] 
        inline-flex 
        items-center 
        justify-center 
        text-lg
        font-bold 
        text-white 
        rounded-xl 
        transition-all 
        duration-300
        
        // Gradient Background
        bg-gradient-to-r 
        from-indigo-600 
        to-purple-600 
        shadow-lg 
        shadow-indigo-900/50

        // Hover Effect
        hover:from-indigo-500 
        hover:to-purple-500 

        // Disabled State (Crucial for indicating waiting/loading)
        disabled:opacity-50 
        disabled:cursor-not-allowed
    "
>
    {/* Conditional Text: Shows "Logging in..." or "Log In" */}
    {isLoading ? (
        <span className="flex items-center gap-2">
            {/* Spinning Icon for better UX */}
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
        </span>
    ) : (
        'Log In'
    )}
        </button>
    </form>
        </>
    )
  return (
   <Modals
    isOpen={LoginModal.isOpen}
    close={LoginModal.close}
    label="Login"
    content={content}
   />
  )
}

export default LoginModal