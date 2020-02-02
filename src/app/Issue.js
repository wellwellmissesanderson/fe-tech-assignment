import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from "@material-ui/core";
import { COLOURS, MEDIA_SIZES } from '../util/theme';

const StyledIssue = styled(Card)`
  flex-basis: calc(33.33% - 4vmin);

  @media (max-width: ${MEDIA_SIZES.medium}px) {
    flex-basis: calc(50% - 4vmin);
  }

  @media (max-width: ${MEDIA_SIZES.small}px) {
    flex-basis: 100%;
  }

  max-height: 200px;
  text-align: left;
  margin-bottom: 10vh;

  .header {
    border-radius: 0;
    position: relative;
    background-color: ${COLOURS.blue};
    color:  ${COLOURS.white};
    box-sizing: border-box;
    padding: 2vmin;
    font-weight: 600;
  }

  .body {
    padding: 12px;
    font-size: .8em;
    height: 100%;
  }
`;

const BODY_CHAR_MAX = 160;
const TITLE_CHAR_MAX = BODY_CHAR_MAX / 2;

const Issue = ({ title, body, pull_request, closed_at }) => {
  const titleText = title.length > TITLE_CHAR_MAX ? `${title.substring(0, TITLE_CHAR_MAX)}...` : title;
  const bodyText = body.length > BODY_CHAR_MAX ? `${body.substring(0, BODY_CHAR_MAX)}...` : body;

  return (
    <StyledIssue>
      <Card className="header">
        {titleText}
      </Card>

      <section className="body">
        {bodyText}
      </section>
    </StyledIssue>
  );
}

Issue.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Issue;
