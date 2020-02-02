import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { COLOURS, FONTS } from '../util/theme';
import { ISSUE_STATES } from '../util/CONSTANTS';

const StyledFilterBar = styled.div`
  flex-basis: 100%;
  margin: 1rem 0;

  display: flex;
  justify-content: flex-start;

  .link {
    font-size: calc(${FONTS.baseSize} * .7);
    margin-right: .5rem;
    padding: 5px;
    cursor: pointer;
    transition: color .2s;

    &.active, &:hover {
      color: ${COLOURS.teal};
      text-decoration: underline;
    }
  }
`;

const FilterBar = ({ onFilter, active }) => (
  <StyledFilterBar>
    {Object.values(ISSUE_STATES).map((item, index) => (
      <span
        key={`${index}|${item.title}`}
        className={`link ${active === item.key ? 'active' : ''}`}
        onClick={() => onFilter(item)}
      >
      {item.title}
      </span>
    ))}
  </StyledFilterBar>
);

FilterBar.propTypes = {
  onFilter: PropTypes.func,
  active: PropTypes.string
};


export default FilterBar;
