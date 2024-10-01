import React, { useContext, useState } from "react";
import logo from "../../assets/logocg.webp";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth";
import { useForm } from "react-hook-form";
import background from "../../assets/fundo.webp";
import {
  Card,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
  Container,
  useMediaQuery,
} from "@mui/material";
import UsuarioService from "../../services/UsuarioService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    UsuarioService.login(data)
      .then((resp) => {
        signIn(resp);
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box
      sx={{
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
            Bem vindo!
          </Typography>

          <TextField
            id="Email-basic"
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
            id="Senha-basic"
            type="password"
            label="Senha"
            variant="standard"
            style={{ width: "100%", marginTop: 20 }}
            error={!!errors.senha}
            helperText={errors.senha ? "Senha é obrigatória" : ""}
            {...register("senha", {
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
                navigate("/cadastrar");
              }}
            >
              Esqueci a senha
            </a>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            style={{ marginTop: 50, marginBottom: 5, width: "100%" }}
            variant="contained"
          >
            {submitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
          <a
            className="linkLogin"
            onClick={() => {
              navigate("/cadastrar");
            }}
          >
            Cadastrar-se
          </a>
        </Card>
      </form>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          bottom: 0,
          position: "fixed",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            sx={{ color: "white", textAlign: "center" }}
            variant="body1"
          >
            2024 - Desenvolvido por Neves369©, todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
