'use client';

import { Card, CardContent } from "@/components/ui/card";

// TODO: Add the needed data to the admin page, which can only be accessed by the admin
const AdminPage = () => {
  // TODO: Create things here that only the admin can see, or do
  const onApiClick = async () => {
    const response = await fetch('/api/admin');
    console.log(response);
  }

  return (
    <div className="">
      Hello
    </div>
  );
}

export default AdminPage;