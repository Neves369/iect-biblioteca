import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
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
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { CheckCircle, Close } from "@mui/icons-material";
import CustomToolbar from "../../components/CustomMui/CustomToolbar";
import EmprestimoService from "../../services/EmprestimoService";

const Emprestimos = () => {
  const [loading, setLoading] = useState(false);
  const [userAction, setUserAction] = useState("");
  const [emprestimos, setEmprestimos] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

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
      headerName: "Finalizar",
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
  const pesquisar = () => {
    setLoading(true);

    EmprestimoService.listarEmprestimos()
      .then((resp) => {
        console.log(resp);
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
                pesquisar();
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
              pesquisar();
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
        <DialogTitle>{userAction} Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja {userAction} este perfil?
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
