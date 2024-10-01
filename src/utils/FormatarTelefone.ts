/* eslint-disable no-empty */
export const formatTel = (tel: string) => {
    try {

        let newTel

        if(tel?.length == 11) {
            const parte1 = tel?.slice(0,2);
            const parte2 = tel?.slice(2,7);
            const parte3 = tel?.slice(7,12);
            newTel = `(${parte1}) ${parte2}-${parte3}`       

           } else {
            const parte1 = tel?.slice(0,2);
            const parte2 = tel?.slice(2,6);
            const parte3 = tel?.slice(6,11);
            newTel = `(${parte1}) ${parte2}-${parte3}`      
           }
        return newTel
    } catch (e) {
      
    }
  };