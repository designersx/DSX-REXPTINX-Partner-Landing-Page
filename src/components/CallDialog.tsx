import React from 'react';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project imports
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import MainCard from 'components/MainCard';
import { APP_DEFAULT_PATH } from 'config';
import GRID_COMMON_SPACING from 'config';

// assets
import { Star1 } from '@wandersonalwes/iconsax-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  CardMedia,
  Stack,
  CircularProgress,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';

type CallDialogProps = {
  open: boolean;
  onClose: () => void;
  agent: any;
  isCallActive: boolean;
  callLoading: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
  isEndingRef: React.MutableRefObject<boolean>;
};

const CallDialog: React.FC<CallDialogProps> = ({
  open,
  onClose,
  agent,
  isCallActive,
  callLoading,
  onStartCall,
  onEndCall,
  isEndingRef,
}) => {
  const displayAgentName = agent?.agentName && agent.agentName.length > 15
    ? agent.agentName.slice(0, 12) + "..."
    : agent?.agentName || "Agent";
  const displayBusinessName = agent?.businessDetails?.name || agent?.company || "Enterprise";

  const handleClose = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      return; // Ignore backdrop clicks to prevent closing
    }
    onEndCall();
    onClose(); // Allow closing for other reasons (e.g., close button)
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          p: 2,
          bgcolor: 'background.paper',
          boxShadow: 3,
          minWidth: { xs: '90%', sm: 320 },
        },
      }}
    >
      <DialogTitle sx={{ p: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            image={
              agent?.avatar
                ? agent.avatar.startsWith("/")
                  ? agent.avatar
                  : `/${agent.avatar}`
                : "/images/male-02.png"
            }
            alt={displayAgentName}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              mx: 'auto',
              border: '2px solid',
              borderColor: 'primary.main',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {displayAgentName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {displayBusinessName} Agent
        </Typography>
        {isEndingRef.current ? (
          <Stack alignItems="center" spacing={2}>
            <CircularProgress size={24} color="error" />
            <Typography color="error.main">Disconnecting...</Typography>
          </Stack>
        ) : callLoading ? (
          <Stack alignItems="center" spacing={2}>
            <CircularProgress size={24} color="success" />
            <Typography color="success.main">Connecting...</Typography>
          </Stack>
        ) : isCallActive ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<CallIcon />}
            onClick={onEndCall}
            sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 'medium' }}
            fullWidth
          >
            End Call
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            startIcon={<CallIcon />}
            onClick={onStartCall}
            sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 'medium' }}
            fullWidth
          >
            Start Call
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;