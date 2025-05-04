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
  useTheme,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../../context/auth";
import { Edit, Article } from "@mui/icons-material";
import AnaliseService from "../../services/AnaliseService";
import CustomToolbar from "../../components/CustomMui/CustomToolbar";
import PostInput from "../../components/PostInput";

const Analises = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [analises, setAnalises] = useState([]);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [analiseSelecionada, setAnaliseSelecionada] = useState<any>();

  // colunas exibidas na lista
  const columns: any = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "livro_titulo",
      headerName: "Livro",
      flex: 1,
      cellClassName: "nome-column--cell",
    },
    {
      field: "autor_nome",
      headerName: "Autor",
      flex: 1,
      cellClassName: "autor-column--cell",
    },
    {
      field: "analise",
      headerName: "Review",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatView index={params.row} />
          </div>
        );
      },
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

    AnaliseService.listarAnalises(values)
      .then((resp) => {
        setAnalises(resp);
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
      navigate("/cadastrar-analise", {
        state: index,
      });
    };

    return (
      <IconButton color="secondary" onClick={handleEditClick}>
        <Edit />
      </IconButton>
    );
  };

  // Visalizar Análise
  const MatView = ({ index }: any) => {
    const handleEditClick = () => {
      console.log("o que é isso? ", index);
      setAnaliseSelecionada(index);
      setOpen(true);
    };

    return (
      <IconButton color="secondary" onClick={handleEditClick}>
        <Article />
      </IconButton>
    );
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Análises Literárias"
          subtitle="Revisões feitas com muito carinho pela nossa equipe de curadoria ❤️️"
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
              onClick={() => {
                document.getElementById("btn_filter")?.click();
              }}
            >
              <SearchIcon sx={{ mr: "10px" }} />
              Pesquisar
            </Button>
            {user.tipoUsuario == "master" && (
              <Link
                to={"/cadastrar-analise"}
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
              to={"/cadastrar-analise"}
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
          rows={analises}
          columns={columns}
          rowCount={analises.length}
          localeText={localizedTextsMap}
          slots={isNonMobile ? { toolbar: () => CustomToolbar(columns) } : {}}
          initialState={{
            columns: {
              columnVisibilityModel: {
                editar: user.tipoUsuario == "master",
              },
            },
          }}
          loading={loading}
        />
      </Box>
      {/*  */}

      <Modal
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0, 0.2)",
          boxShadow: 24,
        }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            width: "80%",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <PostInput
            review={true}
            text={analiseSelecionada?.analise}
            setText={() => {}}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Analises;
