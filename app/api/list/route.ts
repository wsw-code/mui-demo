import { NextRequest, NextResponse } from "next/server";
import { gameList } from '@/mock/gameList'



export async function GET(res: NextRequest) {
    try {
        return NextResponse.json(
            { msg: "成功", code: 0, data: gameList },
            { status: 200 }
        );
    } catch (error) {
        console.log(error, "error");
        return NextResponse.json({ error: "失败" }, { status: 200 });
    }
}
