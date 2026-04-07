// import { ClientProvider } from "@/hooks/client-provider";
import React from "react";

export const metadata = {
  title: "Pat Stat Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    //   <ClientProvider>
      <main>
        {children}
      </main>
      
    //   </ClientProvider>



  );
}
