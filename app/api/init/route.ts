import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST() {
  try {
    await delay(1000);
    const cookieStore = await cookies();
    const userData = cookieStore.get('auth_token') as {};

    return NextResponse.json(
      {
        msg: '初始化成功',
        code: 0,
        data: userData ? { user: userData, info: { value: '初始化的其他信息.....' } } : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, 'error');
    return NextResponse.json({ error: '失败' }, { status: 200 });
  }
}
