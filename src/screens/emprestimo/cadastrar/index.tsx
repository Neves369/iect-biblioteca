import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import LivroService from "../../../services/LivroService";
import UsuarioService from "../../../services/UsuarioService";
import EmprestimoService from "../../../services/EmprestimoService";

const CadastrarEmprestimo = () => {
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const prazos = [
    {
      value: "3",
      label: "3 Dias",
    },
    {
      value: "15",
      label: "15 Dias",
    },
    {
      value: "30",
      label: "30 Dias",
    },
  ];

  const livroSelecionado: any = livros.find(
    (livro: any) => livro.id === watch("livro_id")
  );

  const salvar = async (values: any) => {
    setLoading(true);

    EmprestimoService.salvarEmprestimo(values)
      .then((resp) => {
        if (resp == "201") {
          window.alert("Empréstimo realizado com sucesso!");
          setTimeout(() => {
            navigate("/emprestimos");
          }, 1000);
        }
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pesquisarUsuarios = async () => {
    UsuarioService.listarUsuarios([])
      .then((resp) => {
        setUsuarios(resp);
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const pesquisarLivros = () => {
    LivroService.listarLivrosDisponiveis()
      .then((resp) => {
        setLivros(resp);
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  useEffect(() => {
    setLoading(true);
    pesquisarUsuarios();
    pesquisarLivros();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box m="20px">
      <Header title={"Novo Empréstimo"} />

      <form onSubmit={handleSubmit(salvar)}>
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

          {/* Formulário */}
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
            <TextField
              fullWidth
              variant="filled"
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

            <TextField
              fullWidth
              variant="filled"
              select
              defaultValue={""}
              InputLabelProps={{ shrink: true }}
              label="Usuário"
              {...register("usuario_id", {
                required: true,
              })}
              error={!!errors.usuario_id}
              helperText={errors.usuario_id ? "Usuário é obrigatório" : ""}
              sx={{ gridColumn: "span 4" }}
            >
              {usuarios.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nome}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              variant="filled"
              select
              defaultValue="15 days"
              InputLabelProps={{ shrink: true }}
              label="Prazo Empréstimo"
              {...register("prazoEmprestimo", {
                required: true,
              })}
              error={!!errors.prazoEmprestimo}
              helperText={errors.prazoEmprestimo ? "Prazo é obrigatório" : ""}
              sx={{ gridColumn: "span 4" }}
            >
              {prazos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Botão Salvar */}
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

export default CadastrarEmprestimo;
