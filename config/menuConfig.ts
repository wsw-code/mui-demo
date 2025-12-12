import { MenuItem } from '@/type';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

/**
 * 左侧菜单配置
 */
export const menuConfigList = [
  {
    path: '/home',
    Icon: HomeIcon,
    label: '菜单1',
    menuKey: '0',
  },
  {
    path: '/game',
    Icon: SportsEsportsIcon,
    label: '菜单22',
    menuKey: '1',
  },
];

export const menuConfig2 = [
  {
    path: '/test',
    Icon: HomeIcon,
    label: 'Test',
    menuKey: '2-0',
  },
  {
    path: '/test2',
    Icon: SportsEsportsIcon,
    label: 'Test2',
    menuKey: '2-1',
  },
];

export const menuConfigList2 = [
  {
    path: '',
    Icon: HomeIcon,
    label: '菜单2',
    children: menuConfig2,
    menuKey: '2',
  },
];

export const menuList: MenuItem[][] = [menuConfigList, menuConfigList2];
