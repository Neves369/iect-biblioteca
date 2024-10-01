import { useContext, useState } from "react";
import InputBase from "@mui/material/InputBase";
import { Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AuthContext from "../../context/auth";
import { checkDevice } from "../../utils/checkDevice";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, signOutClearAll } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="5px" sx={{ flex: 1 }}>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ flex: 1 }} placeholder="Pesquisar" />
      </Box>

      {/* TOPBAR LADO DIREITO WEB*/}
      <Box
        display={checkDevice() === true ? "none" : "flex"}
        justifyContent={"flex-end"}
        sx={{ ml: 5, flex: 1 }}
      >
        <IconButton>
          <Avatar sx={{ bgcolor: "#6b6b6b" }}>
            {user.nome.substring(0, 1).toUpperCase()}
          </Avatar>
        </IconButton>
      </Box>

      {/* TOPBAR LADO DIREITO MOBILE*/}
      <Box
        display={checkDevice() ? "flex" : "none"}
        justifyContent={"flex-end"}
        sx={{ ml: 5, flex: 1 }}
      >
        <IconButton>
          <MenuIcon
            id="menu"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e: any) => handleClick(e)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/dashboard"), handleClose();
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/livros"), handleClose();
              }}
            >
              Livros
            </MenuItem>
            {user.tipoUsuario == "master" && (
              <MenuItem
                onClick={() => {
                  navigate("/emprestimos"), handleClose();
                }}
              >
                Emprestimos
              </MenuItem>
            )}
            {user.tipoUsuario == "master" && (
              <MenuItem
                onClick={() => {
                  navigate("/usuarios"), handleClose();
                }}
              >
                Usuários
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                signOutClearAll(), handleClose();
              }}
            >
              Sair
            </MenuItem>
          </Menu>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
