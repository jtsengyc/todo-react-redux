import React, { PropTypes } from 'react';

function Paginator({maxPage, pageNumber, handleTogglePage}) {
  let upperbound = Math.min(Math.max(10, pageNumber + 4), maxPage);
  let lowerbound = Math.max(1, upperbound - 9);
  let pages = [];
  if (pageNumber > 1) {
    pages.push(<li key='firstpage' className='active' onClick={() => handleTogglePage(1)}>First</li>);
    pages.push(<li key='prevpage' className='active' onClick={() => handleTogglePage(pageNumber - 1)}>Previous</li>);
  } else {
    pages.push(<li key='firstpage'>First</li>);
    pages.push(<li key='prevpage'>Previous</li>);
  }
  if (lowerbound > 1) {
    pages.push(<li key='lodot'>...</li>);
  }
  for (let thisPage = lowerbound; thisPage <= upperbound; thisPage++) {
    pages.push(thisPage === pageNumber ?
      <li key={thisPage} className="current">{thisPage}</li> :
      <li key={thisPage} className="active" onClick={() => handleTogglePage(thisPage)}>{thisPage}</li>
    );
  }
  if (upperbound < maxPage) {
    pages.push(<li key="hidot">...</li>);
  }
  if (pageNumber < maxPage) {
    pages.push(<li key="nextpage" className="active" onClick={() => handleTogglePage(pageNumber + 1)}>Next</li>);
    pages.push(<li key="lastpage" className="active" onClick={() => handleTogglePage(maxPage)}>Last</li>);
  } else {
    pages.push(<li key="nextpage">Next</li>);
    pages.push(<li key="lastpage">Last</li>);
  }
  return (
    <ul className='paginator'>
      {pages}
    </ul>
  );
}

Paginator.propTypes = {
  maxPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  handleTogglePage: PropTypes.func.isRequired
};

export default Paginator;
