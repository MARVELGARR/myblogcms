import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, deleteUser, updateUserRole } from "@/lib/actions/user-actions"

export const useGetUsers = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  })

  return {
    users,
    isLoadingUsers,
    isUsersError,
  }
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteUserMutation, isPending: isDeletingUser } = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    deleteUser: deleteUserMutation,
    isDeletingUser,
  }
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateUserRoleMutation, isPending: isUpdatingUserRole } = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: "USER" | "ADMIN" }) => updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    updateUserRole: updateUserRoleMutation,
    isUpdatingUserRole,
  }
}
