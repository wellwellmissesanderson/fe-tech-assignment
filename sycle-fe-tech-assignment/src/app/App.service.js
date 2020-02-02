import axios from 'axios';
import { API_BASE_URL } from '../util/CONSTANTS';
import {
  isValidRepoUrl,
  isValidDomain,
  getPathsFromUrl } from '../util/urlUtils';
import { GITHUB_HOSTNAME, ISSUE_STATES } from '../util/CONSTANTS';


const _validateURL = (url) => {
  if(!url) {
    throw new Error('You\'ll have to enter a URL first!');
  }

  if(!isValidDomain(url, GITHUB_HOSTNAME)) {
    throw new Error('Please enter a valid repo from github.com!');
  };

  if(!isValidRepoUrl(url, GITHUB_HOSTNAME)) {
    throw new Error('Looks like that URL is not valid. \nIt should have the following format: https://github.com/<owner>/<name>');
  }
}

class AppService {
  /**
   * Executes a GET request to search github repos by given  repoUrl.
   *
   * GET /repos/:owner/:repo/issues
   * @param {string} repoUrl    [The repo name.]
   * @param {string} filterKey  [Optional filter key]
   * @return {promise}
   */
  static getIssuesByRepo(repoUrl, filterKey) {

    _validateURL(repoUrl);

    const repoPaths = getPathsFromUrl(repoUrl, GITHUB_HOSTNAME);
    const baseUrl = `${API_BASE_URL}/repos/${repoPaths}/issues`;

    const request = {
      method: 'get',
      url: baseUrl,
      timeout: 3000,
      params: {
        state: filterKey || ISSUE_STATES.ALL.key,
      },
    };

    return axios(request)
    .then(res => res)
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
  };

};

export default AppService;