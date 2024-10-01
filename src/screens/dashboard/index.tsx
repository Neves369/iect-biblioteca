import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import Header from "../../components/header";
import AuthContext from "../../context/auth";
import calendar from "../../assets/calendar.webp";
import bkWelcome from "../../assets/bkWelcome.webp";
import { checkDevice } from "../../utils/checkDevice";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const nome: string = user.nome;

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header />
      </Box>
      {/*  */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows={checkDevice() === true ? "120px" : "140px"}
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={"span 12"}
          gridRow="span 1"
          display={"flex"}
          flexDirection={"row"}
          sx={{
            backgroundImage: `url(${bkWelcome})`,
            backgroundSize: "cover",
          }}
          borderRadius={3}
        >
          <Box
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            position="relative"
          >
            <img className="imgCalendar" src={calendar} alt="CalendarIcon" />
          </Box>
          <Box display={"flex"} flex={4} sx={{ flexDirection: "column" }}>
            <Box flex={1} paddingTop={2} paddingLeft={1}>
              <Typography color={"#141414"}>
                Olá, {nome.split(" ", 1)}
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography
                variant={checkDevice() === true ? "h4" : "h2"}
                fontWeight={"bold"}
                color={"#141414"}
                marginLeft={1}
              >
                Bem-vindo à Biblioteca IECT
              </Typography>
            </Box>
            <Box flex={1} padding={0.5}>
              <Typography
                color={"#141414"}
                fontSize={checkDevice() === true ? 10 : 20}
              >
                A leitura nos conecta com a verdade e a beleza, refletindo a
                profundidade do Criador.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
