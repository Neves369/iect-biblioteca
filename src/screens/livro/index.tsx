import { useContext, useState } from "react";
import Header from "../../components/header";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { localizedTextsMap } from "../../utils/localeTextTable";

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

import { DataGrid } from "@mui/x-data-grid";
import { CheckCircle, Close, Edit } from "@mui/icons-material";
import CustomToolbar from "../../components/CustomMui/CustomToolbar";
import { useForm } from "react-hook-form";
import LivroService from "../../services/LivroService";
import AuthContext from "../../context/auth";

const Livros = () => {
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [userAction, setUserAction] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  // salva os fitros da última pesquisa par sere usados ao atualizar lista
  const [savedFilters, setSavedFilters] = useState<any>();

  // colunas exibidas na lista
  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "titulo",
      headerName: "Título",
      flex: 1,
      cellClassName: "nome-column--cell",
    },
    {
      field: "autor",
      headerName: "Autor",
      flex: 1,
      cellClassName: "autor-column--cell",
    },
    {
      field: "ano",
      headerName: "Ano de Publicação",
      flex: 0.5,
      cellClassName: "ano-column--cell",
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

  // Pesquisar Produtos
  const pesquisar = (values: any) => {
    setLoading(true);
    setSavedFilters(values);

    LivroService.listarLivros()
      .then((resp) => {
        setLivros(resp);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Editar Produto
  const MatEdit = ({ index }: any) => {
    const handleEditClick = () => {
      navigate("/cadastrar-livro", {
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
      } else {
        setUserAction("Ativar");
        setShowDialogConfirm(true);
      }
    };

    return (
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={handleEditClick}
      >
        {index.status === true ? (
          <Close color="error" />
        ) : (
          <CheckCircle color="success" />
        )}
      </IconButton>
    );
  };

  // ativar e inativar produtos
  const ativar_inativar = () => {
    setShowDialogConfirm(false);
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Livros" subtitle="" />

        {isNonMobile && (
          <Box>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                marginRight: 1,
              }}
              onClick={() => {
                document.getElementById("btn_filter")?.click();
              }}
            >
              <SearchIcon sx={{ mr: "10px" }} />
              Pesquisar
            </Button>
            {user.tipoUsuario == "master" && (
              <Link
                to={"/cadastrar-livro"}
                style={{ textDecoration: "none", marginRight: 1 }}
              >
                <Button
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
            )}
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
            onClick={() => {
              document.getElementById("btn_filter")?.click();
            }}
          >
            <SearchIcon sx={{ mr: "10px" }} />
            Pesquisar
          </Button>
          <Link
            to={"/cadastrar-livro"}
            style={{ textDecoration: "none", marginRight: 1 }}
          >
            <Button
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
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Categoria"
                  {...register("categoria", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Código Interno"
                  {...register("codigo_interno", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Código Externo"
                  {...register("codigo_externo", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}

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
          rows={livros}
          columns={columns}
          rowCount={livros.length}
          localeText={localizedTextsMap}
          slots={isNonMobile ? { toolbar: () => CustomToolbar(columns) } : {}}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: isNonMobile,
                categoria: isNonMobile,
                editar: isNonMobile || user.tipoUsuario == "master",
                ativar_inativar: isNonMobile || user.tipoUsuario == "master",
              },
            },
          }}
          loading={loading}
        />
      </Box>
      {/*  */}

      {/* Confirmação */}
      <Dialog
        open={showDialogConfirm}
        keepMounted
        onClose={() => {
          setShowDialogConfirm(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{userAction} Livro</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja {userAction} este Livro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDialogConfirm(false);
            }}
          >
            Não
          </Button>
          <Button
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

export default Livros;
