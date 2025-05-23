import { memo, useContext } from "react";
import Header from "../../components/header";
import AuthContext from "../../context/auth";
import calendar from "../../assets/calendar.webp";
import bkWelcome from "../../assets/bkWelcome.webp";
import { checkDevice } from "../../utils/checkDevice";
import { DownloadOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import YouTubeEmbed from "../../components/video/apresentacao";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const nome: string = user.nome;

  return (
    <Box m="20px">
      {/* Header */}
      <Box
        display="flex"
        mb={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header />
        <Box>
          <Button
            target="_blank"
            href="https://drive.google.com/drive/folders/1_NMSoSDtOovaEMkGQTrjiIIN4G3It2qQ?usp=sharing"
            sx={{
              backgroundColor: "black",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 10px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Drive de Leitura
          </Button>
        </Box>
      </Box>
      {/*  */}

      <Box
        display="grid"
        paddingBottom={10}
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows={checkDevice() === true ? "120px" : "140px"}
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={"span 12"}
          // gridRow="span 1"
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
            <Box sx={{ zIndex: 999 }} flex={1}>
              <Typography
                variant={checkDevice() === true ? "h4" : "h2"}
                fontWeight={"bold"}
                color={checkDevice() === true ? "white" : "#141414"}
                marginLeft={1}
              >
                Bem-vindo à Biblioteca IECT
              </Typography>
            </Box>
            <Box sx={{ zIndex: 999 }} flex={1} padding={0.5}>
              <Typography
                color={checkDevice() === true ? "white" : "#141414"}
                fontSize={checkDevice() === true ? 10 : 20}
              >
                A leitura nos conecta com a verdade e a beleza, refletindo a
                profundidade do Criador.
              </Typography>
            </Box>
          </Box>
        </Box>
        {/*  */}

        {/* ROW 2 */}
        <Box
          gridColumn={`span ${checkDevice() === true ? "12" : "8"} `}
          gridRow="span 3"
          borderRadius={3}
          // sx={{ backgroundColor: "gray" }}
          overflow={"auto"}
        >
          <YouTubeEmbed videoId="xdHblmywSpE" />
        </Box>

        <Box
          sx={{ display: { xs: "block" } }}
          gridColumn={checkDevice() === true ? "span 12" : "span 4"}
          gridRow="span 3"
          overflow="hide"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={2}
            borderBottom={`1px solid #fb7f63`}
            marginBottom={`22px`}
            p="15px"
            sx={{ backgroundColor: "neutral.dark" }}
          >
            <Box flex={1}>
              <Avatar sx={{ bgcolor: "#fb7f63" }}>CH</Avatar>
            </Box>
            <Box
              flex={3}
              display={"flex"}
              alignContent={"center"}
              flexDirection={"column"}
            >
              <Box fontSize={16} fontWeight={"bold"}>
                {"Charles Spurgeon"}
              </Box>
              <Box fontSize={14}>
                {"Visite muitos livros bons, mas viva na Bíblia."}
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={2}
            borderBottom={`1px solid #fb7f63`}
            marginBottom={`22px`}
            p="15px"
            sx={{ backgroundColor: "neutral.dark" }}
          >
            <Box flex={1}>
              <Avatar sx={{ bgcolor: "#fb7f63" }}>JP</Avatar>
            </Box>
            <Box
              flex={3}
              display={"flex"}
              alignContent={"center"}
              flexDirection={"column"}
            >
              <Box fontSize={16} fontWeight={"bold"}>
                {"John Piper"}
              </Box>
              <Box fontSize={14}>
                {
                  "Nós lemos para sermos transformados pela renovação de nossa mente."
                }
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={2}
            borderBottom={`1px solid #fb7f63`}
            marginBottom={`22px`}
            p="15px"
            sx={{ backgroundColor: "neutral.dark" }}
          >
            <Box flex={1}>
              <Avatar sx={{ bgcolor: "#fb7f63" }}>JS</Avatar>
            </Box>
            <Box
              flex={3}
              display={"flex"}
              alignContent={"center"}
              flexDirection={"column"}
            >
              <Box fontSize={16} fontWeight={"bold"}>
                {"John Stott"}
              </Box>
              <Box fontSize={14}>
                {
                  "Nada nos mantém humildes como ler e meditar na Palavra de Deus."
                }
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={2}
            borderBottom={`1px solid #fb7f63`}
            marginBottom={`22px`}
            p="15px"
            sx={{ backgroundColor: "neutral.dark" }}
          >
            <Box flex={1}>
              <Avatar sx={{ bgcolor: "#fb7f63" }}>ML</Avatar>
            </Box>
            <Box
              flex={3}
              display={"flex"}
              alignContent={"center"}
              flexDirection={"column"}
            >
              <Box fontSize={16} fontWeight={"bold"}>
                {"Martinho Lutero"}
              </Box>
              <Box fontSize={14}>
                {
                  "O livro é a ferramenta mais poderosa de aprendizado e crescimento."
                }
              </Box>
            </Box>
          </Box>
        </Box>
        {/*  */}
      </Box>
    </Box>
  );
};

const MemoizedDashboard = memo(Dashboard);
export default MemoizedDashboard;
