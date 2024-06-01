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
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { useCurrentRole } from "@/hooks/use-current-role";
import { MdAdminPanelSettings } from "react-icons/md";


// TODO: Add a user button component that displays the user's name and other needed things and a sign out button
// TODO: When leaving the user button, the dropdown should close
const UserButton = () => {
  const user = useCurrentUser();
  const role = useCurrentRole();

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
        <DropdownMenuContent>
          <DropdownMenuLabel>{truncate(user.email ?? '', 16)}</DropdownMenuLabel>
          <DropdownMenuLabel>{role}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role === 'ADMIN' && (
            <DropdownMenuItem>
              <MdAdminPanelSettings className="size-[20px] mr-2" />
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <FaUserAstronaut className="size-4 mr-2" />
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GearIcon className="size-4 mr-2" />
            <Link href="/settings">
              Settings
            </Link>
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