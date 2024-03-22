import styled from 'styled-components';

const Wrapper = styled.section`
    border-radius: var(--border-radius);
    width: 100%;
    padding: 2rem 2rem 2rem;

    h5{
        margin-bottom: 2rem;
    }

    .history{
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 1rem;
    }
`;
export default Wrapper;
