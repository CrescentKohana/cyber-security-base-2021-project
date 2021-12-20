import pkg from '@prisma/client'

const { PrismaClient } = pkg
const prisma = new PrismaClient({})

async function main() {
  await prisma.user.create({
    data: {
      name: 'akiha',
      password: 'vermillion',
      notes: {
        create: [
          {
            title: 'Just a note',
            content: 'and its content',
          },
          {
            title: 'Reminder',
            content: 'do not forget this',
          },
        ],
      },
    },
  })

  await prisma.user.create({
    data: {
      name: 'arcueid',
      password: 'redblood',
      notes: {
        create: [
          {
            title: 'Hello world',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a orci sem.',
          },
        ],
      },
    },
  })
}

main()
console.log('Default data added.')
