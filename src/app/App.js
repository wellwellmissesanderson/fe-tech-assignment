import React, { Component } from 'react';
import './App.css';
import AppService from './App.service';
import Search from './Search';
import Error from './Error';
import ResultsList from './ResultsList';
import { Formik } from 'formik';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: null,
      filteredIssues: null,
      isSearchOpen: true,
      error: null,
      repoUrl: '',
    };
  }

  /**
   * Handles when user enters a URL to search for issues.
   * Makes request and handles errors.
   *
   * @param {string} url    [The url used to search.]
   */
  onSearch = (url) => {
    if(this.state.error) { this.setState({ error : null })};

    AppService.getIssuesByRepo(url)
      .then(res => {
        this.setState({
          issues: res && res.data,
          filteredIssues: res && res.data,
          isSearchOpen: false,
          repoUrl: url
        });
    }).catch(err => this.setState({ error: err }));
  };

  /**
   * Handles updating state when selecting a filter.
   *
   * Will filter issues based on existence of values for
   * given prop. If 'all' is selected, will reset filteredIssues
   * back to be all issues.
   */
  onFilter = (filterKey) => {
    AppService.getIssuesByRepo(this.state.repoUrl, filterKey)
      .then(res => {
        this.setState({
          issues: res && res.data,
          filteredIssues: res && res.data,
          isSearchOpen: false,
        });
      }).catch(err => this.setState({ error: err }));
  };

  /**
   * Handles closing the issues list view.
   */
  onClose = () => {
    this.setState({
      issues: null,
      filteredIssues: null,
      isSearchOpen: true,
      error: null,
    });
  }

  render() {
    const { isSearchOpen, filteredIssues, error } = this.state;
    const values = { query: '' };

    return (
      <>
        <Formik initialValues={values} render={formProps =>
          <Search
            onSearch={this.onSearch}
            form={formProps}
            isSearchOpen={isSearchOpen}
          />}
        />

        {!isSearchOpen && filteredIssues && <div className="App-main">
            <ResultsList issues={filteredIssues} onClose={this.onClose} applyFilter={this.onFilter} />
          </div>
        }

        {error ? <Error message={error.message} onClose={this.onClose} /> : null }
      </>
    );
  }
}

export default App;
