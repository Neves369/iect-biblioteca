import logo from "../../assets/logocg.webp";
import { useNavigate } from "react-router-dom";
import background from "../../assets/fundo.webp";
import React, { memo, useState } from "react";
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

const EnviarEmailRecuperarAcesso: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setMessage(`Erro: ${error.message}`);
    } else {
      setMessage("Email enviadocom sucesso!");
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

          <Button
            disabled={loading}
            type="submit"
            style={{ marginTop: 50, marginBottom: 5, width: "100%" }}
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Enviar E-mail"
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

const MemoizedEnviarRecuperarAcesso = memo(EnviarEmailRecuperarAcesso);
export default MemoizedEnviarRecuperarAcesso;
