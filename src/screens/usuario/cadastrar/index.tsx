import { useForm } from "react-hook-form";
import Header from "../../../components/header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import UsuarioService from "../../../services/UsuarioService";
import {
  Box,
  Button,
  TextField,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { TabPanel, a11yProps } from "../../../components/tabPanel";
import { formatTel } from "../../../utils/FormatarTelefone";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CadastrarUsuario = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const tipos = [
    {
      value: "usuario",
      label: "USUARIO",
    },
    {
      value: "master",
      label: "MASTER",
    },
  ];

  useEffect(() => {
    if (state) {
      setValue("nome", state.nome);
      setValue("telefone", formatTel(state.telefone));
      setValue("email", state.email);
    }
  }, [state]);

  const salvar = async (values: any) => {
    setLoading(true);
    values.telefone = values.telefone.replace(/[^0-9]/g, "");

    UsuarioService.salvarUsuario2(values)
      .then((resp: any) => {
        if (resp.id) {
          window.alert("Usuário Criado com sucesso!");
          setTimeout(() => {
            navigate("/usuarios");
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

  const editar = async (values: any) => {
    setLoading(true);
    values.telefone = values.telefone.replace(/[^0-9]/g, "");

    if (values.senha == "" && values.confirm_senha == "") {
      delete values.senha;
      delete values.confirm_senha;
    }

    // UsuarioService.editarUsuario(state.id, values)
    //   .then((resp: any) => {
    //     if (resp.status === 200 || resp.status === 201) {
    //       window.alert("Usuário Editado com sucesso!");
    //       setTimeout(() => {
    //         navigate("/usuarios");
    //       }, 1000);
    //     } else {
    //       window.alert(resp);
    //     }
    //   })
    //   .catch((e) => {
    //     window.alert(e);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const changeTab = (_event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const maskTel = (event: any) => {
    const { name, value } = event.target;
    if (value) {
      const maskedValue = formatTel(value);
      setValue(name, maskedValue);
    }
  };

  return (
    <Box m="20px">
      <Header
        title={state ? "Editar Usuário" : "Cadastrar Usuário"}
        subtitle={state ? `Usuário ID ${state.id}` : ""}
      />

      <Tabs value={tab} onChange={changeTab}>
        <Tab label="Dados Básicos" {...a11yProps(0)} />
        {state && <Tab label="Alterar Senha" {...a11yProps(1)} />}
      </Tabs>

      <TabPanel value={tab} index={0}>
        <form onSubmit={handleSubmit(state ? editar : salvar)}>
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
              type="text"
              label="Nome"
              {...register("nome", {
                required: true,
              })}
              error={!!errors.nome}
              helperText={errors.nome ? "Nome é obrigatório" : ""}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Telefone"
              {...register("telefone", {
                required: true,
              })}
              onBlur={maskTel}
              error={!!errors.telefone}
              helperText={errors.telefone ? "Telefone é obrigatório" : ""}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              {...register("email", {
                required: true,
              })}
              error={!!errors.email}
              helperText={errors.email ? "Email é obrigatório" : ""}
              sx={{ gridColumn: "span 2" }}
            />

            {!state && (
              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Senha"
                {...register("senha", {
                  required: true,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setshowPassword(!showPassword);
                        }}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.senha}
                helperText={errors.senha ? "Senha é obrigatória" : ""}
                sx={{ gridColumn: "span 2" }}
              />
            )}

            {!state && (
              <TextField
                fullWidth
                variant="filled"
                select
                defaultValue="usuario"
                InputLabelProps={{ shrink: true }}
                label="Tipo Usuário"
                {...register("tipoUsuario", {
                  required: true,
                })}
                error={!!errors.tipoUsuario}
                helperText={errors.tipoUsuario ? "Tipo é obrigatório" : ""}
                sx={{ gridColumn: "span 2" }}
              >
                {tipos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
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
      </TabPanel>

      {state && (
        <TabPanel value={tab} index={1}>
          <form onSubmit={handleSubmit(state ? editar : salvar)}>
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
                type={showPassword ? "text" : "password"}
                label="Senha"
                {...register("senha", {
                  required: !state ? true : false,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setshowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.senha}
                helperText={errors.senha ? "Senha é obrigatória" : ""}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Confirmar Senha"
                {...register("confirm_senha", {
                  required: !state ? true : false,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setshowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirm_senha}
                helperText={
                  errors.confirm_senha
                    ? "Confirmação de Senha é obrigatória"
                    : ""
                }
                sx={{ gridColumn: "span 2" }}
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
                  "Salvar"
                )}
              </Button>
            </Box>
          </form>
        </TabPanel>
      )}
    </Box>
  );
};

export default CadastrarUsuario;
