import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BuildIcon from '@material-ui/icons/Build';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
  SidebarSubmenu,
  SidebarSubmenuItem,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { MyGroupsSidebarItem } from '@backstage/plugin-org';
import GroupIcon from '@material-ui/icons/People';
import {useApp} from "@backstage/core-plugin-api";
import {devToolsAdministerPermission} from "@backstage/plugin-devtools-common";
import {RequirePermission} from "@backstage/plugin-permission-react";

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={HomeIcon} to="catalog" text="Home">
          <SidebarSubmenu title="Catalog">
            <SidebarSubmenuItem
                title="Domains"
                to="catalog?filters[kind]=domain"
                icon={useApp().getSystemIcon('kind:domain')}
            />
            <SidebarSubmenuItem
                title="Systems"
                to="catalog?filters[kind]=system"
                icon={useApp().getSystemIcon('kind:system')}
            />
            <SidebarSubmenuItem
                title="Components"
                to="catalog?filters[kind]=component"
                icon={useApp().getSystemIcon('kind:component')}
            />
            <SidebarSubmenuItem
                title="APIs"
                to="catalog?filters[kind]=api"
                icon={useApp().getSystemIcon('kind:api')}
            />
            <SidebarDivider />
            <SidebarSubmenuItem
                title="Resources"
                to="catalog?filters[kind]=resource"
                icon={useApp().getSystemIcon('kind:resource')}
            />
            <SidebarDivider />
            <SidebarSubmenuItem
                title="Groups"
                to="catalog?filters[kind]=group"
                icon={useApp().getSystemIcon('kind:group')}
            />
            <SidebarSubmenuItem
                title="Users"
                to="catalog?filters[kind]=user"
                icon={useApp().getSystemIcon('kind:user')}
            />
          </SidebarSubmenu>
        </SidebarItem>
        <MyGroupsSidebarItem
          singularTitle="My Group"
          pluralTitle="My Groups"
          icon={GroupIcon}
        />
        <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={ExtensionIcon} to="newrelic" text="New Relic" />
          {/* Items in this group will be scrollable if they run out of space */}
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarSettings />
        <RequirePermission
          permission={devToolsAdministerPermission}
          errorPage={<></>}>
            <SidebarItem icon={BuildIcon} to="devtools" text="DevTools" />
        </RequirePermission>
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);
