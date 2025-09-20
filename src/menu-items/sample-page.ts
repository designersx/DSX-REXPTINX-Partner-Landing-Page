// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { DocumentCode2 } from '@wandersonalwes/iconsax-react';
import DashboardIcon from '@mui/icons-material/Dashboard';
// types
import { NavItemType } from 'types/menu';

// icons
const icons = {
  samplePage: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage: NavItemType = {
  id: 'sample-page',
  title: 'Dashboard',
  type: 'group',
  url: '/sample-page',
  icon: DashboardIcon,
};

export default samplePage;
