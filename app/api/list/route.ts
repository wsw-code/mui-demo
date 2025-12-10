import { NextResponse } from "next/server";
import { gameList } from '@/mock/gameList'
import { delay } from "@/utils";



export async function GET() {
    try {
        await delay(500)
        return NextResponse.json(
            { msg: "成功", code: 0, data: gameList },
            { status: 200 }
        );
    } catch (error) {
        console.log(error, "error");
        return NextResponse.json({ error: "失败" }, { status: 200 });
    }
}
