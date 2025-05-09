import { useContext } from "react";
import Login from "../screens/login";
import Livros from "../screens/livro";
import Topbar from "../components/topbar";
import Usuarios from "../screens/usuario";
import AuthContext from "../context/auth";
import Cadastro from "../screens/cadastro";
import Analises from "../screens/analises";
import Sidebar from "../components/sidebar";
import Contato from "../screens/contate-nos";
import Dashboard from "../screens/dashboard";
import Calendario from "../screens/calendario";
import Emprestimos from "../screens/emprestimo";
import { ColorModeContext, useMode } from "../theme";
import CadastrarLivro from "../screens/livro/cadastrar";
import { Routes, Route, Navigate } from "react-router-dom";
import CadastrarUsuario from "../screens/usuario/cadastrar";
import CadastrarAnalise from "../screens/analises/cadastrar";
import CadastrarEmprestimo from "../screens/emprestimo/cadastrar";
import { CssBaseline, ThemeProvider, Divider } from "@mui/material";

function RoutesController() {
  const [theme, colorMode] = useMode();
  const { signed, user } = useContext(AuthContext);
  // const { signed } = true;

  const Private = ({ item }: any) => {
    if (!signed || user.tipoUsuario !== "master") {
      return <Navigate to="/" replace />;
    }

    return item;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {signed ? <Sidebar /> : <></>}
          <main className="content">
            {signed ? <Topbar /> : <></>}
            <Divider />
            <Routes>
              {signed && <Route path="/dashboard" element={<Dashboard />} />}
              {signed && <Route path="/livros" element={<Livros />} />}
              {signed && <Route path="/contate-nos" element={<Contato />} />}
              {signed && <Route path="/analises" element={<Analises />} />}
              {signed && <Route path="/calendario" element={<Calendario />} />}
              {signed && (
                <Route
                  path="/usuarios"
                  element={<Private item={<Usuarios />} />}
                />
              )}
              {signed && (
                <Route
                  path="/cadastrar-usuario"
                  element={<Private item={<CadastrarUsuario />} />}
                />
              )}
              {signed && (
                <Route
                  path="/cadastrar-livro"
                  element={<Private item={<CadastrarLivro />} />}
                />
              )}
              {signed && (
                <Route
                  path="/emprestimos"
                  element={<Private item={<Emprestimos />} />}
                />
              )}

              {signed && (
                <Route
                  path="/cadastrar-emprestimo"
                  element={<Private item={<CadastrarEmprestimo />} />}
                />
              )}
              {signed && (
                <Route
                  path="/cadastrar-analise"
                  element={<Private item={<CadastrarAnalise />} />}
                />
              )}

              <Route path="/" element={<Login />} />
              <Route path="/cadastrar" element={<Cadastro />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default RoutesController;
