import { logout } from '@/features/profile/actions/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const queryClinet = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['profile'],
    mutationFn: logout,
    onSettled: () => {
      queryClinet.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  return {
    mutate,
  }
}
