import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
    firstProject: {
      title: string
      slug: string
      cover: ChildImageSharp
    }
    threeProjects: {
      nodes: {
        title: string
        slug: string
        cover: ChildImageSharp
      }[]
    }
    aboutUs: ChildImageSharp
    instagram: ChildImageSharp
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: minmax(280px, 40vh) minmax(220px, 30vh) minmax(220px, 30vh);
  grid-template-areas:
    'first-project first-project first-project about-us about-us about-us'
    'first-project first-project first-project three-project-1 three-project-2 three-project-3'
    'instagram instagram instagram instagram instagram instagram';
  gap: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[6]};

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(220px, 1fr));
    grid-template-areas:
      'first-project first-project'
      'about-us about-us'
      'three-project-1 three-project-2'
      'three-project-3 three-project-3'
      'instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, minmax(200px, 1fr));
    grid-template-areas:
      'first-project'
      'about-us'
      'three-project-1'
      'three-project-2'
      'three-project-3'
      'instagram';
    padding: ${(props) => props.theme.space[4]};
  }
`

const TileContent = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space[2]};

  small {
    font-size: ${(props) => props.theme.fontSizes[0]};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`

const FirstProject = styled(GridItem)`
  grid-area: first-project;
`

const AboutUs = styled(GridItem)`
  grid-area: about-us;
`

const ProjectOne = styled(GridItem)`
  grid-area: three-project-1;
`

const ProjectTwo = styled(GridItem)`
  grid-area: three-project-2;
`

const ProjectThree = styled(GridItem)`
  grid-area: three-project-3;
`

const Instagram = styled(GridItem)`
  grid-area: instagram;
`

const Index: React.FunctionComponent<PageProps> = ({ data: { firstProject, threeProjects, aboutUs, instagram } }) => {
  const pageAnimation = useSpring({
    config: config.default,
    from: { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        <FirstProject to={firstProject.slug} aria-label={`View project "${firstProject.title}"`}>
          <Img fluid={firstProject.cover.childImageSharp.fluid} />
          <TileContent>
            {firstProject.title}
            <small>Featured Story</small>
          </TileContent>
        </FirstProject>
        <AboutUs to="/about" aria-label="Visit my about page">
          <Img fluid={aboutUs.childImageSharp.fluid} />
          <TileContent>
            About
            <small>Behind the Lens</small>
          </TileContent>
        </AboutUs>
        <ProjectOne to={threeProjects.nodes[0].slug} aria-label={`View project "${threeProjects.nodes[0].title}"`}>
          <Img fluid={threeProjects.nodes[0].cover.childImageSharp.fluid} />
          <TileContent>
            {threeProjects.nodes[0].title}
            <small>Latest Work</small>
          </TileContent>
        </ProjectOne>
        <ProjectTwo to={threeProjects.nodes[1].slug} aria-label={`View project "${threeProjects.nodes[1].title}"`}>
          <Img fluid={threeProjects.nodes[1].cover.childImageSharp.fluid} />
          <TileContent>
            {threeProjects.nodes[1].title}
            <small>Curated Set</small>
          </TileContent>
        </ProjectTwo>
        <ProjectThree to={threeProjects.nodes[2].slug} aria-label={`View project "${threeProjects.nodes[2].title}"`}>
          <Img fluid={threeProjects.nodes[2].cover.childImageSharp.fluid} />
          <TileContent>
            {threeProjects.nodes[2].title}
            <small>Visual Essay</small>
          </TileContent>
        </ProjectThree>
        <Instagram to="/instagram" aria-label="See my Instagram pictures">
          <Img fluid={instagram.childImageSharp.fluid} />
          <TileContent>
            Instagram
            <small>Daily Frames</small>
          </TileContent>
        </Instagram>
      </Area>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query Index {
    firstProject: projectsYaml {
      title
      slug
      cover {
        childImageSharp {
          fluid(quality: 95, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    threeProjects: allProjectsYaml(limit: 3, skip: 1) {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    aboutUs: file(sourceInstanceName: { eq: "images" }, name: { eq: "about-us" }) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    instagram: file(sourceInstanceName: { eq: "images" }, name: { eq: "instagram" }) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
