import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggler } from "./ThemeToggler"

const Header = () => {
  return <header className="flex items-center fixed top-0 left-0 w-full z-50 backdrop:filter backdrop-blur-md justify-between shadow-md shadow-slate-400 dark:shadow-gray-600 p-2">
    <Link href='/' className="flex items-center gap-1">
      <Image src='/next-logo.png' className=" invert" alt='logo' width={50} height={50} />
      <h2 className="text-lg text-orange-300">Box</h2>
    </Link>
    <div className="px-4 flex gap-x-4 items-center">
      <ThemeToggler />

      <UserButton afterSignOutUrl="/" />

      <SignedOut>
        <SignInButton afterSignInUrl="/dashboard" mode="modal" />
      </SignedOut>
    </div>
  </header>
}

export default Header