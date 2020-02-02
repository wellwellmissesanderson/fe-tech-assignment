import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Issue from './Issue';
import FilterBar from './FilterBar';
import { ISSUE_STATES } from '../util/CONSTANTS';
import { COLOURS } from '../util/theme';

const StyledResultsList = styled.div`
  background: white;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  position: relative;

  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .no-results {
    display: flex;
    flex-direction: column;
    padding-top: 30vh;

    .search-again-link {
      cursor: pointer;
      color: ${COLOURS.eggplant};
    }
  }

  .issues {
    padding: 8vh 8vw 0;
    margin: 0 auto;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
`;

class ResultsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterKey: ISSUE_STATES.ALL.key,
    };
  }

  /**
   * Handles the user clicking a filter item.
   *
   * If is the same filter as currently selected, does nothing.
   *
   * @param {object} item   [The issue object.]
   */
  onFilter = (item) => {
    if (this.state.filterKey === item.key) {
      return;
    }

    this.props.applyFilter(item.state);
    this.setState({ filterKey: item.key });
  }

  render() {
    const { issues, onClose }  = this.props;

    return (
      <StyledResultsList>
        {issues && issues.length ? (
          <>
            <IconButton onClick={onClose} className="close-icon">
              <CloseIcon />
            </IconButton>

            <div className="issues">
              <FilterBar
                onFilter={this.onFilter}
                active={this.state.filterKey}
              />

              {issues && issues.map((issue, index) => <Issue key={`${index}|${issue.id}`} {...issue} />
              )}
            </div>
          </>
        ) : (
          <div className="no-results">
            <h3>Sorry, no results appeared for that repo.</h3>
            <div className="search-again-link" onClick={onClose}>
              Try another search?
            </div>
          </div>
        )}
      </StyledResultsList>
    )
  }
}

ResultsList.propTypes = {
  issues: PropTypes.array,
  onClose: PropTypes.func,
  applyFilter: PropTypes.func,
};

export default ResultsList;
