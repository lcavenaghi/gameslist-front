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
  HeaderGlobalBar,
  HeaderGlobalAction
} from '@carbon/react';
import { Logout } from '@carbon/react/icons';
import { Link } from 'react-router-dom';
import checaPerfil from '../../util/checaPerfil';

const MainHeader = () => {

  const logout = (e) => {
    localStorage.removeItem("token");
    window.location.href = '#/login'
  }

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Games List">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName element={Link} to="/" prefix="">
            Games List
          </HeaderName>
          <HeaderNavigation aria-label="Games List">
            <HeaderMenuItem element={Link} to="/acessos">
              Meus Acessos
            </HeaderMenuItem>
            {checaPerfil(["gestor", "admin"]) === false ? <></> : <HeaderMenuItem element={Link} to="/noticias"> Notícias </HeaderMenuItem>}
            <HeaderMenuItem element={Link} to="/jogos">
              Jogos
            </HeaderMenuItem>
            {checaPerfil(["gestor", "admin"]) === false ? <></> : <HeaderMenuItem element={Link} to="/tags">Tags</HeaderMenuItem>}
            {checaPerfil(["gestor", "admin"]) === false ? <></> : <HeaderMenuItem element={Link} to="/plataformas"> Plataformas </HeaderMenuItem>}
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
                {checaPerfil(["gestor", "admin"]) === false ? <></> : <HeaderMenuItem element={Link} to="/noticias"> Notícias </HeaderMenuItem>}
                <HeaderMenuItem element={Link} to="/jogos">
                  Jogos
                </HeaderMenuItem>
                {checaPerfil(["gestor", "admin"]) === false ? <></> : <HeaderMenuItem element={Link} to="/tags">Tags</HeaderMenuItem>}
                {checaPerfil(["gestor", "admin"]) === false ? <></> : <HeaderMenuItem element={Link} to="/plataformas"> Plataformas </HeaderMenuItem>}
                <HeaderMenuItem element={Link} to="/lojas">
                  Lojas
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/desenvolvedoras">
                  Desenvolvedoras
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            <HeaderGlobalAction onClick={logout} aria-label="Logout">
              <Logout size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default MainHeader;
