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
import { useRouter } from "next/router";
import { Eye } from '@wandersonalwes/iconsax-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAgentCallById } from '../../../Services/auth';
// import { TablePaginationActions } from '@mui/material';
import { TablePagination } from '@mui/material';

// Sample Transcription (use actual transcription data)
const sampleTranscription = [
  { id: 1, sender: 'Agent', message: 'Hello! How can I help you today?', timestamp: '2025-09-19 10:00 AM' },
  { id: 2, sender: 'Customer', message: 'Hi! I have an issue with my last order.', timestamp: '2025-09-19 10:01 AM' },
  { id: 3, sender: 'Agent', message: 'I’m sorry to hear that. Could you share your order ID?', timestamp: '2025-09-19 10:02 AM' },
];
export default function TransactionHistoryCard({ agentId }) {
  console.log(agentId, "agentId")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [calldata, setCallData] = useState([]);
  const [Transcription, setTranscription] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
const [playingCallId, setPlayingCallId] = useState(null);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(50);
 const [agent, setAgent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const month = '9';
        const year = '2025';
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/callHistory/agent/${agentId}/calls-by-month`, {
          params: { month, year },
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response?.data, "response?.data?.status")
        if (response) {
          setCallData(response?.data?.calls);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [agentId]);
  // Convert milliseconds to minutes
 const formatDuration = (duration_ms) => {
  const totalSeconds = Math.floor(duration_ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Pad single digit seconds with a 0 (e.g., 1:05 instead of 1:5)
  const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return formatted;
};

   
  
  const handleViewCallHistory = async (call) => {
    setOpen(true)
    // console.log(call, "HELLO")
    const agentId = call.agent_id
    const callId = call.call_id
    const start_timestamp= call.start_timestamp
    // const agentId=agent_id
    //  const  callId=callId
     const res = await getAgentCallById(agentId, callId, start_timestamp)
     console.log(res,"res")
     setTranscription(res?.call?.transcript_object ||[])
  }

 const handlePlayPauseRecording = (url, callId) => {
  if (!url) return;

  // If the same audio is already playing, toggle pause/play
  if (playingCallId === callId) {
    currentAudio.pause();
    setPlayingCallId(null);
    return;
  }

  // Stop previous audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(url);
  audio.play().catch((err) => console.error("Playback failed", err));

  setCurrentAudio(audio);
  setPlayingCallId(callId);

  // When audio ends
  audio.onended = () => {
    setPlayingCallId(null);
  };
};
// console.log(calldata[0]?.duration_ms)
useEffect(() => {
  const fetchAgent = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/getAgent/${agentId}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Adjust token storage as needed
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch agent');
      }

      const data = await res.json(); 
      console.log(data, "data"); // Fixed this line
      setAgent(data);
    } catch (err) {
      console.log(err.message); 
    } 
  };

  fetchAgent();
}, [agentId]);

const getColor = (sentiment?: string) => {
  if (!sentiment) return "default";

  switch (sentiment.toLowerCase()) {
    case "positive":
      return "success"; // green
    case "negative":
      return "error"; // red
    case "neutral":
      return "warning"; // yellow/orange
    default:
      return "default"; // grey
  }
};
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

  return (
    <>
      <MainCard title={<Typography variant="h5">Call Details</Typography>} content={false}>
        <TableContainer>
          <Table sx={{ minWidth: 560 }}>
            <TableHead>
              <TableRow>
                 <TableCell>Date/Time</TableCell>
                 <TableCell align="center">Call duration</TableCell>
               
                <TableCell>Reason</TableCell>
               
                
                <TableCell align="center">Lead Type</TableCell>
                 <TableCell>Sentiment</TableCell>
                <TableCell align="center">Call Type</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calldata?.length > 0 ?
                calldata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Stack>
                        <Typography>{new Date(row.start_timestamp).toLocaleString()}</Typography>
                         {/* <Typography>{new Date(row.end_timestamp).toLocaleString()}</Typography> */}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{formatDuration(row?.duration_ms)} min</Typography>
                    </TableCell>
                  
                    <TableCell>
                   <Tooltip title={row?.custom_analysis_data?.reason || 'No reason'}>
  <Typography>
    {(row?.custom_analysis_data?.reason || 'No reason').length > 40
      ? `${row.custom_analysis_data.reason.slice(0, 40)}...`
      : row.custom_analysis_data.reason || 'No reason'}
  </Typography>
</Tooltip>

                    </TableCell>
                    
                    
                    <TableCell align="center">
                      <Chip size="small" color="info" label={row?.custom_analysis_data?.lead_type || 'N/A'} />
                    </TableCell>
                      <TableCell align="center">
                      <Typography>
                           {/* <Chip size="small" color={getColor(row?.user_sentiment)} label={row?.user_sentiment}/> */}
                           <Chip
                            size="small"
                            color={getColor(row?.user_sentiment)}
                            label={row?.user_sentiment || "N/A"}
                          />
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip size="small" color="primary" label={row?.call_type || 'N/A'} />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title="View Transcription">
                          <IconButton color="secondary" onClick={() => handleViewCallHistory(row)}>
                            <Eye />
                          </IconButton>
                        </Tooltip>
                    <Stack direction="row" spacing={1}>
  {/* Play/Pause Button */}
  <Tooltip title={playingCallId === row.call_id ? "Pause Recording" : "Play Recording"}>
    <IconButton
      color="primary"
      onClick={() => handlePlayPauseRecording(row.recording_url, row.call_id)}
    >
      {
        playingCallId === row.call_id ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: 'currentColor' }}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: 'currentColor' }}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
          </svg>
        )
      }
    </IconButton>
  </Tooltip>

  {/* Open in New Tab */}
  <Tooltip title="Play in New Tab">
    <a href={row.recording_url} target="_blank" rel="noopener noreferrer">
      <IconButton color="secondary">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: 'currentColor' }}>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M14 2v2h3.59L10 11.59 11.41 13 19 5.41V9h2V2zM5 5v14h14v-6h-2v4H7V7h4V5H5z" />
        </svg>
      </IconButton>
    </a>
  </Tooltip>
</Stack>

                      </Stack>
                    </TableCell>
                  </TableRow>
                )) : <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" color="text.secondary">
                      No data available
                    </Typography>
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
               <TablePagination
                  component="div"
                  count={calldata.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
      </MainCard>

      {/* Chat Modal for Transcription */}
      <ChatModal open={open} onClose={() => setOpen(false)} transcription={Transcription} />
    </>
  );
}
