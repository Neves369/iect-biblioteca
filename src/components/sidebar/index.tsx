import logo from "../../assets/logocg.webp";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { checkDevice } from "../../utils/checkDevice";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const SidebarCustom = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, signOutClearAll } = useContext(AuthContext);

  const Item = ({ title, to, icon, selected, setSelected }: any) => {
    return (
      <MenuItem
        active={selected === title}
        onClick={() => {
          setSelected(title), navigate(to);
        }}
        style={{
          backgroundColor: selected === title ? "rgba(200,200,200,0.2)" : "",
        }}
        icon={isCollapsed && selected === title ? "" : icon}
      >
        {!isCollapsed && (
          <Typography fontSize={16} fontWeight={600}>
            {title}
          </Typography>
        )}
        {selected === title && (
          <ArrowCircleRightIcon
            fontSize="large"
            style={{ position: "absolute", right: 20, top: 7 }}
          />
        )}
      </MenuItem>
    );
  };

  return (
    <Box display={checkDevice() === true ? "none" : "block"}>
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: "10px 0 0 0",
            }}
          >
            <Box display="flex" sx={{ gap: 3 }} alignItems="center" ml="10px">
              <img style={{ width: 25 }} src={logo} alt="logo" />
              <Typography fontSize={16} fontWeight={"bold"}>
                BIBLIOTECA IECT
              </Typography>
            </Box>
          </MenuItem>

          <Box style={{ borderTop: "1px solid lightgray", marginTop: 28 }}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardIcon fontSize="medium" />}
              selected={selected}
              setSelected={setSelected}
            />

            {user.tipoUsuario == "master" && (
              <Item
                title="Empréstimos"
                to="/emprestimos"
                icon={<SwapHorizIcon fontSize="medium" />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <Item
              title="Livros"
              to="/livros"
              icon={<MenuBookIcon fontSize="medium" />}
              selected={selected}
              setSelected={setSelected}
            />

            {user.tipoUsuario == "master" && (
              <Item
                title="Usuários"
                to="/usuarios"
                icon={<PeopleOutlinedIcon fontSize="medium" />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </Box>
        </Menu>

        <Box display={"flex"} position="fixed" sx={{ bottom: 30 }}>
          <LogoutIcon
            onClick={() => {
              signOutClearAll();
              navigate("/");
            }}
            sx={{
              marginLeft: !isCollapsed ? 5 : 2,
              backgroundColor: "black",
              alignSelf: "center",
              height: 50,
              width: 50,
              padding: 2,
              borderRadius: 8,
              color: "white",
            }}
          />
          {!isCollapsed && (
            <Typography
              marginTop={2}
              marginLeft={1}
              variant="h5"
              fontWeight="600"
            >
              Sair
            </Typography>
          )}
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SidebarCustom;
