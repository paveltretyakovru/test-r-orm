/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AppBar } from './compoennts/app-bar';
import { Banner } from './compoennts/banner';

import facebookImageUrl from './assets/footer/socials/facebook.png';
import vkImageUrl from './assets/footer/socials/vk.png';
import instaImageUrl from './assets/footer/socials/insta.png';
import gplayImageUrl from './assets/footer/apps/gplay.png';
import astoreImageUrl from './assets/footer/apps/astore.png';
import { Outlet, useNavigate } from 'react-router';

export default function Layout() {
  const navigate = useNavigate();
  const bannerClick = useCallback(() => {
    alert('Banner is clicked');
  }, []);

  const navigateToRoot = useCallback(() => navigate('/'), []);

  const isSmallScreen = useMediaQuery({ maxWidth: 991 });
  const isLargeScreen = useMediaQuery({ minWidth: 992 });

  return (
    <>
      <MainContainer style={{ margin: 'auto' }}>
        <Row style={{ flexGrow: 1 }}>
          <Col>
            <Row style={{ height: '100%' }}>
              <Col>
                <AppBar />

                {/* Baners small devices */}
                {isSmallScreen && (
                  <BannersRow className="border-0">
                    <Col>
                      <Banner smallDevice={true} onClick={bannerClick} />
                    </Col>
                  </BannersRow>
                )}

                <Row>
                  <Col>
                    <main>
                      <Outlet />
                    </main>
                  </Col>
                </Row>
              </Col>

              {/* Banners big devices */}
              {isLargeScreen && (
                <BigBannerCol md={3}>
                  <Banner onClick={bannerClick} />
                </BigBannerCol>
              )}
            </Row>
          </Col>
        </Row>
      </MainContainer>

      <Footer>
        <Container>
          <Row
            className="items-center justify-between"
            style={{ minHeight: 160 }}
          >
            {isSmallScreen && (
              <Col
                xs={12}
                md={6}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Logo onClick={navigateToRoot}>React</Logo>
              </Col>
            )}

            {isLargeScreen && (
              <Col
                xs={12}
                md={6}
                style={{ display: 'flex', justifyContent: 'start' }}
              >
                <Logo onClick={navigateToRoot}>React</Logo>
              </Col>
            )}

            <Col xs={12} md={3}>
              <Contacts>
                <Socials>
                  <ContactLabel>Присоединяйтесь к нам</ContactLabel>
                  <ContactImages>
                    <img src={facebookImageUrl} width={28} height={28} alt="" />
                    <img src={vkImageUrl} width={28} height={28} alt="" />
                    <img src={instaImageUrl} width={28} height={28} alt="" />
                  </ContactImages>
                </Socials>
              </Contacts>
            </Col>

            <Col xs={12} md={3}>
              <Contacts>
                <Stores>
                  {isLargeScreen && (
                    <ContactLabel>Устанавливайте приложение</ContactLabel>
                  )}
                  <ContactImages>
                    <img src={gplayImageUrl} width={104} height={32} alt="" />
                    <img src={astoreImageUrl} width={104} height={32} alt="" />
                  </ContactImages>
                </Stores>
              </Contacts>
            </Col>
          </Row>
          <Row style={{ marginTop: 'auto', justifyContent: 'center' }}>
            <Col>
              {isSmallScreen && (
                <CopyrightWrapper style={{ zoom: '0.7', marginTop: 20 }}>
                  ©Sionic <a href="#">Правовая информация</a>{' '}
                  <a href="#">Политика конфиденциальности</a>
                </CopyrightWrapper>
              )}

              <CopyrightWrapper>
                <span>©Sionic</span>
                <a href="#">Правовая информация</a>{' '}
                <a href="#">Политика конфиденциальности</a>
              </CopyrightWrapper>
            </Col>
          </Row>
        </Container>
      </Footer>
    </>
  );
}

const BigBannerCol = styled(Col)`
  border-left: 1px solid #f0f4fb;
`;

const CopyrightWrapper = styled.div`
  text-align: center;
  color: var(--color-copyright);

  a {
    margin-left: 20px;
  }
`;

const Contacts = styled.div`
  display: flex;
  justify-content: center;
`;

const Socials = styled.div``;

const Stores = styled(Socials)`
  margin-right: 0px;
`;

const ContactLabel = styled.div`
  white-space: nowrap;
`;

const ContactImages = styled.div`
  display: flex;
  margin-top: 10px;

  img {
    cursor: pointer;
  }

  img:not(:last-child) {
    margin-right: 16px;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  font-family: Raleway;
  font-size: 37px;
  font-weight: 700;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const MainContainer = styled(Container)`
  min-height: calc(100vh - var(--footer-height));
  display: flex;
  flex-direction: column;
`;

const BannersRow = styled(Row)`
  border-left: 1px solid #f0f4fb;
`;

const Footer = styled.footer`
  padding: '10px';
  height: var(--footer-height);
  background-color: #f8f8f8;
`;
