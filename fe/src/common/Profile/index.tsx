import React from 'react';

interface Props {
  url?: string;
  width?: number;
  height?: number;
}

const Profile: React.FC<Props> = ({ url, width = 32, height = 32 }) => {
  return (
    <img
      src={url}
      className="h-fit rounded-full"
      style={{ width: width, height: height, maxWidth: width }}
      alt="profile"
    />
  );
};

export default Profile;
