/**
 * Determines if the url hostname matches a given hostname.
 *
 * @param {string} url          [The entire url.]
 * @param {string} hostname     [The hostname to use to split url.]
 */
const isValidDomain = (url, hostname) => {
  return !url || url.indexOf(hostname) > -1;
};

/**
 * Cleans the url and trims trailing whitespace and slashes.
 *
 * @param {string} url          [The entire url.]
 * @param {string} hostname     [The hostname to use to split url.]
 */
export const sanitizeUrl = (url) => {
  return url && url.trim().replace(/\/$/, '');
}

/**
 * Determines if given url is a valid path for a github repository.
 * A path is valid if it has two paths following the hostname;
 *
 * @param {string} url          [The entire url.]
 * @param {string} hostname     [The hostname to use to split url.]
 */
const isValidRepoUrl = (url, hostname) => {
  if(!url || !hostname) {
    throw new Error('Could not find a valid repo at that location!');
  }

  const urlSegments = url.split(`${hostname}/`);
  const path = urlSegments.slice(1)[0];

  return path.split('/').length === 2;
};

/**
 * Gets the first two paths after hostname from a given url.
 *
 * @param {string} url          [The entire url.]
 * @param {string} hostname     [The hostname to use to split url.]
 */
export const getPathsFromUrl = (url, hostname) => {
  if(!url || !hostname) {
    throw new Error('Could not find a valid repo at that location!');
  }

  // slice at 1 to disclude protocol, which is first item.
  const trimmedPath = url.split(`${hostname}/`).slice(1)[0];
  const paths = trimmedPath.split('/');
  const pathsList = paths.length > 2 ? paths.slice(0, 2) : paths;

  return pathsList.join('/');
};

export const validateURL = (url, hostName) => {
  if(!url) {
    throw new Error('You\'ll have to enter a URL first!');
  }

  if(!isValidDomain(url, hostName)) {
    throw new Error('Please enter a valid repo from github.com!');
  };

  if(!isValidRepoUrl(url, hostName)) {
    throw new Error('Looks like that URL is not valid. \nIt should have the following format: https://github.com/<owner>/<name>');
  }
}
