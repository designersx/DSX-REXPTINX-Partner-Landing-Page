import Link from 'next/link';

// martial-imports
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { APP_DEFAULT_PATH,  } from 'config';

import GRID_COMMON_SPACING from 'config';

// assets
import { Add, Edit, Star1 } from '@wandersonalwes/iconsax-react';
const CourseImg1 = '/assets/images/users/avatar-1.png';
const CourseImg2 = '/assets/images/users/avatar-2.png';
const CourseImg3 = '/assets/images/users/avatar-3.png';
const CourseImg4 = '/assets/images/users/avatar-4.png';
// const CourseImg5 = '/assets/images/users/avatar-5.png';
// const CourseImg6 = '/assets/images/users/avatar-6.png';
// const CourseImg7 = '/assets/images/online-panel/courseImg7.png';
// const CourseImg8 = '/assets/images/online-panel/courseImg8.png';

const CardData = [
  {
    img: CourseImg1,
    title: 'Anthony',
    rate: 200,
    duration: '10 Months',
    teacher: 'Samsung',
    student: '200',
    tag: 'FREE'
  },
  { img: CourseImg2, title: 'Drothy', rate: 900, duration: '7 Months', teacher: 'Flipkart', student: '50+' ,tag:'Corporate'},
  { img: CourseImg3, title: 'Anthony', rate: 600, duration: '4 Months', teacher: 'Microsoft', student: '100+', tag: 'Starter' },
  {
    img: CourseImg4,
    title: 'Monika',
    rate: 1000,
    duration: '6 Months',
    teacher: 'Amazon',
    student: '20000',
    tag: 'Enterprise'
  },
//   { img: CourseImg5, title: 'Web Designing Course', rate: 4.2, duration: '3 Months', teacher: 'Tiger Nixon', student: '130+' },
//   { img: CourseImg6, title: 'C Training Course', rate: 4.8, duration: '7 Months', teacher: 'Airi Satou', student: '70+', tag: 'FREE' },
//   { img: CourseImg7, title: 'UI/UX Designing Course', rate: 4.6, duration: '4 Months', teacher: 'Sonya Frost', student: '150+' },
//   { img: CourseImg8, title: 'SEO Training Course', rate: 4.3, duration: '1 Year', teacher: 'Cedric Kelly', student: '60 +' }
];

const breadcrumbLinks = [{ title: 'home', to: APP_DEFAULT_PATH }, { title: 'online-courses' }, { title: 'courses' }, { title: 'view' }];

// ==============================|| COURSE - VIEW ||============================== //

export default function DemoAgentsViewPage() {
  const ItemRow = ({ title, value }: { title: string; value: string }) => {
    return (
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 5, py: 1 }}>
        <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    );
  };

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <Breadcrumbs custom heading="view" links={breadcrumbLinks} /> */}
        {/* <Button variant="contained" startIcon={<Add />} component={Link} href="/admin-panel/online-course/courses/add">
          Add Course
        </Button> */}
      </Stack>
      <Grid container spacing={GRID_COMMON_SPACING}>
        {CardData.map((course, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <MainCard content={false} sx={{ p: 1.25 }}>
              <Box sx={{ position: 'relative', width: 1 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={course.img}
                  alt="Course Image"
                  sx={{ width: 1, display: 'block', borderRadius: 1 }}
                />
                <Badge
                  sx={{
                    position: 'absolute',
                    top: 15,
                    right: 25,
                    '.MuiBadge-badge': { p: 0.5, borderRadius: 0.5, bgcolor: 'background.paper' }
                  }}
                  badgeContent={course.tag}
                />
              </Box>

              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 0.5, mt: 2.5, mb: 1.25 }}>
                <Stack sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 1 }}
                  >
                    {course.title}
                  </Typography>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, color: 'warning.main' }}>
                    <Star1 size="14" />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {course.rate}
                    </Typography>
                  </Stack>
                </Stack>
                <IconButton size="small" color="secondary" sx={{ minWidth: 30 }}>
                  <Edit fontSize="small" />
                </IconButton>
              </Stack>

              <Divider />
              <Stack>
                <ItemRow title="Call Duration" value={course.duration} />
                <Divider />
                <ItemRow title="Business" value={course.teacher} />
                <Divider />
                {/* <ItemRow title="Mins Left" value={course.student} /> */}
              </Stack>

              <Button variant="outlined" size="small" sx={{ mt: 1.25 }}>
                Read More
              </Button>
            </MainCard>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ alignItems: 'flex-end', mt: 2.5 }}>
        <Pagination count={5} size="medium" page={1} showFirstButton showLastButton variant="combined" color="primary" />
      </Stack>
    </>
  );
}
