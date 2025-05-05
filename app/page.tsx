'use client';

import LoginPage from "./(auth)/login/page";
import { cookies } from "next/headers";
import { useState } from "react";

export default  async function Home() {
  
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  const [showCookieBanner, setShowCookieBanner] = useState(false);

  return <div className="bg-background w-screen h-screen">
    <LoginPage/>
    { showCookieBanner}</div>;

  
}
