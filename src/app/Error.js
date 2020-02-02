import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOURS } from '../util/theme';

const StyledError = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  top: 0;

  background: ${COLOURS.rust};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: calc(14px + 2vmin);
  color: white;
  padding: 20px;

  .error-message {
    padding: 10px;
  }

  .subtitle {
    font-size: .8rem;
  }

  .close-icon {
    margin-top: 2px;
    color: white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2)
      }
  }
`;

const Error = ({ message, onClose }) => {
  return (
    <StyledError onClick={onClose}>
      <p className="error-message">Oh no! {message}</p>
      <p className="subtitle">(Click anywhere to try again.)</p>
    </StyledError>
  );
}

Error.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func
};

export default Error;
