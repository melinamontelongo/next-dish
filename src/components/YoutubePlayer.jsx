import YouTube from 'react-youtube';

export const YoutubePlayer = ({videoId}) => {
    const ytPlayerOptions = {

    }

    return(
        <YouTube className="flex justify-center" videoId={videoId} opts={ytPlayerOptions} style={{height: "100%", width: "100%"}} />
    );
};