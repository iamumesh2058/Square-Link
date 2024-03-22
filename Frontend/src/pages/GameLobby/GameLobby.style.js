import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem 2rem 2rem;

	h4{
		margin-bottom: 1rem;
	}
  .players-list{

    li{
      margin-bottom: 1rem;
    }
  }
 

  .invite-link span{
		text-align: left;
    color: var(--primary-500);
    padding-left: 3vw;
    margin: 0;
  }

	.invite-link .invite{
		cursor: pointer;
		position: relative;
    border: none;
    outline: none;
    color: blue;
    background-color: transparent;
    font-family: 'Gochi Hand', cursive;
    color: var(--primary-500);
    font-size: 3vw;
    text-align: center;
    padding: 0.5em 1em;
    margin-left: 1em;
	}

	.invite-link .invite::before,
	.invite-link .invite::after
	{
		content: '';
    position: absolute;
    top: -0.1em;
    bottom: -0.2em;
    left: -0.2em;
    right: -0.5em;
    border: 3px solid var(--primary-500);
    border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
	}

	.invite-link .invite:before {
    transform: rotate(0deg);
  }

	.invite-link .invite:after {
    transform: rotate(5deg);
  }

	.enter-game{
		margin-top: 2rem;
		width: 5rem;
	}
`;

export default Wrapper;
