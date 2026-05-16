import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany()

    const total = tasks.length

    const completed = tasks.filter(
      task => task.status === 'DONE'
    ).length

    const pending = tasks.filter(
      task => task.status !== 'DONE'
    ).length

    const overdue = tasks.filter(task => {
      return (
        task.status !== 'DONE' &&
        new Date(task.dueDate) < new Date()
      )
    }).length

    return NextResponse.json({
      total,
      completed,
      pending,
      overdue
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Dashboard fetch failed' },
      { status: 500 }
    )
  }
}