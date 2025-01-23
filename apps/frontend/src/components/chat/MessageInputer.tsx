import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';

interface MessageInputerProps {
  onSend: (name: string, message: string) => void;
}

// Validation schema using Joi
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be less than 30 characters',
  }),
  message: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message cannot be empty',
    'string.max': 'Message must be less than 255 characters',
  }),
});

const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  background-color: #f5f5f5;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const StyledTextField = styled(TextField)`
  flex: 1;

  & .MuiInputBase-root {
    background-color: white;
    color: black;
  }

  width: 80%;

  @media (max-width: 600px) {
    width: 250px;
  }
`;

const MessageInputer: React.FC<MessageInputerProps> = ({ onSend }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: { name: '', message: '' },
  });

  const onSubmit = (data: { name: string; message: string }) => {
    onSend(data.name, data.message);
    reset(); // Clear the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, borderRadius: 1, bgcolor: '#f5f5f5', gap: 1}}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Name"
              size="small"
              variant="outlined"
              placeholder="Your name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        
        <Container>
            <Controller
            name="message"
            control={control}
            render={({ field }) => (
                <StyledTextField
                {...field}
                label="Message"
                size="small"
                variant="outlined"
                placeholder="Type a message"
                multiline
                maxRows={3}
                error={!!errors.message}
                helperText={errors.message?.message}
                minRows={2}
                />
            )}
            />

            <Box>
            <IconButton
                type="submit"
                color="primary"
            >
                <SendIcon />
            </IconButton>
            </Box>
        </Container>
      </Box>
    </form>
  );
};

export default MessageInputer;
