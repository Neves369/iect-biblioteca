import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import supabase from "../../api";

const Contato = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const salvar = async (values: any) => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("super-processor", {
        body: {
          sugestao: values.descricao,
          assunto: values.assunto,
        },
      });

      if (error) {
        console.log("error aqui: ", error);
        throw new Error("Erro ao enviar a sugestão.");
      }

      alert("Sugestão enviada com sucesso!");
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tipos = [
    {
      value: "Sugestão de Livros",
      label: "Sugestão de Livros",
    },
    {
      value: "Doação de Livros",
      label: "Doação de Livros",
    },
    {
      value: "Doação de Valores Financeiros",
      label: "Doação de Valores Financeiros",
    },
    {
      value: "Sugestão de Melhorias",
      label: "Sugestão de Melhorias",
    },
    {
      value: "Relatar Problemas",
      label: "Relatar Problemas",
    },
    {
      value: "Outros",
      label: "Outros",
    },
  ];

  return (
    <Box m="20px">
      <Header
        title={"Contate-nos"}
        subtitle={"Dúvidas ou sugestões? Entre em contato conosco! 📞"}
      />

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
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Assunto"
            {...register("assunto", {
              required: true,
            })}
            error={!!errors.assunto}
            helperText={errors.assunto ? "Assunto é obrigatório" : ""}
            sx={{ gridColumn: "span 4" }}
          >
            {tipos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            type="text"
            label="Descrição"
            {...register("descricao")}
            sx={{ gridColumn: "span 4" }}
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
              "Enviar"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Contato;
