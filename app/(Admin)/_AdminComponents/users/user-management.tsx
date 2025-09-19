"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserDataTable } from "./user-data-table"
import { userTableColumns } from "./user-table-columns"
import { Skeleton } from "@/components/ui/skeleton"
import DeleteUserAlert from "./delete-user-alert"
import { useGetUsers } from "../../_AdminHooks/AdminUserHooks/use-users"

const UserManagement = () => {
  const { users, isLoadingUsers, isUsersError } = useGetUsers()

  if (isLoadingUsers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage your application users and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[300px]" />
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-[100px]" />
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isUsersError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage your application users and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Failed to load users. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage your application users and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserDataTable columns={userTableColumns} data={users || []} />
        </CardContent>
      </Card>
      <DeleteUserAlert />
    </>
  )
}

export default UserManagement
