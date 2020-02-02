export const API_BASE_URL = 'https://api.github.com';
export const GITHUB_HOSTNAME = 'github.com';

// Note: 'inclusive' key
// If true, include all matches
// if prop and values exist.
// If false, disclude any matches
// when that prop has a value.
export const ISSUE_STATES = {
  'ALL': {
    key: 'all',
    title: 'All Issues',
    state: 'all',
  },
  'OPEN': {
    key: 'openIssues',
    title: 'Open Issues',
    filterProp: 'closed_at',
    inclusive: false,
    state: 'open',
  },
  'CLOSED': {
    key: 'closedIssues',
    title: 'Closed Issues',
    filterProp: 'closed_at',
    inclusive: true,
    state: 'closed',
  },
};
