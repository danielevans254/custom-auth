'use client'

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FaUser } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl">Profile Page</h1>
        </div>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
}

export default ProfilePage;