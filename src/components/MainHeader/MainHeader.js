import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { Link } from 'react-router-dom';

const MainHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Games List">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName element={Link} to="/" prefix="Games List">
        </HeaderName>
        <HeaderNavigation aria-label="Games List">
          <HeaderMenuItem element={Link} to="/acessos">
            Meus Acessos
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/noticias">
            Notícias
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/jogos">
            Jogos
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/tags">
            Tags
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/plataformas">
            Plataformas
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/lojas">
            Lojas
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to="/desenvolvedoras">
            Desenvolvedoras
          </HeaderMenuItem>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem element={Link} to="/acessos">
              Meus Acessos
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/notícias">
                Notícias
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/jogos">
                Jogos
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/tags">
                Tags
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/plataformas">
                Plataformas
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/lojas">
                Lojas
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/desenvolvedoras">
                Desenvolvedoras
              </HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
      </Header>
    )}
  />
);

export default MainHeader;
