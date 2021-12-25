import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from './user'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient()
  const { username, password } = await req.body

  try {
    // Fix FLAW2 partially by removing `, password: password` from the following line.
    const userRes = await prisma.user.findFirst({ where: { name: username, password: password } })
    if (!userRes) {
      // Let's not tell the user that which one is wrong for security.
      res.status(403).json({ message: 'Incorrect username or password' })
      return
    }

    bcrypt.compare(password, userRes?.password, function (err, result) {
      // Finally, uncomment following lines to fix FLAW2.
      // if (!result) {
      //   res.status(403).json({ message: 'Incorrect username or password' })
      //   return
      // }
    })

    const user = { isLoggedIn: true, name: userRes.name, id: userRes.id } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
