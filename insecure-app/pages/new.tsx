import Layout from 'components/Layout'
import NoteForm from 'components/NoteForm'
import fetchJson, { FetchError } from 'lib/fetchJson'
import Router from 'next/router'
import { useState } from 'react'

export default function New() {
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <Layout>
      <div className="new">
        <NoteForm
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault()

            const body = {
              title: event.currentTarget.notetitle.value,
              content: event.currentTarget.notecontent.value,
            }

            try {
              await fetchJson('/api/note', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              })
              Router.push('/notes')
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
        .new {
          max-width: 30rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}
