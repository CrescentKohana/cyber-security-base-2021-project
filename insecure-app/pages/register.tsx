import Layout from 'components/Layout'
import UserForm from 'components/UserForm'
import fetchJson, { FetchError } from 'lib/fetchJson'
import useUser from 'lib/useUser'
import { useState } from 'react'

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
    register: true,
  })

  const [errorMsg, setErrorMsg] = useState('')

  return (
    <Layout>
      <div className="login">
        <UserForm
          register
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault()

            const body = {
              username: event.currentTarget.username.value,
              password: event.currentTarget.password.value,
            }

            try {
              mutateUser(
                await fetchJson('/api/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body),
                })
              )
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message)
              } else {
                console.error('An unexpected error happened:', error)
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 20rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}
