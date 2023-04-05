import { PrismaClient } from '@prisma/client'
import type { NextPage } from 'next'

const Home: NextPage<{ users: any[] }> = ({ users }) => {
  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()
  return {
    props: { users: JSON.parse(JSON.stringify(users)) }
  }
}

export default Home
