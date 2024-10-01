import { useForm } from "react-hook-form";
import Header from "../../../components/header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Tabs,
  Tab,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import LivroService from "../../../services/LivroService";
import { TabPanel, a11yProps } from "../../../components/tabPanel";

const CadastrarLivro = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (state) {
      setValue("titulo", state.titulo);
      setValue("autor", state.autor);
      setValue("ano_publicacao", state.ano_publicacao);
    }
  }, [setValue, state]);

  const salvar = async (values: any) => {
    setLoading(true);

    LivroService.salvarLivro(values)
      .then((resp: any) => {
        console.log("teste: ", resp);
        if (resp == "201") {
          window.alert("Livro cadastrado com sucesso!");
          setTimeout(() => {
            navigate("/livros");
          }, 1000);
        } else {
          window.alert("Erro ao cadastrar livro!");
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

    LivroService.editarLivro(values, state.id)
      .then((resp: any) => {
        if (resp == "204") {
          window.alert("Livro editado com sucesso!");
          setTimeout(() => {
            navigate("/livros");
          }, 1000);
        } else {
          window.alert("Erro ao editar livro!");
        }
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box m="20px">
      <Header
        title={state ? "Editar Livro" : "Cadastrar Livro"}
        subtitle={state ? `Livro ID ${state.id}` : ""}
      />
      <Tabs value={0}>
        <Tab label="Dados Básicos" {...a11yProps(0)} />
      </Tabs>

      <TabPanel value={0} index={0}>
        <form onSubmit={handleSubmit(state ? editar : salvar)}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Título"
              {...register("titulo", {
                required: true,
              })}
              error={!!errors.titulo}
              helperText={errors.titulo ? "Título é obrigatório" : ""}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Autor"
              {...register("autor", {
                required: true,
              })}
              error={!!errors.autor}
              helperText={errors.autor ? "Autor é obrigatório" : ""}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              multiline
              variant="outlined"
              type="text"
              label="Ano de Publicação"
              {...register("ano_publicacao", {
                required: true,
              })}
              error={!!errors.ano_publicacao}
              helperText={
                errors.ano_publicao ? "Ano de Publicação é obrigatório" : ""
              }
              sx={{ gridColumn: "span 2" }}
            />
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
      </TabPanel>
    </Box>
  );
};

export default CadastrarLivro;
