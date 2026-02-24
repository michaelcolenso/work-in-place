import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { readableColor } from 'polished'
import 'typeface-work-sans'
import { Box, Flex } from '../elements'
import theme from '../../config/theme'
import reset from '../styles/reset'
import Logo from './logo'

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ::selection {
    color: white;
    background-color: ${theme.colors.primary};
  }

  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: ${theme.fontWeights.bold};
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }

    @media (max-width: 600px) {
      font-size: 16px;

      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }

  body {
    border: 0;
    margin: 0;
    padding: 0;
    color: #111827;
    font-family: 'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: radial-gradient(circle at top, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
  }

  a {
    transition: color 0.25s ease-in-out, opacity 0.25s ease-in-out;
    color: #0f172a;
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  }

  ${reset}
`

const isPartiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) =>
  isPartiallyCurrent ? { className: 'navlink-active navlink' } : { className: 'navlink' }

const PartialNavLink = ({ children, to, ...rest }: { children: React.ReactNode; to: string }) => (
  <Link getProps={isPartiallyActive} to={to} {...rest}>
    {children}
  </Link>
)

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.theme.sidebarWidth.big} 1fr;
  min-height: 100vh;

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    grid-template-columns: ${(props) => props.theme.sidebarWidth.normal} 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
  }
`

const SideBarInner = styled(Box)<{ bg: string }>`
  position: sticky;
  top: 0;
  height: 100vh;
  width: ${(props) => props.theme.sidebarWidth.big};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  z-index: 20;
  background: linear-gradient(165deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9));
  backdrop-filter: blur(14px);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.35);

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    width: ${(props) => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    position: relative;
    height: auto;
    width: 100%;
  }

  svg {
    fill: ${(props) => readableColor(`${props.bg}`)};
  }
`

const Nav = styled(Flex)<{ color: string }>`
  gap: ${(props) => props.theme.space[3]};

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.85);
    font-size: ${(props) => props.theme.fontSizes[2]};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    &:hover,
    &:focus,
    &.navlink-active {
      color: #ffffff;
      opacity: 1;
    }

    @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
      font-size: ${(props) => props.theme.fontSizes[1]};
      margin-left: ${(props) => props.theme.space[4]};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
      margin-left: ${(props) => props.theme.space[3]};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
      font-size: ${(props) => props.theme.fontSizes[0]};
      margin-left: ${(props) => props.theme.space[2]};
    }
  }
`

const Main = styled.main`
  @media (min-width: calc(${(props) => props.theme.breakpoints[2]} + 1px)) {
    grid-column-start: 2;
  }
`

const Footer = styled.footer<{ color: string }>`
  position: fixed;
  width: ${(props) => props.theme.sidebarWidth.big};
  bottom: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);

  a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    &:hover {
      color: ${theme.colors.primary};
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    width: ${(props) => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }
`

type LayoutProps = { children: React.ReactNode } & typeof defaultProps

const defaultProps = {
  color: 'white',
}

interface QueryResult {
  navigation: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Wrapper>
          <SideBarInner bg={color} as="aside" p={[6, 6, 8]}>
            <Flex
              flexWrap="nowrap"
              flexDirection={['row', 'row', 'row', 'column']}
              alignItems={['center', 'center', 'center', 'flex-start']}
              justifyContent="space-between"
            >
              <Box width={['3rem', '4rem', '5rem', '6rem']}>
                <Link to="/" aria-label="LekoArts, Back to Home">
                  <Logo />
                </Link>
              </Box>
              <Nav
                color={color}
                mt={[0, 0, 0, 10]}
                as="nav"
                flexWrap="nowrap"
                flexDirection={['row', 'row', 'row', 'column']}
                alignItems="flex-start"
              >
                {data.navigation.nodes.map((item) => (
                  <PartialNavLink to={item.link} key={item.name}>
                    {item.name}
                  </PartialNavLink>
                ))}
              </Nav>
            </Flex>
          </SideBarInner>
          <Main>{children}</Main>
          <Footer color={color}>
            <Box p={[6, 6, 8]} fontSize={0}>
              Starter by <a href="https://www.lekoarts.de/en">LekoArts</a>.
              <br />
              <a href="https://github.com/LekoArts/gatsby-starter-portfolio-jodie">Source</a>.
            </Box>
          </Footer>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.defaultProps = defaultProps

const query = graphql`
  query Layout {
    navigation: allNavigationYaml {
      nodes {
        name
        link
      }
    }
  }
`
