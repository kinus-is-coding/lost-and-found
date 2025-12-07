'use client'
import React, { PropsWithChildren } from "react";
import SearchFilter from "./header/SearchFilter";
import Modals from "./modal/Modals";  
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "./modal/LoginModal";
import SignupModal from "./modal/SignupModal";
import useSignupModal from "@/hooks/useSignupModal";
const  content=(
    <p className="text-black">Helloword</p>
  )

export default function Layout({ children }: PropsWithChildren) {
  const loginModal=useLoginModal();
  const signupModal=useSignupModal();
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg wfont-semibold tracking-tight">
            Lost Item Identifier
          </h1>
          <SearchFilter/>

          <div className="flex items-center space-x-4">
                    
                    {/* 2. The Profile Button */}
                    <button
                        // 3. Attach the open function to the button's onClick event
                        onClick={()=>{
                          loginModal.open()
                        }}
                        className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition"
                        aria-label="Open Login Modal"
                    >
                    </button>
                     <button
                        // 3. Attach the open function to the button's onClick event
                        onClick={()=>{
                          signupModal.open()
                        }}
                        className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition"
                        aria-label="Open Login Modal"
                    >
                    </button>

                    <span className="text-xs text-slate-400 hidden sm:block">
                        MVP · Photo or Features → Quiz
                    </span>
                </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-6">
        {children}
        <LoginModal/>
        <SignupModal/>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/80">
        <div className="mx-auto max-w-3xl px-4 py-4 text-xs text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} Lost Item Identifier</span>
          <span>For demo use only</span>
        </div>
      </footer>
    </div>
  );
}