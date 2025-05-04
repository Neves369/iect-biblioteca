import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import { EmojiEmotions } from "@mui/icons-material";
// import "emoji-mart/css/emoji-mart.css";

const PostInput = ({ text, setText, review }: any) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Função para lidar com a seleção de emojis
  const handleEmojiSelect = (emoji: any) => {
    setText((prevText: any) => prevText + emoji.native);
    setShowEmojiPicker(false);
  };

  // Função para lidar com a mudança de texto
  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        margin: "0 auto",
        gridColumn: "span 4",
      }}
    >
      {!review && (
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          Compartilhe seus pensamentos sobre a obra:
        </Typography>
      )}

      <TextField
        fullWidth
        multiline
        minRows={4}
        maxRows={20}
        value={text}
        variant="outlined"
        spellCheck={false}
        contentEditable={review}
        onChange={handleTextChange}
        placeholder="Escreva algo..."
        sx={{
          marginBottom: "8px",
          borderRadius: 2,
        }}
      />

      {!review && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            color="primary"
          >
            <EmojiEmotions />
          </IconButton>

          {showEmojiPicker && (
            <Box
              sx={{
                position: "absolute",
                bottom: "50px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PostInput;
