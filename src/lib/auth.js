import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },

        password: {
          label: 'Password',
          type: 'password'
        }
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          throw new Error('User not found')
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.role = user.role
      }

      return token
    },

    async session({ session, token }) {

      session.user = {
        ...session.user,
        role: token.role
      }

      return session
    }
  },

  session: {
    strategy: 'jwt'
  },

  trustHost: true,

  secret: process.env.NEXTAUTH_SECRET
}