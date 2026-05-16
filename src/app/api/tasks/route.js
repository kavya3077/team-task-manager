import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {

  try {

    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignedUser: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(tasks)

  } catch (error) {

    console.log('GET TASK ERROR:', error)

    return NextResponse.json(
      { message: 'Failed to fetch tasks' },
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

    console.log('TASK BODY:', body)

    const {
      title,
      description,
      dueDate,
      projectId,
      assignedTo
    } = body

    if (
      !title ||
      !description ||
      !dueDate ||
      !projectId ||
      !assignedTo
    ) {

      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),

        project: {
          connect: {
            id: projectId
          }
        },

        assignedUser: {
          connect: {
            id: assignedTo
          }
        }
      },

      include: {
        project: true,
        assignedUser: true
      }
    })

    return NextResponse.json(task)

  } catch (error) {

    console.log('CREATE TASK ERROR:', error)

    return NextResponse.json(
      { message: 'Task creation failed' },
      { status: 500 }
    )
  }
}