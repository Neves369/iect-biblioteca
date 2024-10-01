// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useState } from "react";
// import logo from "../../assets/logo192.png";
// import { useForm } from "react-hook-form";
// import {
//   Alert,
//   AlertColor,
//   Button,
//   Card,
//   CircularProgress,
//   TextField,
//   Typography,
//   Snackbar,
// } from "@mui/material";

// const RecuperarAcesso: React.FC = () => {
//   const [error] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [severity] = useState<AlertColor | undefined>("error");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();

//   const [submitting] = useState(false);
//   const [setCurrentValues] = useState<any>({
//     nome: "",
//     email: "",
//     senha: "",
//   });

//   const onSubmit = (_data: any) => {
//     // setSubmitting(true);
//     // recuperar(data.email)
//     //   .then((resp: any) => {
//     //     if (resp.status === 200) {
//     //       return (
//     //         setSeverity("success"),
//     //         setError("Email enviado com sucesso!"),
//     //         setSubmitting(false),
//     //         setShowError(true)
//     //       );
//     //     }
//     //     if (Math.trunc(resp.response.status / 100) === 4) {
//     //       return (
//     //         setSeverity("warning"),
//     //         setError(resp.response.titulo),
//     //         setSubmitting(false),
//     //         setShowError(true)
//     //       );
//     //     }
//     //     if (Math.trunc(resp.response.status / 100) === 5) {
//     //       return (
//     //         setSeverity("error"),
//     //         setError(resp.response.titulo),
//     //         setSubmitting(false),
//     //         setShowError(true)
//     //       );
//     //     }
//     //   })
//     //   .catch((e) => {
//     //     if (Math.trunc(e.response.status / 100) === 4) {
//     //       return (
//     //         setSeverity("warning"),
//     //         setError(e.response.data.titulo),
//     //         setSubmitting(false),
//     //         setShowError(true)
//     //       );
//     //     }
//     //     if (Math.trunc(e.response.status / 100) === 5) {
//     //       return (
//     //         setSeverity("error"),
//     //         setError(e.response.data.titulo),
//     //         setSubmitting(false),
//     //         setShowError(true)
//     //       );
//     //     }
//     //   });
//   };

//   useEffect(() => {
//     const subscription = watch((value) => setCurrentValues(value));
//     return () => subscription.unsubscribe();
//   }, [setCurrentValues, watch]);

//   return (
//     <div className="containerLogin">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Card
//           sx={{
//             maxWidth: 390,
//             backgroundColor: "#FBF7F4",
//             borderRadius: 10,
//             padding: 5,
//             textAlign: "center",
//           }}
//         >
//           <div style={{ alignItems: "center", textAlign: "center" }}>
//             <img style={{ width: 90 }} src={logo} alt="logo" />
//           </div>

//           <Typography color="#ADADAD" fontSize={30}>
//             Bem vindo
//           </Typography>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               marginTop: 30,
//             }}
//           >
//             <Typography
//               color="#adadad"
//               fontSize={14}
//               style={{ paddingRight: 5 }}
//             >
//               Por favor informe seu E-mail. Será enviada uma mensagem com as
//               informações para recuperação de sua conta.
//             </Typography>
//           </div>
//           <TextField
//             id="Email-basic"
//             type="email"
//             label="E-mail"
//             variant="standard"
//             style={{ width: "100%", marginTop: 20 }}
//             {...register("email", {
//               required: true,
//             })}
//           />
//           {errors.email && (
//             <span role="alert" style={{ color: "red", fontSize: 12 }}>
//               Email é obrigatório
//             </span>
//           )}

//           <Button
//             type="submit"
//             style={{ marginTop: 50, width: "100%" }}
//             variant="contained"
//           >
//             {submitting ? <CircularProgress color="info" /> : "Recuperar"}
//           </Button>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: 30,
//             }}
//           >
//             <Typography
//               color="#adadad"
//               fontSize={14}
//               style={{ paddingRight: 5 }}
//             >
//               Já possui conta?
//             </Typography>
//             <a className="linkLogin" href="/login">
//               Entrar
//             </a>
//           </div>
//         </Card>
//       </form>
//       <Snackbar
//         open={showError}
//         autoHideDuration={6000}
//         onClose={() => {
//           setShowError(false);
//         }}
//       >
//         <Alert severity={severity} sx={{ width: "100%" }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default RecuperarAcesso;
