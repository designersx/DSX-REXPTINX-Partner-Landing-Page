'use client';
// material-ui
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ChatModal from './chatModl';

import { Eye } from '@wandersonalwes/iconsax-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Sample Transcription (use actual transcription data)
const sampleTranscription = [
  { id: 1, sender: 'Agent', message: 'Hello! How can I help you today?', timestamp: '2025-09-19 10:00 AM' },
  { id: 2, sender: 'Customer', message: 'Hi! I have an issue with my last order.', timestamp: '2025-09-19 10:01 AM' },
  { id: 3, sender: 'Agent', message: 'I’m sorry to hear that. Could you share your order ID?', timestamp: '2025-09-19 10:02 AM' },
];

export default function TransactionHistoryCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [calldata, setCallData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const month = '9';
        const year = '2025';
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/callHistory/agent/agent_3c98cf526c459125822204e1d7/calls-by-month`, {
          params: { month, year },
          headers: { Authorization: `Bearer ${token}` }
        });
        setCallData(response?.data?.calls);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Convert milliseconds to minutes
  const formatDuration = (duration_ms) => {
    const seconds = Math.floor(duration_ms / 1000); // Convert to seconds
    const minutes = Math.floor(seconds / 60); // Convert to minutes
    return minutes;
  };

  return (
    <>
      <MainCard title={<Typography variant="h5">Call Details</Typography>} content={false}>
        <TableContainer>
          <Table sx={{ minWidth: 560 }}>
            <TableHead>
              <TableRow>
                <TableCell>Call Id</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Date/Time</TableCell>
                <TableCell align="center">Call duration</TableCell>
                <TableCell align="center">Lead Type</TableCell>
                <TableCell align="center">Call Type</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calldata.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell align="center">
                    <Typography>{row?.call_id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row?.custom_analysis_data?.reason || 'No reason'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography>{new Date(row.start_timestamp).toLocaleString()}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {formatDuration(row?.duration_ms)} min
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{formatDuration(row?.duration_ms)} min</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip size="small" color="info" label={row?.custom_analysis_data?.lead_type || 'N/A'} />
                  </TableCell>
                  <TableCell align="center">
                    <Chip size="small" color="primary" label={row?.call_type || 'N/A'} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Tooltip title="View Transcription">
                        <IconButton color="secondary" onClick={() => setOpen(true)}>
                          <Eye />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Play Recording">
                        <IconButton color="primary">
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" style={{ fill: 'currentColor' }}>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {/* Chat Modal for Transcription */}
      <ChatModal open={open} onClose={() => setOpen(false)} transcription={sampleTranscription} />
    </>
  );
}
