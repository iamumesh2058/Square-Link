import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem 2rem 2rem;


  .main-content-gameroom{
    display: grid;
  }

  .players-list{
    h4{
        margin-bottom: 1rem;
    }

    li{
        margin-bottom: 1rem;
    }
  }
 

  .gameboard-container{

    h5{
        margin-bottom: 1rem;
        margin-left: 3rem;
    }
  }


  @media (min-width: 992px) {
    .main-content-gameroom {
      grid-template-columns: 1fr 3fr;
      justify-content: center;
    }
  }
`;

export default Wrapper;
