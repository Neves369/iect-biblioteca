import { useForm } from "react-hook-form";
import Header from "../../../components/header";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import AuthContext from "../../../context/auth";
import PostInput from "../../../components/PostInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import LivroService from "../../../services/LivroService";
import { useLocation, useNavigate } from "react-router-dom";
import AnaliseService from "../../../services/AnaliseService";

const CadastrarAnalise = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (state) {
      setValue("livro_id", state.livro_id);
      setText(state.analise);
    } else {
      pesquisarLivros();
    }
  }, [setValue, state]);

  const salvar = async (values: any) => {
    setLoading(true);

    const analise = {
      livro_id: values.livro_id,
      analise: text,
      autor: user.id,
    };

    AnaliseService.salvarAnalise(analise)
      .then((resp: any) => {
        if (resp == "201") {
          window.alert("Análise cadastrada com sucesso!");
          setTimeout(() => {
            navigate("/analises");
          }, 1000);
        } else {
          window.alert("Erro ao cadastrar Análise!");
        }
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editar = async (values: any) => {
    setLoading(true);

    const analise = {
      livro_id: values.livro_id,
      analise: text,
      autor: state.autor_id,
    };

    AnaliseService.editarAnalise(analise, state.id)
      .then((resp: any) => {
        if (resp == "204") {
          window.alert("Análise editada com sucesso!");
          setTimeout(() => {
            navigate("/analises");
          }, 1000);
        } else {
          window.alert("Erro ao editar Análise!");
        }
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const livroSelecionado: any = livros.find(
    (livro: any) => livro.id === watch("livro_id")
  );

  const pesquisarLivros = () => {
    LivroService.listarLivros({})
      .then((resp) => {
        setLivros(resp);
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  return (
    <Box m="20px">
      <Header
        title={state ? "Editar Análise" : "Cadastrar Análise"}
        subtitle={state ? `Livro ID ${state.livro_titulo}` : ""}
      />

      <form onSubmit={handleSubmit(state ? editar : salvar)}>
        <Box
          display="flex"
          flexDirection={isNonMobile ? "row" : "column"}
          alignItems={isNonMobile ? "flex-start" : "center"}
          gap="30px"
        >
          {/* Imagem */}
          {livros.find((livro: any) => livro.id === watch("livro_id")) && (
            <Box
              sx={{
                width: isNonMobile ? "200px" : "100%", // Largura ajustável
                display: "flex",
                justifyContent: "center", // Centraliza no mobile
              }}
            >
              <img
                src={livroSelecionado?.capa}
                alt="Capa do Livro"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "15px",
                }}
              />
            </Box>
          )}

          {/* formulário */}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
              width: "100%",
            }}
          >
            {!state && (
              <TextField
                fullWidth
                variant="outlined"
                select
                defaultValue={""}
                InputLabelProps={{ shrink: true }}
                label="Livro"
                {...register("livro_id", {
                  required: true,
                })}
                error={!!errors.livro_id}
                helperText={errors.livro_id ? "Livro é obrigatório" : ""}
                sx={{ gridColumn: "span 4" }}
              >
                {livros.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.titulo}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <PostInput text={text} setText={setText} />
          </Box>
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Salvar"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CadastrarAnalise;
