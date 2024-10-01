import { useContext } from "react";
import Dashboard from "../screens/dashboard";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Divider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Usuarios from "../screens/usuario";
import CadastrarUsuario from "../screens/usuario/cadastrar";
import AuthContext from "../context/auth";
import Login from "../screens/login";
import Livros from "../screens/livro";
import Cadastro from "../screens/cadastro";
import Emprestimos from "../screens/emprestimo";
import CadastrarLivro from "../screens/livro/cadastrar";
import CadastrarEmprestimo from "../screens/emprestimo/cadastrar";

function RoutesController() {
  const [theme, colorMode] = useMode();
  const { signed, user } = useContext(AuthContext);
  // const { signed } = true;

  const Private = ({ item }: any) => {
    return user.tipoUsuario === "master" ? item : <></>;
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
              <Route path="/dashboard" element={<Dashboard />} />
              {signed && <Route path="/livros" element={<Livros />} />}
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
