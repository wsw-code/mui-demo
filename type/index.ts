


export type GameItem = {
    /**游戏ID */
    id: string;
    /**
     * 游戏名称
     */
    name: string;
    /**
     * 游戏ICON图
     */
    iconUrl: string;
    tagList: string[]
}


export type MenuItem = {
    path: string,
    Icon: any,
    label: string,
    children?: MenuItem[],
    menuKey: string
}