// project-imports
import samplePage from './sample-page';
import support from './support';
import pages from './pages';
import build from './build';
// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  // items: [samplePage, pages, support,build]
    items: [samplePage,build]
};

export default menuItems;
