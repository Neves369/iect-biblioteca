/* eslint-disable no-empty */
export const formatCpf = (cpf: string) => {
    try {

        let newCpf

        if(cpf?.length == 11) {
            const parte1 = cpf?.slice(0,3);
            const parte2 = cpf?.slice(3,6);
            const parte3 = cpf?.slice(6,9);
            const parte4 = cpf?.slice(9,11);
            newCpf = `${parte1}.${parte2}.${parte3}-${parte4}`       
        } 
        return newCpf
    } catch (e) {

    }
  };