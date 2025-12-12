// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

// POST 请求方式
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: '已退出登录', code: 0 },
      { status: 200 }
    );

    // 清除认证 cookie
    const authCookies = ['auth_token'];

    authCookies.forEach((cookieName) => {
      response.cookies.set({
        name: cookieName,
        value: '',
        expires: new Date(0),
        path: '/',
      });
    });

    // 添加安全头
    response.headers.set('Clear-Site-Data', '"cookies"');

    return response;
  } catch (error) {
    console.error('退出登录失败:', error);
    return NextResponse.json({ success: false, message: '退出登录失败' }, { status: 500 });
  }
}
