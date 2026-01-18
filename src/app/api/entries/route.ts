import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TimeEntry {
  hours: number;
}

export async function GET() {
  const entries = await prisma.timeEntry.findMany({
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, project, hours, description } = body;

    if (!date || !project || !hours || !description) {
      return NextResponse.json({ error: "Всі поля обов'язкові" }, { status: 400 });
    }

    const h = parseFloat(hours);
    if (h <= 0) {
      return NextResponse.json({ error: "Години мають бути позитивним числом" }, { status: 400 });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingEntries = await prisma.timeEntry.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay }
      }
    });

    const totalHours = existingEntries.reduce((sum: number, entry: TimeEntry) => sum + entry.hours, 0);

    if (totalHours + h > 24) {
      return NextResponse.json({ error: "Максимум 24 години на добу!" }, { status: 400 });
    }

    const newEntry = await prisma.timeEntry.create({
      data: { 
        date: new Date(date), 
        project, 
        hours: h, 
        description 
      }
    });

    return NextResponse.json(newEntry);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID не надано" }, { status: 400 });
    }

    await prisma.timeEntry.delete({
      where: { id: id }
    });

    return NextResponse.json({ message: "Запис видалено" });
  } catch (e) {
    return NextResponse.json({ error: "Не вдалося видалити запис" }, { status: 500 });
  }
}