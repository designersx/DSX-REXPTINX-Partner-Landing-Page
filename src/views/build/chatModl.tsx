'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import TransactionHistoryCard from './EditAgent'; // Chat component
import AgentGeneralInfos from './chatView';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatModal({ open, onClose, transcription }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          height: '90vh',
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AgentGeneralInfos
          transcription={transcription}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
