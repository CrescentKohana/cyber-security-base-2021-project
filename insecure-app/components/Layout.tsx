import Header from 'components/Header'
import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Insecure Notes</title>
      </Head>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
            'Noto Color Emoji';
        }

        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  )
}
