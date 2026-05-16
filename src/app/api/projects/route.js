import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {

    const projects = await prisma.project.findMany({
      include: {
        tasks: true
      }
    })

    return NextResponse.json(projects)

  } catch (error) {


    return NextResponse.json(
      { message: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(req) {

  try {

    const session = await getServerSession(authOptions)


    if (!session || session.user.role !== 'ADMIN') {

      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      )
    }

    const body = await req.json()

    console.log('BODY:', body)

    const { title, description } = body

    const project = await prisma.project.create({
      data: {
        title,
        description
      }
    })

    return NextResponse.json(project)

  } catch (error) {


    return NextResponse.json(
      { message: 'Project creation failed' },
      { status: 500 }
    )
  }
}