import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { localizedTextsMap } from "../../utils/localeTextTable";

import {
  Box,
  Button,
  DialogContent,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { CheckCircle, Close } from "@mui/icons-material";
import CustomToolbar from "../../components/CustomMui/CustomToolbar";
import EmprestimoService from "../../services/EmprestimoService";
import { useForm } from "react-hook-form";

const Emprestimos = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [emprestimos, setEmprestimos] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [savedFilters, setSavedFilters] = useState<any>();
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);
  const [emprestimoSelecionado, setEmprestimoSelecionado] = useState<any>();

  // colunas exibidas na lista
  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "usuario_nome",
      headerName: "Usuário",
      flex: 1,
      cellClassName: "usuario-column--cell",
    },
    {
      field: "livro_titulo",
      headerName: "Livro",
      flex: 1,
      cellClassName: "livro-column--cell",
    },
    {
      field: "data_emprestimo",
      headerName: "Data Empréstimo",
      flex: 1,
      cellClassName: "emprestimo-column--cell",
    },
    {
      field: "data_devolucao",
      headerName: "Data Devolução",
      flex: 1,
      cellClassName: "devolucao-column--cell",
    },
    {
      field: "finalizar",
      headerName: savedFilters?.status === true ? "Finalizar" : "Finalizado",
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

    EmprestimoService.listarEmprestimos(values)
      .then((resp) => {
        setEmprestimos(resp);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Coluna de ativar e inativar
  const MatAtive = ({ index }: any) => {
    const handleEditClick = () => {
      if (index.data_devolucao === null) {
        setShowDialogConfirm(true);
        setEmprestimoSelecionado(index);
      }
    };

    return (
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={handleEditClick}
      >
        {index.data_devolucao !== null ? (
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

    EmprestimoService.finalizarEmprestimo(emprestimoSelecionado.id)
      .then((resp) => {
        setEmprestimos(resp);
        pesquisar(savedFilters);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Empréstimos" subtitle="" />

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
            <Link
              to={"/cadastrar-emprestimo"}
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
            to={"/cadastrar-emprestimo"}
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
                  label="Nome do Usuário"
                  {...register("usuario", {
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
                  type="text"
                  label="Título do Livro"
                  {...register("livro", {
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
          rows={emprestimos}
          columns={columns}
          rowCount={emprestimos.length}
          localeText={localizedTextsMap}
          slots={isNonMobile ? { toolbar: () => CustomToolbar(columns) } : {}}
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
        <DialogTitle>Finalizar Empréstimo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja finalizar este empréstimo?
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

export default Emprestimos;
