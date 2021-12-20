import { PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(notesRoute, sessionOptions)

async function notesRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user

  // Fix FLAW1 by uncommenting the following lines.
  // if (!user?.id || user.isLoggedIn === false) {
  //   res.status(401).end()
  //   return
  // }

  const prisma = new PrismaClient()

  try {
    if (req.method === 'GET') {
      const { id } = await req.body
      const note = await prisma.note.findUnique({
        where: { id },
      })
      if (note) {
        res.status(201).json(note)
      } else {
        res.status(404).json({ message: 'Not found' })
      }
      return
    }

    if (req.method === 'POST') {
      const { title, content } = await req.body
      if (!user?.id) {
        res.status(401).end()
        return
      }

      // Fix FLAW4 by uncommenting the following lines.
      // if (!title || !content || title.length === 0 || content.length === 0) {
      //   res.status(400).json({ message: 'Malformed request' })
      //   return
      // }

      const note = await prisma.note.create({
        data: {
          title,
          content,
          authorId: user.id,
        },
      })
      res.status(201).json(note)
      return
    }

    if (req.method === 'DELETE') {
      const { id } = await req.body
      const note = await prisma.note.delete({ where: { id } })
      res.status(200).json(note)
      return
    }

    res.status(405).json({ message: 'HTTP method not supported' })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}
