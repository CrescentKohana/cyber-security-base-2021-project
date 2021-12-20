import { FormEvent } from 'react'

export default function NoteForm({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <b>Title</b>
        <input type="text" name="notetitle" required />
      </label>
      <label>
        <b>Content</b>
        <textarea style={{ height: '100px', resize: 'none', marginBottom: '20px' }} name="notecontent" required />
      </label>

      <button type="submit">Save note</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }

        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  )
}
