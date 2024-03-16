import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 50%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  margin: auto;

  .matrix{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  
`;

export default Wrapper;
