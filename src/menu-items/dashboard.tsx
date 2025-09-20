

// This is example of menu item without group for horizontal layout. There will be no children.

// assets
import { DocumentCode2 } from '@wandersonalwes/iconsax-react';

// types
import { NavItemType } from 'types/menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

// icons
const icons = {
  samplePage: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage: NavItemType = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  url: '/dashboard/analytics',
  icon: DashboardIcon
};

export default samplePage;
