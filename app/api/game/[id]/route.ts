// app/api/game/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { gameList } from '@/mock/gameList'
import { delay } from '@/utils';
// 模拟数据库


// GET /api/game/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await delay(500)

        // 验证 ID
        if (!id) {
            return NextResponse.json(
                { error: '游戏ID不能为空' },
                { status: 400 }
            );
        }

        // 查找游戏
        const game = gameList.find(g => g.id === id);

        if (!game) {
            return NextResponse.json(
                { error: '游戏不存在' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: game,
        });

    } catch (error) {
        console.error('获取游戏信息失败:', error);
        return NextResponse.json(
            { error: '服务器内部错误' },
            { status: 500 }
        );
    }
}