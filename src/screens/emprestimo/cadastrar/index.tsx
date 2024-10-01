/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import UsuarioService from "../../../services/UsuarioService";
import LivroService from "../../../services/LivroService";
import EmprestimoService from "../../../services/EmprestimoService";

const CadastrarEmprestimo = () => {
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const salvar = async (values: any) => {
    setLoading(true);

    console.log(values);
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
    UsuarioService.listarUsuarios()
      .then((resp) => {
        setUsuarios(resp);
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const pesquisarLivros = () => {
    LivroService.listarLivros()
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
            variant="filled"
            select
            defaultValue={""}
            InputLabelProps={{ shrink: true }}
            label="Usuario"
            {...register("usuario_id", {
              required: true,
            })}
            error={!!errors.usuario_id}
            helperText={errors.usuario_id ? "Usuário é obrigatório" : ""}
            sx={{ gridColumn: "span 2" }}
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
            defaultValue={""}
            InputLabelProps={{ shrink: true }}
            label="Livro"
            {...register("livro_id", {
              required: true,
            })}
            error={!!errors.livro_id}
            helperText={errors.livro_id ? "Livro é obrigatório" : ""}
            sx={{ gridColumn: "span 2" }}
          >
            {livros.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {option.titulo}
              </MenuItem>
            ))}
          </TextField>
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

export default CadastrarEmprestimo;
