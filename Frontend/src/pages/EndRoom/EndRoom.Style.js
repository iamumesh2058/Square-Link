import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem 2rem 2rem;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr;

  .players-list{
    h3, h5{
      margin-bottom: 1rem;
    }

    .this-player{
      background: var(--background-color);
      padding: 0.8rem;
      width: 100%;
    }

    li{
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 992px){
    
  }
`;

export default Wrapper;
