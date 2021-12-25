import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!user?.isLoggedIn && (
            <>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </li>
            </>
          )}
          {user?.isLoggedIn && (
            <>
              <li>
                <Link href="/notes">
                  <a>Notes</a>
                </Link>
              </li>
              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault()
                    mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
                    router.push('/login')
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        header {
          padding: 0.2rem;
          background-color: #333;
        }

        ul {
          display: flex;
          list-style: none;
        }

        li {
          margin-right: 1rem;
        }

        a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </header>
  )
}
