import styled from 'styled-components'
import { Link } from 'gatsby'

const GridItem = styled(Link)`
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.08) 20%, rgba(15, 23, 42, 0.78) 100%);
    transition: opacity 0.35s ease;
    z-index: 2;
  }

  > div {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  > div img {
    transition: transform 0.45s ease, filter 0.45s ease !important;
    will-change: transform;
  }

  > span {
    z-index: 3;
    color: #f8fafc;
    position: absolute;
    inset: auto ${(props) => props.theme.space[5]} ${(props) => props.theme.space[5]} ${(props) => props.theme.space[5]};
    text-align: left;
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSizes[3]};
    text-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
    letter-spacing: 0.01em;

    @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
      font-size: ${(props) => props.theme.fontSizes[2]};
      inset: auto ${(props) => props.theme.space[4]} ${(props) => props.theme.space[4]}
        ${(props) => props.theme.space[4]};
    }
  }

  &:hover,
  &:focus {
    > div img {
      transform: scale(1.08);
      filter: saturate(1.08);
    }

    &::after {
      opacity: 0.85;
    }
  }
`

export default GridItem
