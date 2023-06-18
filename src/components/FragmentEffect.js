import React from 'react';
import { Filter, Image } from 'svg-filter';

function FragmentEffect() {
  return (
    <div className="bitmap-effect">
      <Filter id="bitmap-filter">
        <Image
          xlinkHref="../assets/fragment.png"
          result="bitmap"
        />
      </Filter>
      
      <div className="bitmap-effect__content">
        {/* Your content goes here */}
        <h1>bitmap effect</h1>
      </div>
    </div>
  );
}

export default FragmentEffect;
