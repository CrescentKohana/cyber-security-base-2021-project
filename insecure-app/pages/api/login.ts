import { PrismaClient } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from './user'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient()
  const { username, password } = await req.body

  try {
    const userRes = await prisma.user.findFirst({ where: { name: username, password: password } })
    if (!userRes) {
      res.status(403).json({ message: 'Incorrect username or password' })
      return
    }

    const user = { isLoggedIn: true, name: userRes.name, id: userRes.id } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
