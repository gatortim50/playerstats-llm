import { FunctionComponent, PropsWithChildren } from 'react';
import TopBarAndSideBarLayout from './TopBarAndSideBarLayout';

// TODO: change to your app name or other word
const TITLE_PUBLIC = 'Public Forum'; // Title for pages without/before authentication

/**
 * Renders "Public Layout" composition
 * @layout PublicLayout
 */
const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const title = TITLE_PUBLIC;
  document.title = title; // Also Update Tab Title // TODO: Do we need this? Move it to useEffect()?

  return (
    <TopBarAndSideBarLayout sidebarItems={[]} title={title} variant="sidebarAlwaysTemporary">
      {children}
    </TopBarAndSideBarLayout>
  );
};

export default PublicLayout;
