'use client';
import { logout } from "@/actions/logout"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { FaUser, FaUserAstronaut, FaUserCircle } from "react-icons/fa";
import { MdDoorBack } from "react-icons/md";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";


// TODO: Add a user button component that displays the user's name and other needed things and a sign out button
// TODO: When leaving the user button, the dropdown should close
const UserButton = () => {
  const user = useCurrentUser();

  const signOutOnClick = () => {
    logout()
  }

  function truncate(str: string | undefined, num: number) {
    return str && str.length > num ? str.slice(0, num) + "..." : str;
  }

  if (!user) return null;

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full mr-2 ">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-700">
              <FaUser className="size-1/2 text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>{truncate(user.email ?? '', 16)}</DropdownMenuLabel>
          <DropdownMenuLabel>{user.role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FaUserAstronaut className="size-4 mr-2" />
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GearIcon className="size-4 mr-2" />
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOutOnClick} className="cursor-pointer">
            <ExitIcon className="size-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

  )
}

export default UserButton