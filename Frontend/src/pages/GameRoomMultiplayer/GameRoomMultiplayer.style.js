import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem 2rem 2rem;


  .main-content-gameroom{
    display: grid;
    grid-gap: 2rem;
  }

  .gamestats {
    display: flex;
    flex-direction: column;
    justify: space-around;
  }

  .players-list{
    h4{
        margin-bottom: 1rem;
    }

    li{
        margin-bottom: 1rem;
    }
  }

  .this-player{
    background: var(--background-color);
    width: auto;
    padding: 0.8rem;
    width: 30%;
  }

  .end{
    width: 20%;
  }

  .gameboard{
    h5{
        margin-bottom: 1rem;
    }
  }


  @media (min-width: 992px) {
    .main-content-gameroom {
      grid-template-columns: 1fr 3fr;
      justify-content: center;
    }
      .this-player{
      width: 80%;
    }

    .end{
      width: 80%;
    }

    .gameboard{
      h5{
          margin-bottom: 1rem;
      }
    } 
  }
`;

export default Wrapper;
