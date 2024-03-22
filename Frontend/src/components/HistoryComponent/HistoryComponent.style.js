import styled from 'styled-components';

const Wrapper = styled.article`
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  
  .history-main {
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: row;
    padding: 1rem 1rem;
    justify-content: space-between;
  }

  .score-details {
    width: 60%;
    display: flex;
    justify-content: space-around;

    h5{
      margin: 0;
    }
  }

  .other-details{
    width: 40%;
    display: flex;
    justify-content: space-around;
  }

  @media (max-width: 992px){
    .history-main{
      flex-direction: column;
      row-gap: 1rem;
    }

    .score-details {
      width: 100%;
    }

    .other-details {
      width: 100%;
    }
  }
`;

export default Wrapper;
