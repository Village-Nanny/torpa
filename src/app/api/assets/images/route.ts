import { readdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), 'public/assets/images');
    const files = await readdir(imagesDir);
    const imageFiles = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
  }
}
