import { Note } from '@prisma/client'
import Layout from 'components/Layout'
import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import Link from 'next/link'
import useSWR, { useSWRConfig } from 'swr'

export default function Notes() {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const { data } = useSWR<Note[]>(user?.isLoggedIn ? '/api/notes' : null)
  const { mutate } = useSWRConfig()

  const deleteNote = async (id: number) => {
    try {
      await fetchJson('/api/note', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
    } catch (error) {
      console.error('An unexpected error happened:', error)
      return
    }

    mutate('/api/notes', data ? data.filter((note: Note) => note.id !== id) : [], false)
  }

  return (
    <Layout>
      <h1>Notes</h1>
      <p>
        <Link href="/new">
          <a>Add new note</a>
        </Link>
      </p>

      {data &&
        data.map((note: Note) => (
          <div key={note.id}>
            <b>
              {note.id}: {note.title} <button onClick={() => deleteNote(note.id)}>Delete</button>
            </b>
            <p>{note.content}</p>
          </div>
        ))}
    </Layout>
  )
}
