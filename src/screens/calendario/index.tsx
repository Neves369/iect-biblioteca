import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import interactionPlugin from "@fullcalendar/interaction";
import EmprestimoService from "../../services/EmprestimoService";

const Calendario = () => {
  const [loading, setLoading] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleEventClick = (selected: any) => {
    if (
      window.confirm(
        `Tem certeza que deseja finalizar o empréstimo '${selected.event.title}'?`
      )
    ) {
      EmprestimoService.finalizarEmprestimo(selected.event.id)
        .then((resp) => {
          setCurrentEvents(resp);
          // setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getNotificacoes = async () => {
    EmprestimoService.listarEmprestimos({ status: true })
      .then((resp) => {
        const eventosFormatados = resp.reduce((acc: any[], item: any) => {
          acc.push({
            id: item.id,
            title: `${item.usuario_nome}- ${item.livro_titulo}`,
            date: item.previsao_devolucao,
          });
          return acc;
        }, []);
        setCurrentEvents(eventosFormatados);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNotificacoes();
  }, []);

  return (
    <Box
      m="20px"
      gridRow="span 3"
      display={"flex"}
      gridColumn={"span 12"}
      sx={{
        paddingBottom: "20px",
      }}
    >
      <Box flex="1 1 100%">
        {!loading && (
          <FullCalendar
            height="75vh"
            locale={ptLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventColor={"#6b6b6b"}
            initialView="dayGridMonth"
            eventClick={handleEventClick}
            events={currentEvents}
            themeSystem="bootstrap5"
          />
        )}
      </Box>
    </Box>
  );
};

export default Calendario;
