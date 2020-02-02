import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { sanitizeUrl } from '../util/urlUtils';
import { FONTS, COLOURS } from '../util/theme';

const StyledForm = styled.form`
  background: ${COLOURS.eggplant};
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.isOpen ? 'column' : 'row' };
  justify-content: ${props => props.isOpen ? 'center' : 'space-between' };
  align-items: center;
  font-size: ${props => props.isOpen ? `calc(${FONTS.baseSize} * 1.6 + 2vmin)` : `calc(${FONTS.baseSize} * .4 + 2vmin)` };
  color: ${COLOURS.white};
  padding: ${props => props.isOpen ? '20px' : '20px 40px' };
  height: ${props => props.isOpen ? '100vh' : '80px' };

  .main-title {
    margin: 4vmin;
  }

  .search-input {
    background: white;
    padding: 12px;
    width: 70vw;
  }

  .query {
    color: ${props => props.isOpen ? 'white' : COLOURS.lightGrey };
    font-weight: ${props => props.isOpen ? FONTS.baseWeight : FONTS.lightWeight};
  }

  .search-icon {
    color: ${COLOURS.lightGrey};
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  /**
   * Handles updating the state when user changes the input field.
   * Called a 'controlled component'
   *
   * @param {object} event  [The event object.]
   */
  handleChange = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  }

  /**
   * Handles the submitting of the form.
   *
   * @param {object} event  [The event object.]
   */
  handleOnSubmit = (event) => {
    event.preventDefault();
    const sanitizedUrl = sanitizeUrl(this.state.query);
    this.props.onSearch(sanitizedUrl);

    this.setState({ query: sanitizedUrl });
  }

  render() {
    const { isSearchOpen } = this.props;
    const { query } = this.state;

    return (
      <Paper>
        <StyledForm onSubmit={this.handleOnSubmit} isOpen={isSearchOpen}>

          <h2 className="main-title">Github Issue Inspector</h2>

          {isSearchOpen ? (
            <TextField
              id="search"
              name="search"
              placeholder="Github repo URL. ex: https://github.com/zeit/next.js/"
              onChange={this.handleChange}
              className="search-input"
              autoFocus={true}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon"/>
                  </InputAdornment>
                ),
                style: { fontSize: '1.5rem' }
              }}
            />
          ) : (
          <span className="query">{query}</span>
          )}
        </StyledForm>
      </Paper>
    )
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  form: PropTypes.object,
  isSearchOpen: PropTypes.bool,
};

Search.defaultProps = {
  onSearch() {}
};

export default Search;
