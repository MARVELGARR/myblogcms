"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { useState } from "react"
import UserManagement from "../../_AdminComponents/users/user-management"

export default function Home() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your user management dashboard.</p>
          </div>
          <UserManagement />
        </div>
      </main>
      <Toaster />
    </QueryClientProvider>
  )
}
