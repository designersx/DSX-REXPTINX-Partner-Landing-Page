'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Slide, 
  Button,
  Typography,
  Box 
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AgentGeneralInfo from './CreateAgent';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AgentGeneralInfoModal({ open, onClose, onSubmit }) {
  return (
  <Dialog
  open={open}
  onClose={onClose}
  fullWidth
  TransitionComponent={Transition}
  PaperProps={{
    sx: {
      height: '80vh',
      borderRadius: 3,
      overflow: 'hidden',
      maxWidth: '800px',  
      width: '100%',       
    },
  }}
>
      <DialogContent sx={{ p: 4, width:'130%',height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AgentGeneralInfo
          open={open}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}