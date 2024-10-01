import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AplicativoService from "../../services/AplicativoService";
import { Grid, Card, CardMedia, IconButton, Box } from "@mui/material";
import imageCompression from "browser-image-compression";
import fileToBase64 from "../../utils/FileToBase64";
import base64ToObjectURL from "../../utils/Base64toBlob";

const CardList = (props: any) => {
  const [images, setImages] = useState(props.array);

  const handleDelete = async (id: number) => {
    // const newImages = images.filter((_, i) => i !== index);
    // setImages(newImages);
    AplicativoService.deletePromocoes(id)
      .then((resp: any) => {
        if (resp.status === 200 || resp.status === 201) {
          window.alert("Promoção deletada com sucesso!");
          const newImages = images.filter((element: any) => element.id !== id);
          setImages(newImages);
        } else {
          window.alert(resp);
        }
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const handleAddImage = async (event: any) => {
    const file = event.target.files[0]; // Seleciona o primeiro arquivo

    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        initialQuality: 0,
      };
      const foto = await imageCompression(file, options);
      const base64: any = await fileToBase64(foto);

      AplicativoService.criarPromocao(base64)
        .then((resp: any) => {
          if (resp.status === 200 || resp.status === 201) {
            window.alert("Imagem enviada com sucesso!");
            console.log(resp.data);
            const newImage = {
              id: resp.data.id,
              foto: base64ToObjectURL(resp.data.foto),
            };
            // const newImageURL = URL.createObjectURL(file);
            setImages([...images, newImage]);
          } else {
            window.alert(resp);
          }
        })
        .catch((e) => {
          window.alert(e);
        });
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {images.map((image: any, index: number) => (
          <Grid item key={index}>
            <Card sx={{ width: 150, height: 150, position: "relative" }}>
              <CardMedia
                component="img"
                alt={`Imagem ${index}`}
                height="150"
                image={image.foto}
              />
              <IconButton
                onClick={() => handleDelete(image.id)}
                sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}

        {images.length < 6 && (
          <Grid item>
            <Card
              sx={{
                width: 150,
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: "1px dashed grey",
              }}
            >
              {/* Input para selecionar o arquivo de imagem */}
              <input
                accept="image/*"
                style={{ display: "none" }} // Esconde o input
                type="file"
                id="upload-image"
                onChange={handleAddImage}
              />
              <label htmlFor="upload-image">
                <IconButton component="span">
                  <AddIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </label>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CardList;
