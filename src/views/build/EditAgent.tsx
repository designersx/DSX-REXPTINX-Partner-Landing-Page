

'use client';
// material-ui
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from "@mui/icons-material/Download";

// project-imports
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import AgentGeneralInfoModal from './AgentgeneralinfoModal'; 

// assets
import {Add, Edit, Eye, Trash } from '@wandersonalwes/iconsax-react';
import { useState } from 'react';
import ChatModal from './chatModl';

import { useRouter } from 'next/navigation';
const Avatar1 = '/assets/images/avatrs/Female-01.png';
const Avatar2 = '/assets/images/avatrs/male-01.png';
const Avatar3 = '/assets/images/avatrs/Female-02.png';
const Avatar4 = '/assets/images/avatrs/male-02.png';
const Avatar5 = '/assets/images/avatrs/male-03.png';
const sampleTranscription = [
  {
    id: 1,
    sender: 'Agent',
    message: 'Hello! How can I help you today?',
    timestamp: '2025-09-19 10:00 AM',
  },
  {
    id: 2,
    sender: 'Customer',
    message: 'Hi! I have an issue with my last order.',
    timestamp: '2025-09-19 10:01 AM',
  },
  {
    id: 3,
    sender: 'Agent',
    message: 'I’m sorry to hear that. Could you share your order ID?',
    timestamp: '2025-09-19 10:02 AM',
  },
];

// table data
function createData(
  name: string,
  avatar: string,
  position: string,
  date: string,
  time: string,
  Amount: number,
  status: string,
  callType:string,
  color: string
) {
  return { name, avatar, position, date, time, Amount, status, color };
}

type ChipColor = 'default' | 'success' | 'warning' | 'error' | 'secondary' | 'primary' | 'info';

const getValidColor = (color: string): ChipColor => {
  const validColors: ChipColor[] = ['default', 'success', 'warning', 'error', 'secondary', 'primary', 'info'];
  return validColors.includes(color as ChipColor) ? (color as ChipColor) : 'default';
};
 const CustomPlayIcon = () => (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      style={{ fill: 'currentColor' }} // Match Material-UI icon color
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M8 5v14l11-7z" />
    </svg>
  );
const rows = [
  createData('call_4736557569524', Avatar1, 'Testing', '2023/02/07', '09:05 PM', 2.30, 'Spam', "callType",'webcall'),
  createData('call_4736557569524', Avatar2, 'Ticketing', '2023/02/01', '02:14 PM', 6.30, 'irrelevant', "callType",'webcall'),
  createData('call_4736557569524', Avatar3, 'Complaint ', '2023/01/22', '10:32 AM', 5.30, 'relevant',"callType", 'phonecall'),
  createData('call_4736557569524', Avatar4, 'Test', '2023/02/07', '09:05 PM', 4.30, 'relevant',"callType", 'webcall'),
  createData('call_4736557569524', Avatar5, 'Query', '2023/02/07', '09:05 PM', 3.30, 'irrelevant',"callType", 'webcall')
];

export default function TransactionHistoryCard() {
    const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

  const handleCreateAgentClick = () => {
    console.log('ddsds',isModalOpen);
    setIsModalOpen(true);
  };
  
  const handleAgentSubmit = (agentData) => {
    console.log('Agent created:', agentData);
    // Handle successful agent creation - you might want to refresh your agents list here
    setIsModalOpen(false);
    // Optionally refresh the table data or show a success message
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MainCard
        title={<Typography variant="h5">Call Details</Typography>}
        content={false}
        // secondary={
        //  <Button variant="contained" startIcon={<Add />} size="large" onClick={handleCreateAgentClick}> <Link 
        //     href="#" 
        //     variant="h5" 
        //     color="white"
        //     component="button"
            
        //     sx={{ textDecoration: 'none' }}
        //   >
        //     Create Agent 
        //   </Link>
        //   </Button>
        // }
      >
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
              {rows.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell align="center">
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                      {/* <Avatar alt={row.name} src={row.avatar} /> */}
                      <Typography>{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.position}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography>{row.date}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {row.time}sec
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.Amount}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip size="small" color={getValidColor(row.color)} label={row.status} />
                  </TableCell>
                    <TableCell align="center">
                    <Chip size="small" color={getValidColor(row.color)} label={row.callType} />
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
                           <CustomPlayIcon /> 
                        </IconButton> 
                      </Tooltip>
                      {/* <Tooltip title="Download call recording ">
                        <IconButton color="error">
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>  */}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {/* Agent Creation Modal */}
        <ChatModal
        open={open}
        onClose={() => setOpen(false)}
        transcription={sampleTranscription}
      />
    </>
  );
}