import { Note, PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(notesRoute, sessionOptions)

async function notesRoute(req: NextApiRequest, res: NextApiResponse<Note[]>) {
  const user = req.session.user

  if (!user?.id || !user.isLoggedIn) {
    res.status(401).end()
    return
  }

  const prisma = new PrismaClient()

  try {
    const notes = await prisma.note.findMany({ where: { authorId: user.id } })
    if (!notes) {
      res.status(403)
      return
    }

    res.json(notes)
  } catch (error) {
    res.status(200).json([])
  }
}
