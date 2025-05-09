/* eslint-disable */
import { useState } from "react";
import Header from "../../components/header";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { localizedTextsMap } from "../../utils/localeTextTable";
import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  DialogContent,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import { Check, Close, Edit } from "@mui/icons-material";
import UsuarioService from "../../services/UsuarioService";
import CustomToolbar from "../../components/CustomMui/CustomToolbar";

const Usuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAction, setUserAction] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);
  // const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>();
  const { register, handleSubmit } = useForm();

  // salva os fitros da última pesquisa par serem usados ao atualizar lista
  const [savedFilters, setSavedFilters] = useState<any>();

  // colunas exibidas na lista
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "tipo_usuario",
      headerName: "Tipo Usuário",
      flex: 0.5,
    },
    {
      field: "editar",
      headerName: "Editar",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit index={params.row} />
          </div>
        );
      },
    },
    {
      field: "ativar_inativar",
      headerName: savedFilters?.status === true ? "Inativar" : "Ativar",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatAtive index={params.row} />
          </div>
        );
      },
    },
  ];

  // pesquisar usuários
  const pesquisar = (values: any) => {
    setUsuarios([]);
    setLoading(true);
    setSavedFilters(values);

    UsuarioService.listarUsuarios(values)
      .then((resp) => {
        setUsuarios(resp);
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ativar e inativar usuários
  const ativar_inativar = () => {
    setShowDialogConfirm(false);
    setLoading(true);
  };

  // Editar usuário
  const MatEdit = ({ index }: any) => {
    const handleEditClick = () => {
      navigate("/cadastrar-usuario", {
        state: index,
      });
    };

    return (
      <IconButton color="secondary" onClick={handleEditClick}>
        <Edit />
      </IconButton>
    );
  };

  // Coluna de ativar e inativar
  const MatAtive = ({ index }: any) => {
    const handleEditClick = () => {
      if (index.status === true) {
        setUserAction("Inativar");
        setShowDialogConfirm(true);
        // setUsuarioSelecionado(index);
      } else {
        setUserAction("Ativar");
        setShowDialogConfirm(true);
        // setUsuarioSelecionado(index);
      }
    };

    if (index.status == true) {
      return (
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <Close color="error" />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <Check color="success" />
        </IconButton>
      );
    }
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Usuários"
          subtitle="Gerencie os usuários e suas permissões 👥"
        />
        {isNonMobile && (
          <Box>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                marginRight: 1,
              }}
              disabled={loading}
              onClick={() => {
                document.getElementById("btn_filter")?.click();
              }}
            >
              <SearchIcon sx={{ mr: "10px" }} />
              Pesquisar
            </Button>

            <Link
              to={"/cadastrar-usuario"}
              style={{ textDecoration: "none", marginRight: 1 }}
            >
              <Button
                disabled={loading}
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <AddIcon sx={{ mr: "10px" }} />
                Novo
              </Button>
            </Link>
          </Box>
        )}
      </Box>
      {/*  */}

      {!isNonMobile && (
        <Box display="flex">
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginRight: 1,
            }}
            disabled={loading}
            onClick={() => {
              document.getElementById("btn_filter")?.click();
            }}
          >
            <SearchIcon sx={{ mr: "10px" }} />
            Pesquisar
          </Button>

          <Link
            to={"/cadastrar-usuario"}
            style={{ textDecoration: "none", marginRight: 1 }}
          >
            <Button
              disabled={loading}
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Novo
            </Button>
          </Link>
        </Box>
      )}

      {/* Filtros */}
      <Box m="40px 0 0 0" minHeight="5vh">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filtros</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Divider />

            <form id="form" onSubmit={handleSubmit(pesquisar)}>
              <button
                disabled={loading}
                id="btn_filter"
                type="submit"
                style={{ display: "none" }}
              />
              <Box
                display="grid"
                gap="30px"
                marginTop={2}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nome"
                  {...register("nome", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile ? (
                  <div style={{ gridColumn: "span 2" }}></div>
                ) : (
                  <></>
                )}

                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  {...register("email", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />

                {isNonMobile ? (
                  <div style={{ gridColumn: "span 2" }}></div>
                ) : (
                  <></>
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      {...register("status", {
                        required: false,
                      })}
                      name="status"
                    />
                  }
                  label="Ativo"
                />
              </Box>
            </form>
          </AccordionDetails>
        </Accordion>
      </Box>
      {/*  */}

      {/* Lista */}
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={usuarios}
          columns={columns}
          localeText={localizedTextsMap}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: isNonMobile,
                documento: isNonMobile,
                tipo_usuario: isNonMobile,
                visualizar: isNonMobile,
                ativar_inativar: isNonMobile,
              },
            },
          }}
          slots={isNonMobile ? { toolbar: () => CustomToolbar(columns) } : {}}
        />
      </Box>
      {/*  */}

      {/* Modal de Confirmação */}
      <Dialog
        open={showDialogConfirm}
        keepMounted
        onClose={() => {
          setShowDialogConfirm(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{userAction} Usuário</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja {userAction} este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => {
              setShowDialogConfirm(false);
            }}
          >
            Não
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              ativar_inativar();
            }}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
    </Box>
  );
};

export default Usuarios;
