export const checkDevice = () => { 
    if(window.screen.width <= 800){
       return true; // está utilizando celular
     }
    else {
       return false; // não é celular
     }
   }