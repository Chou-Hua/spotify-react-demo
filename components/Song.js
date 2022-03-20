import useSpotify from "../hooks/useSpotify";
import { millsToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState, previewUrlState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { useEffect, useState } from "react";

function Song({order, track}) {
    const spotifyApi = useSpotify();
    const songInfo = useSongInfo()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [previewUrl, setPreviewUrl] = useRecoilState(previewUrlState);

    //TODO Andy 修改成播放預覽音樂

    // const playSongTest = () => {
    //     setCurrentTrackId(track.track.id);
    //     setPreviewUrl(songInfo?.preview_url);
    //     let audio = new Audio(songInfo?.preview_url);
    //     audio.id = previewUrl;
    //     audio.play();
    // }
    //
    // useEffect(() => {
    //     if (isPlaying) {
    //
    //     }
    // }, [previewUrl])


    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri]
        });
    };

    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
             onClick={playSong}
        >
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img
                    className="h-10 w-10"
                    src={track.track.album.images[0].url}
                    alt=""
                />
                <div>
                    <p className="w-36 lg:w-34 text-white truncate">
                        {track.track.name}
                    </p>
                    <p className="w-40">
                        {track.track.artists[0].name}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">{track.track.album.name}</p>
                <p>{millsToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song;