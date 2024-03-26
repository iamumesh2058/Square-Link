import styled from 'styled-components';

const Wrapper = styled.article`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  .copyright{
    h5{
        margin-bottom: 1rem;
    }
  }

  .social-media{
    display: flex;
    .link{
        display: block;
        color: var(--primary-500);
        margin: 1rem;
        font-size: x-large;
    }
  }

`;

export default Wrapper;
