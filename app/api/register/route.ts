import { NextRequest, NextResponse } from "next/server";




export async function POST(res: NextRequest) {
    try {
        const requestParams = await res.json();
        return NextResponse.json(
            { msg: "成功", code: 0, data: requestParams },
            { status: 200 }
        );
    } catch (error) {
        console.log(error, "error");
        return NextResponse.json({ error: "失败" }, { status: 200 });
    }
}


