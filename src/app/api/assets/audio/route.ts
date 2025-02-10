import { readdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const audioDir = join(process.cwd(), 'public/assets/audio');
    const files = await readdir(audioDir);
    const audioFiles = files.filter(file => file.endsWith('.wav') || file.endsWith('.mp3'));

    return NextResponse.json(audioFiles);
  } catch (error) {
    console.error('Error reading audio directory:', error);
    return NextResponse.json({ error: 'Failed to read audio files' }, { status: 500 });
  }
}
