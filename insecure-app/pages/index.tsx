import Layout from 'components/Layout'
import useUser from 'lib/useUser'

export default function Home() {
  const { user } = useUser()

  return (
    <Layout>
      <h1>Insecure note app</h1>

      {user?.isLoggedIn && (
        <p>
          Welcome back <b>{user.name}</b>!
        </p>
      )}

      <p>This app has multiple vulnerabilities and flaws by design.</p>

      <h2>Features</h2>
      <ul>
        <li>Login and logout</li>
        <li>List notes</li>
        <li>Add note</li>
        <li>Delete note</li>
      </ul>
    </Layout>
  )
}
