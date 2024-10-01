
export default async function fileToBase64(file: File){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          const base64: any = reader.result; // Obtém a string base64 completa com prefixo
          const base64WithoutPrefix = base64.split(';base64,').pop(); // Remove o prefixo
          resolve(base64WithoutPrefix); // Resolve a string base64 sem o prefixo
        };
    
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
}

