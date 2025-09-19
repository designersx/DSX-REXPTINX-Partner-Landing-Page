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

// project-imports
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';

// assets
import { Edit, Eye, Trash } from '@wandersonalwes/iconsax-react';
const Avatar1 = '/assets/images/avatrs/Female-01.png';
const Avatar2 = '/assets/images/avatrs/male-01.png';
const Avatar3 = '/assets/images/avatrs/Female-02.png';
const Avatar4 = '/assets/images/avatrs/male-02.png';
const Avatar5 = '/assets/images/avatrs/male-03.png';

// table data
function createData(
  name: string,
  avatar: string,
  position: string,
  date: string,
  time: string,
  Amount: number,
  status: string,
  color: string
) {
  return { name, avatar, position, date, time, Amount, status, color };
}

type ChipColor = 'default' | 'success' | 'warning' | 'error' | 'secondary' | 'primary' | 'info';

const getValidColor = (color: string): ChipColor => {
  const validColors: ChipColor[] = ['default', 'success', 'warning', 'error', 'secondary', 'primary', 'info'];
  return validColors.includes(color as ChipColor) ? (color as ChipColor) : 'default';
};

const rows = [
  createData('Airi Satou', Avatar1, 'Samsung', ' 2023/02/07', '09:05 PM', 950, 'Active', 'success'),
  createData('Ashton Cox', Avatar2, 'Microsoft', '2023/02/01', '02:14 PM', 520, 'Active', 'success'),
  createData('Bradley Greer', Avatar3, 'You Tube ', '2023/01/22', '10:32 AM', 100, 'Active', 'success'),
  createData('Brielle Williamson', Avatar4, 'Amazon', '2023/02/07', '09:05 PM', 760, 'Inactive', 'error'),
  createData('Airi Satou', Avatar5, 'Spotify', '2023/02/07', '09:05 PM', 60, 'Inactive', 'error')
];

// ==========================|| FINANCE - TRANSFER HISTORY ||========================== //

export default function TransactionHistoryCard() {
  return (
    <MainCard
      title={<Typography variant="h5">Your Agents</Typography>}
      content={false}
      // secondary={
      //   <Link href="#" variant="h6" color="primary">
      //     View All
      //   </Link>
      // }
    >
      <TableContainer>
        <Table sx={{ minWidth: 560 }}>
          <TableHead>
            <TableRow>
              <TableCell>Agent Name</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Date/Time</TableCell>
              <TableCell align="center">Mins Assign</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell align="center">
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar alt={row.name} src={row.avatar} />
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
                      {row.time}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Typography>{row.Amount}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip size="small" color={getValidColor(row.color)} label={row.status} />
                </TableCell>
                <TableCell>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Tooltip title="View">
                      <IconButton color="secondary">
                        <Eye />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error">
                        <Trash />
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
  );
}
