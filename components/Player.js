import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import Volume from "@heroicons/react/outline/VolumeUpIcon"
import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    VolumeUpIcon
} from "@heroicons/react/solid";
import { debounce } from "lodash";

function Player(callback, deps) {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    // const fetchCurrentSong = () => {
    //     if (!songInfo) {
    //         spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //             setCurrentTrackId(data.body?.item?.id);
    //
    //             spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //                 setIsPlaying(data.body?.is_playing);
    //             });
    //         });
    //     }
    // };
    //
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }
    //
    // useEffect(() => {
    //     if (spotifyApi.getAccessToken() && !currentTrackId) {
    //         fetchCurrentSong();
    //         setVolume(50);
    //     }
    // }, [currentTrackId, spotifyApi, session])
    //
    // useEffect(() => {
    //     if (volume > 0 && volume < 100) {
    //         debounceAdjustVolume(volume);
    //     }
    // }, [volume]);
    //
    // const debounceAdjustVolume = useCallback(
    //     debounce((volume) => {
    //         spotifyApi.setVolume(volume);
    //     }, 100)
    // )
    //
    const songInfoArtists = (data) => {
        if (data) {
            return data.artists?.[0]?.name;
        }
        return null
    }
    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
        grid grid-cols-3 text-xs md:text-base px-2 md:px-8"
        >
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfoArtists(songInfo)}</p>
                </div>
            </div>
            {/*Center*/}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button"/>
                <RewindIcon className="button"/>

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10"/>
                ) : (<PlayIcon onClick={handlePlayPause} className="button w-10 h-10"/>)
                }
                <FastForwardIcon className="button"/>
                <ReplyIcon className="button"/>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <Volume
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button"/>
                <input
                    className="w-14 md:w-28"
                    onChange={(e) => setVolume(Number(e.target.value))}
                    type="range" value={volume} min={0} max={100}/>
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button"/>
            </div>
        </div>
    )
}

export default Player;