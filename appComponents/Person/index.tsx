"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import { Avatar } from "@mui/material";
import useUserStore from "@/store/user";
import Register from "@/appComponents/LoginOrRegister/Register";
import Login from "@/appComponents/LoginOrRegister/Login";
import React from "react";
import { getPath } from "@/utils";
import { useRequest } from "ahooks";
import { ModalApi, modalManager } from "@/appComponents/LoginOrRegister/GlobalModal";
import LoginOrRegister from "@/appComponents/LoginOrRegister";

const Index = () => {
  const { user, setUser } = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading, run } = useRequest(
    async () => {
      const res = await fetch(getPath("/api/logout"), {
        method: "POST",
      });
      const { code, data, message } = await res.json();
      if (code === 0) {
        setAnchorEl(null);
        setUser(null);
        location.reload();
      } else {
        console.log(message);
      }
    },
    { manual: true }
  );

  return (
    <Box>
      {user ? (
        <>
          <Box
            onClick={handleClick}
            id="avator"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar alt="用户头像" />
            {user.name}
          </Box>

          <Menu
            slotProps={{
              list: {
                "aria-labelledby": "avator",
              },
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#3a4c58",
                color: "#fff",
                // 更多样式
                borderRadius: "8px",
              },
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: "#4a5c68",
                },
                "&.Mui-selected": {
                  backgroundColor: "#4a5c68",
                },
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              handleClose();
            }}
          >
            <MenuItem
              onClick={() => {
                localStorage.removeItem("store-data");
                run();
              }}
            >
              退出登陆
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#2f4553",
              fontWeight: 600,
            }}
            onClick={() => {
              const id = ModalApi.show({
                content: (
                  <LoginOrRegister
                    onClose={() => {
                      modalManager.destroy(id);
                    }}
                  />
                ),
              });
            }}
          >
            登陆
          </Button>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#1475e1",
              fontWeight: 600,
            }}
            onClick={() => {
              const id = ModalApi.show({
                content: (
                  <LoginOrRegister
                    type="register"
                    onClose={() => {
                      modalManager.destroy(id);
                    }}
                  />
                ),
              });
            }}
          >
            注册
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;
