/* eslint-disable react-refresh/only-export-components */
import { memo, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { checkDevice } from "../../utils/checkDevice";
import {
  Box,
  Menu,
  Badge,
  Avatar,
  MenuItem,
  useTheme,
  IconButton,
  Typography,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { ColorModeContext } from "../../theme";
import EmprestimoService from "../../services/EmprestimoService";
import moment from "moment";

const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const [notificacoes, setNotificacoes] = useState([]);
  const { user, signOutClearAll } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const getNotificacoes = async () => {
    EmprestimoService.listarEmprestimosVencendo(user)
      .then((resp) => {
        setNotificacoes(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNotificacoes();
  }, []);

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
          <Badge badgeContent={notificacoes.length} color="error">
            <NotificationsOutlined onClick={(e: any) => handleClick2(e)} />
          </Badge>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "menu",
          }}
        >
          {notificacoes?.length > 0 ? (
            notificacoes?.map((element: any) => (
              <MenuItem
                sx={{ color: "red" }}
                key={element.id}
                onClick={() => {}}
              >
                {user.tipoUsuario == "master"
                  ? `${element.usuario_nome} - ${
                      element.livro_titulo
                    } vence em ${moment(element.previsao_devolucao).format(
                      "DD/MM/YYYY"
                    )}.`
                  : `Atenção, seu empréstimo vence em ${moment(
                      element.previsao_devolucao
                    ).format("DD/MM/YYYY")}`}
              </MenuItem>
            ))
          ) : (
            <Typography sx={{ padding: 1 }} color="#ADADAD" fontSize={16}>
              Não há notificações no momento
            </Typography>
          )}
        </Menu>

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>

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
            {user.tipoUsuario == "master" && (
              <MenuItem
                onClick={() => {
                  navigate("/emprestimos"), handleClose();
                }}
              >
                Emprestimos
              </MenuItem>
            )}
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
                  navigate("/usuarios"), handleClose();
                }}
              >
                Usuários
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                navigate("/analises"), handleClose();
              }}
            >
              Análises
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/contate-nos"), handleClose();
              }}
            >
              Contate-nos
            </MenuItem>

            <MenuItem
              onClick={() => {
                signOutClearAll(), navigate("/"), handleClose();
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

export default memo(Topbar);
