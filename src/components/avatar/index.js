import React, { PropTypes } from 'react';

function Avatar({userObj}) {
  return (
    <span className='user'>
      <a target='_blank' href={'//github.com/' + userObj.login}>
        <img className='user-avatar' src={userObj.avatar_url} />
        <span className='user-handle'>{userObj.login}</span>
      </a>
    </span>
  );
}

Avatar.propTypes = {
  userObj: PropTypes.object.isRequired
};

export default Avatar;
