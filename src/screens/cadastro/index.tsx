import { useForm } from "react-hook-form";
import logo from "../../assets/logocg.webp";
import AuthContext from "../../context/auth";
import { useNavigate } from "react-router-dom";
import background from "../../assets/fundo.webp";
import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import UsuarioService from "../../services/UsuarioService";
import { formatTel } from "../../utils/FormatarTelefone";

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setSubmitting(true);
    data.telefone = data.telefone.replace(/[^0-9]/g, "");
    data.tipoUsuario = "usuario";
    UsuarioService.salvarUsuario(data)
      .then((resp: any) => {
        if (resp.token) {
          signIn(resp);
          navigate("/dashboard");
        } else {
          window.alert("Não foi possível realizar o login!");
        }
      })
      .catch(() => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  const maskTel = (event: any) => {
    const { name, value } = event.target;
    if (value) {
      const maskedValue = formatTel(value);
      setValue(name, maskedValue);
    }
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            maxWidth: isNonMobile ? 390 : 350,
            backgroundColor: "#FBF7F4",
            borderRadius: 10,
            padding: 5,
            textAlign: "center",
          }}
        >
          <div style={{ alignItems: "center", textAlign: "center" }}>
            <img style={{ width: 100 }} src={logo} alt="logo" />
          </div>

          <Typography color="#ADADAD" fontSize={30}>
            Cadastre-se
          </Typography>

          <TextField
            type="text"
            label="Nome"
            variant="standard"
            style={{ width: "100%" }}
            error={!!errors.nome}
            helperText={errors.nome ? "Nome é obrigatório" : ""}
            {...register("nome", {
              required: true,
            })}
          />

          <TextField
            type="text"
            label="Telefone"
            variant="standard"
            style={{ width: "100%" }}
            error={!!errors.telefone}
            helperText={errors.telefone ? "Telefone é obrigatório" : ""}
            {...register("telefone", {
              required: true,
            })}
            onBlur={maskTel}
          />

          <TextField
            type="email"
            label="E-mail"
            variant="standard"
            style={{ width: "100%" }}
            error={!!errors.email}
            helperText={errors.email ? "Email é obrigatório" : ""}
            {...register("email", {
              required: true,
            })}
          />

          <TextField
            type="password"
            label="Senha"
            variant="standard"
            style={{ width: "100%" }}
            error={!!errors.senha}
            helperText={errors.senha ? "Senha é obrigatória" : ""}
            {...register("senha", {
              required: true,
            })}
          />

          <TextField
            type="password"
            label="Confirmar Senha"
            variant="standard"
            style={{ width: "100%" }}
            error={!!errors.confirmSenha}
            helperText={
              errors.confirmSenha ? "Confirmação de Senha é obrigatória" : ""
            }
            {...register("confirmSenha", {
              required: true,
            })}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <a
              className="linkLogin"
              onClick={() => {
                navigate("/");
              }}
            >
              Já possuo uma conta
            </a>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            style={{ marginTop: 30, width: "100%" }}
            variant="contained"
          >
            {submitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Card>
      </form>
    </Box>
  );
};

export default Cadastro;
