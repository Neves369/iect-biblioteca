import logo from "../../assets/logocg.webp";
import { useNavigate } from "react-router-dom";
import background from "../../assets/fundo.webp";
import React, { memo, useEffect, useState } from "react";
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
import supabase from "../../api";

const RecuperarAcesso: React.FC = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get("access_token") || "";
    const refresh_token = params.get("refresh_token") || "";
    setAccessToken(access_token || "");
    setRefreshToken(refresh_token || "");

    session(access_token, refresh_token);
  }, []);

  const session = async (access_token: string, refresh_token: string) => {
    const { error, data } = await supabase.auth.setSession({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    if (error) {
      setMessage(`Erro ao definir sessão: ${error.message}`);
    } else {
      setEmail(data.user?.email || "");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }
    if (!accessToken || !refreshToken) {
      setMessage("Token de acesso inválido.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
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
      <form onSubmit={handleSubmit}>
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

          {message && <p>{message}</p>}

          <TextField
            id="Email-basic"
            type="email"
            label="E-mail"
            variant="standard"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="Senha-basic"
            type="password"
            label="Nova Senha"
            variant="standard"
            style={{ width: "100%", marginTop: 20 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            id="Senha-basic"
            type="password"
            label="Confirmar Senha"
            variant="standard"
            style={{ width: "100%", marginTop: 20 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            disabled={loading}
            type="submit"
            style={{ marginTop: 50, marginBottom: 5, width: "100%" }}
            variant="contained"
          >
            {loading ? (
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
