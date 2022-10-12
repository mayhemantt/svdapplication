import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

const eventSkeleton = (props) => (
  // <ContentLoader
  //   speed={2}
  //   width={315}
  //   height={280}
  //   viewBox="0 0 400 160"
  //   backgroundColor="#f3f3f3"
  //   foregroundColor="#ecebeb"
  //   {...props}>
  //   <Rect x="180" y="8" rx="8" ry="8" width="100" height="6" />
  //   <Rect x="180" y="26" rx="8" ry="8" width="80" height="6" />
  //   <Rect x="100" y="100" rx="8" ry="8" width="250" height="6" />
  //   <Rect x="100" y="120" rx="8" ry="8" width="250" height="6" />
  //   <Rect x="100" y="140" rx="8" ry="8" width="178" height="6" />
  //   <Circle cx="130" cy="40" r="40" />
  // </ContentLoader>

  <ContentLoader
    width={315}
    height={280}
    viewBox="0 0 450 400"
    backgroundColor="#c99292"
    foregroundColor="#ecebeb"
    {...props}>
    <Rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <Rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <Rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
);

export default eventSkeleton;
