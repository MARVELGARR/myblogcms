import type { User } from "@/types/user"

type ErrorResponse = {
  message: string
  status: number
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const errorDetails: ErrorResponse = await res.json()
      throw new Error(errorDetails.message)
    }

    const result = await res.json()
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("Internal Error")
    }
  }
}

export const deleteUser = async (userId: string): Promise<ErrorResponse> => {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const errorDetails: ErrorResponse = await res.json()
      throw new Error(errorDetails.message)
    }

    const result = await res.json()
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("Internal Error")
    }
  }
}

export const updateUserRole = async (userId: string, role: "USER" | "ADMIN"): Promise<ErrorResponse> => {
  try {
    const res = await fetch(`/api/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    })

    if (!res.ok) {
      const errorDetails: ErrorResponse = await res.json()
      throw new Error(errorDetails.message)
    }

    const result = await res.json()
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("Internal Error")
    }
  }
}
