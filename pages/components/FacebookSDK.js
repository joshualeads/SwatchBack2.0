import React from 'react';

const FacebookSDK = (props) => {
    return (
        <React.Fragment>
            <div id="fb-root"></div>
            <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=690612861999881&autoLogAppEvents=1" nonce="3SrK5Dzy"></script>
        </React.Fragment>
    );
}

export default FacebookSDK;