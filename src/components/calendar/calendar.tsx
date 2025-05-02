import { Box } from "@mui/material";
import AuthContext from "../../context/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import { useContext, useEffect, useState } from "react";
import interactionPlugin from "@fullcalendar/interaction";
import EmprestimoService from "../../services/EmprestimoService";

const Calendario = () => {
  const { user } = useContext(AuthContext);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleEventClick = (selected: any) => {
    if (
      window.confirm(
        `Tem certeza que deseja deletar o evento '${selected.event.title}'?`
      )
    ) {
      selected.event.remove();
    }
  };

  const getNotificacoes = async () => {
    EmprestimoService.listarEmprestimosVencendo(user)
      .then((resp) => {
        setCurrentEvents(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNotificacoes();
    console.log(currentEvents);
  }, []);

  return (
    <Box
      gridRow="span 3"
      display={"flex"}
      gridColumn={"span 12"}
      sx={{
        // backgroundColor: "red",
        paddingBottom: "20px",
      }}
    >
      <Box flex="1 1 100%">
        <FullCalendar
          height="75vh"
          locale={ptLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialView="dayGridMonth"
          eventClick={handleEventClick}
          eventsSet={(events: any) => setCurrentEvents(events)}
          themeSystem="bootstrap5"
          initialEvents={[
            {
              id: "12315",
              title: "Evento 1",
              date: "2025-04-10",
            },
            {
              id: "5123",
              title: "Evento 2",
              date: "2025-04-11",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Calendario;
