import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(req, { params }) {
  try {
    const body = await req.json()

    const { status } = body

    const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE']

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      )
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: params.id
      },
      data: {
        status
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update task' },
      { status: 500 }
    )
  }
}