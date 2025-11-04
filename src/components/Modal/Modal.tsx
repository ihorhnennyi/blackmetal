import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { ModalProps } from './types';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    margin: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const ModalHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 20px 24px',
  borderBottom: '1px solid #e0e0e0',
});

const Title = styled('h2')({
  margin: 0,
  fontSize: '24px',
  fontWeight: 600,
  color: '#2c3e50',
  lineHeight: 1.2,
});

const CloseButton = styled(IconButton)({
  padding: 8,
  marginRight: -8,
  marginTop: -8,
  '& svg': {
    fontSize: '24px',
    color: '#666',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    '& svg': {
      color: '#333',
    },
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: '24px',
  '&.MuiDialogContent-root': {
    padding: '24px',
  },
});

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <ModalHeader>
        {title && <Title>{title}</Title>}
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
      </ModalHeader>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  );
}; 