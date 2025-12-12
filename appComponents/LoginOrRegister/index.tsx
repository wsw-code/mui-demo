"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Snackbar,
  TextField,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import Login from "@/appComponents/LoginOrRegister/Login";
import { useState } from "react";
import Register from "@/appComponents/LoginOrRegister/Register";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

export type Props = {
  onClose?: () => void;
  onOk?: () => void;
  type?: "login" | "register";
};

const CusTabPanel = styled(TabPanel)(({ theme }) => {
  return {
    paddingTop: "0px",
    paddingBottom: "0px",
    height: "100%",
  };
});

const Index = ({ onClose, onOk, type = "login" }: Props) => {
  const [status, setStatus] = useState<"login" | "register">(type);

  const toggle = () => {
    setStatus((pre) => (pre === "login" ? "register" : "login"));
  };

  return (
    <Box sx={{ height: "100%" }}>
      <TabContext value={status}>
        <CusTabPanel keepMounted value={"login"}>
          <Login setStatus={toggle} onClose={onClose} onOk={onOk} />
        </CusTabPanel>
        <CusTabPanel keepMounted value={"register"}>
          <Register setStatus={toggle} onClose={onClose} onOk={onOk} />
        </CusTabPanel>
      </TabContext>
    </Box>
  );
};

export default Index;
