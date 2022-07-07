import React from 'react';
import { portrait } from '../functions/Portrait';

class ProfileImage extends React.Component {
  render() {
    return (
      <img
        className="img-fluid img-profile rounded-circle mx-auto mb-2"
        src={portrait}
        alt="..."
      />
    );
  }
}

export default ProfileImage;
