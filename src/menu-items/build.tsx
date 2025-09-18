// assets
import { Book1, I24Support, Security, MessageProgramming, DollarSquare, Airplane } from '@wandersonalwes/iconsax-react';

// types
import { NavItemType } from 'types/menu';

// icons
const icons = {
  page: Book1,
  authentication: Security,
  maintenance: MessageProgramming,
  pricing: DollarSquare,
  contactus: I24Support,
  landing: Airplane
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const build: NavItemType = {
  id: 'group-pages',
  title: 'build',
  type: 'group',
  icon: icons.page,
  children: [
    {
      id: 'agents',
      title: 'Agents',
      type: 'item',
      url: '/build/agents',
      icon: icons.contactus,
     
    },
    {
      id: 'knowledgeBase',
      title: 'knowledgeBase',
      type: 'item',
      url: '/build/knowledgeBase',
      icon: icons.contactus,
    
    }
  ]
};

export default build;
