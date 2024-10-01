function base64ToBlob(base64String: string) {

  
    // Converter a string base64 para bytes
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    
    // Criar o Blob a partir dos bytes
    return new Blob([byteArray], { type: 'application/octet-stream' });
  }
  
  function base64ToObjectURL(base64String: string) {
    // Converter Base64 em Blob
    const blob = base64ToBlob(base64String);
    
    // Criar um URL de objeto usando o Blob
    return URL.createObjectURL(blob);
  }
  
 export default base64ToObjectURL;
  