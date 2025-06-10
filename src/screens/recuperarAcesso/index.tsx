// import supabase from "../../api/index";
import { useForm } from "react-hook-form";
import logo from "../../assets/logocg.webp";
import AuthContext from "../../context/auth";
import { useNavigate } from "react-router-dom";
import background from "../../assets/fundo.webp";
import React, { memo, useContext, useState } from "react";
import {
  Box,
  Card,
  Button,
  TextField,
  Container,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import UsuarioService from "../../services/UsuarioService";

const RecuperarAcesso: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  //   const [message, setMessage] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [submitting, setSubmitting] = useState(false);

  //   const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   const [accessToken, setAccessToken] = useState("");
  //   const [loading, setLoading] = useState(true);
  //   const [refreshToken, setRefreshToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   useEffect(() => {
  //     const hash = window.location.hash;
  //     const params = new URLSearchParams(hash.substring(1));
  //     const access_token = params.get("access_token") || "";
  //     const refresh_token = params.get("refresh_token") || "";
  //     setAccessToken(access_token || "");
  //     setRefreshToken(refresh_token || "");

  //     session(access_token, refresh_token);
  //   }, []);

  //   const session = async (access_token: string, refresh_token: string) => {
  //     const { error, data } = await supabase.auth.setSession({
  //       access_token: access_token,
  //       refresh_token: refresh_token,
  //     });
  //     if (error) {
  //       setMessage(`Erro ao definir sessão: ${error.message}`);
  //     } else {
  //       setEmail(data.user?.email || "");
  //       setLoading(false);
  //     }
  //   };

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    UsuarioService.login(data)
      .then((resp) => {
        if (resp.token) {
          signIn(resp);
          navigate("/dashboard");
        } else {
          window.alert("Não foi possível realizar o login!");
        }
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
        alignItems: "center",
        backgroundSize: "cover",
        justifyContent: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${background})`,
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
            Bem-vindo!
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
            label="Nova Senha"
            variant="standard"
            style={{ width: "100%", marginTop: 20 }}
            error={!!errors["nova-senha"]}
            helperText={errors["nova-senha"] ? "Nova Senha é obrigatória" : ""}
            {...register("nova-senha", {
              required: true,
            })}
          />

          <TextField
            id="Senha-basic"
            type="password"
            label="Confirmar Senha"
            variant="standard"
            style={{ width: "100%", marginTop: 20 }}
            error={!!errors["confirmar-senha"]}
            helperText={
              errors["confirmar-senha"] ? "Confirmar Senha é obrigatória" : ""
            }
            {...register("confirmar-senha", {
              required: true,
            })}
          />

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
              navigate("/login");
            }}
          >
            Retornar ao Login
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

const MemoizedRecuperarAcesso = memo(RecuperarAcesso);
export default MemoizedRecuperarAcesso;
