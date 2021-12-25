import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(notesRoute, sessionOptions)

async function notesRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user

  if (user?.id && user.isLoggedIn) {
    res.status(400).json({ message: 'Already registered.' })
    return
  }

  const prisma = new PrismaClient()

  try {
    if (req.method === 'POST') {
      const { username, password } = await req.body
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      // Fix FLAW2 by uncommenting the following lines.
      // const newUser = await prisma.user.create({
      //   data: { name: username, password: hash },
      // })

      // and by commenting the following 3 lines
      const newUser = await prisma.user.create({
        data: { name: username, password },
      })

      if (newUser) {
        const user = { isLoggedIn: true, name: newUser.name, id: newUser.id }
        req.session.user = user
        await req.session.save()
        res.status(201).json(user)
        return
      }

      res.status(400).json({ message: 'Unknown error' })
      return
    }

    res.status(405).json({ message: 'HTTP method not supported' })
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
}
