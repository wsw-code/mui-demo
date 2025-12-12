'use client';

import { MenuItem } from '@/type';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
  menuList: MenuItem[][];
  open: boolean;

  showText?: boolean;
  onExpandChange?: () => void;
  expand?: string[];
  setExpand?: (val: string[]) => void;
};

function buildPathMap(items: MenuItem[], parentPath: string[] = []): Map<string, string[]> {
  let map = new Map<string, string[]>();

  items.forEach((item, index) => {
    const pathList = [...parentPath, item.menuKey];

    map.set(item.menuKey, pathList);
    map.set(item.path, pathList);
    // 递归处理子项
    if (item.children) {
      map = new Map([...buildPathMap(item.children, [...pathList]), ...map]);
    }
  });

  return map;
}

const Index = ({
  open,
  menuList,
  showText = true,
  onExpandChange,
  expand = [],
  setExpand,
}: Props) => {
  const router = useRouter();

  const pathname = usePathname();

  const menuMap = useMemo(() => {
    return buildPathMap(menuList.flat());
  }, [menuList]);

  useEffect(() => {
    if (!open) {
      setExpand?.([]);
    }
  }, [open]);

  return (
    <Box sx={{ padding: '16px' }}>
      <Box
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          ...(open ? { background: '#1a2c38' } : {}),
        }}
      >
        <List>
          {menuList.map((item, itemIndex) => {
            return (
              <React.Fragment key={itemIndex}>
                {item.map((el) => (
                  <React.Fragment key={el.path}>
                    <ListItem key={el.path} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        selected={pathname === el.path}
                        onClick={() => {
                          if (el.path) {
                            router.push(el.path);
                          }
                          if (el.children) {
                            const expandList = menuMap.get(el.menuKey);
                            if (expandList) {
                              onExpandChange?.();
                              if (expandList.every((el) => expand.includes(el))) {
                                setExpand?.([]);
                              } else {
                                setExpand?.(expandList);
                              }
                            }
                          }
                        }}
                        sx={[
                          {
                            minHeight: 48,
                            position: 'relative',
                          },
                          open ? { ustifyContent: 'initial' } : {},
                        ]}
                      >
                        <ListItemIcon
                          sx={[
                            {
                              minWidth: 0,
                              justifyContent: 'center',
                              color: '#fff',
                            },
                            open ? { mr: 3 } : { mr: 'auto' },
                          ]}
                        >
                          {React.createElement(el.Icon)}
                        </ListItemIcon>

                        {showText && (
                          <ListItemText
                            primary={el.label}
                            sx={[
                              !open && { opacity: 0 },
                              {
                                whiteSpace: 'nowrap',
                              },
                            ]}
                          />
                        )}

                        {el.children &&
                          open &&
                          (expand?.includes(el.menuKey) ? <ExpandLess /> : <ExpandMore />)}
                        {el.children && !open && (
                          <ListItemIcon
                            sx={[
                              {
                                minWidth: 0,
                                justifyContent: 'center',
                                color: '#fff',
                              },
                            ]}
                          >
                            <KeyboardArrowRightIcon sx={{ fontSize: '12px' }} />
                          </ListItemIcon>
                        )}
                      </ListItemButton>
                    </ListItem>
                    {el.children && (
                      <Collapse
                        in={expand.includes(el.menuKey)}
                        sx={{ paddingLeft: '20px' }}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List
                          sx={{
                            borderTopLeftRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          {el.children.map((cell, cellIndex) => (
                            <ListItem
                              key={cell.path}
                              disablePadding
                              sx={{ display: 'block', borderLeft: '2px solid #2f4553' }}
                            >
                              <ListItemButton
                                selected={pathname === cell.path}
                                onClick={() => {
                                  router.push(cell.path);
                                  // setExpand(pre => !pre)
                                }}
                                sx={[
                                  {
                                    minHeight: 48,
                                    // px: 2.5,
                                  },
                                  open
                                    ? {
                                        justifyContent: 'initial',
                                      }
                                    : {
                                        justifyContent: 'center',
                                      },
                                ]}
                              >
                                <ListItemIcon
                                  sx={[
                                    {
                                      minWidth: 0,
                                      justifyContent: 'center',
                                      color: '#fff',
                                    },
                                    open
                                      ? {
                                          mr: 3,
                                        }
                                      : {
                                          mr: 'auto',
                                        },
                                  ]}
                                >
                                  {cellIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                {showText && (
                                  <ListItemText
                                    primary={cell.label}
                                    sx={[!open && { opacity: 0 }]}
                                  />
                                )}

                                {/* {expand ? <ExpandLess /> : <ExpandMore />} */}
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                ))}

                {itemIndex < menuList.length - 1 && (
                  <ListItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                    }}
                  >
                    <Divider sx={{ width: '100%', height: '2px' }} />
                  </ListItem>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Index;
