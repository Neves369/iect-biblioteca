import { useContext, useState } from "react";
import Header from "../../components/header";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { localizedTextsMap } from "../../utils/localeTextTable";

import {
  Box,
  Modal,
  Button,
  Divider,
  Accordion,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../../context/auth";
import LivroService from "../../services/LivroService";
import CustomToolbar from "../../components/CustomMui/CustomToolbar";

// teste
const Livros = () => {
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [livroSelecionado, setLivroSelecionado] = useState<any>();

  // colunas exibidas na lista
  const columns: any = [
    // { field: "id", headerName: "ID", flex: 0.5 },
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
      field: "capa",
      headerName: "Capa",
      flex: 0.5,
      renderCell: (params: { value: string | undefined }) => (
        <img
          onClick={() => {
            setLivroSelecionado(params.value);
            setOpen(true);
          }}
          src={params.value}
          alt="livro"
          style={{
            width: "50px",
            height: "100%",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      field: "ano_publicacao",
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
  ];

  // Pesquisar Produtos
  const pesquisar = (values: any) => {
    setLoading(true);

    LivroService.listarLivros(values)
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
                  label="Título"
                  {...register("titulo", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Autor"
                  {...register("autor", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Ano de Publicação"
                  {...register("ano_publicacao", {
                    required: false,
                  })}
                  sx={{ gridColumn: "span 2" }}
                />
                {isNonMobile && <div style={{ gridColumn: "span 2" }}></div>}
              </Box>
            </form>
          </AccordionDetails>
        </Accordion>
      </Box>
      {/*  */}

      {/* Lista */}
      <Box m="40px 0 0 0" minHeight="75vh">
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
                capa: isNonMobile,
                ano_publicacao: isNonMobile,
                editar: user.tipoUsuario == "master",
                ativar_inativar: isNonMobile && user.tipoUsuario == "master",
              },
            },
          }}
          loading={loading}
        />
      </Box>
      {/*  */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "rgba(0,0,0, 0.2)",
            boxShadow: 24,
            borderRadius: "10px",
          }}
        >
          <img
            src={livroSelecionado}
            alt="livro"
            style={{
              width: "400px",
              height: "500px",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Livros;
