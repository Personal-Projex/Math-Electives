import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

const AlertTimerComponent = () => {
    const [progress, setProgress] = useState(0);

    function increment () {
        setProgress(progress + 1);
    }

    setTimeout(function () {
        increment();
    }, 12)

    return (
        <div>
          <LoadingBar
            color='orange'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
        </div>
      )
}

export default AlertTimerComponent;
