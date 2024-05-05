'use client';
import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useState } from "react"
import { Button } from "../ui/button"

// TODO: Add a user button component that displays the user's name and other needed things and a sign out button
// TODO: When leaving the user button, the dropdown should close
const UserButton = () => {
  const user = useCurrentUser()
  const [open, setOpen] = useState(false)

  const signOutOnClick = () => {
    logout()
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  if (!user) return null

  return (
    <div className="relative">
      <Button onClick={toggleOpen} variant="secondary" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        {user.name} 🔑
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-50 bg-white rounded-md overflow-hidden shadow-xl z-10">
          <div className="">
            <div className="flex justify-between">
              <div className="block px-4 py-2 text-sm">{user.name}</div>
              <div className="block px-4 py-2 text-sm ">{user.role}</div>
            </div>
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{user.email}</div>
            <div className="border-t border-gray-100"></div>
            <Button onClick={signOutOnClick} type="submit" variant="ghost" size="lg" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full">
              Sign out
            </Button>
          </div>
        </div>
      )}
    </div>

  )
}

export default UserButton