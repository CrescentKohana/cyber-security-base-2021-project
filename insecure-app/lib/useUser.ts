import Router from 'next/router'
import { User } from 'pages/api/user'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function useUser({ redirectTo = '', redirectIfFound = false, register = false } = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

  useEffect(() => {
    if (!redirectTo || !user) {
      return
    }

    if (register && user?.isLoggedIn) {
      Router.push(redirectTo)
    }

    if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) || (redirectIfFound && user?.isLoggedIn)) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
