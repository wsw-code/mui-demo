import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";




export async function POST(res: NextRequest) {
    try {
        const requestParams = await res.json();


        if (requestParams.username !== 'admin' || requestParams.password !== '12345678') {
            return NextResponse.json(
                { msg: "成功", code: -1, data: null, message: '账号/密码错误' },
                { status: 200 }
            );
        }

        const cookieStore = await cookies()
        // 3. 设置 Cookie
        cookieStore.set({
            name: 'auth_token',
            value: "我是一个token",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return NextResponse.json(
            { msg: "成功", code: 0, data: requestParams },
            { status: 200 }
        );
    } catch (error) {
        console.log(error, "error");
        return NextResponse.json({ error: "失败" }, { status: 200 });
    }
}


