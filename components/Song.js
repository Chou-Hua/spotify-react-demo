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
    const [testUrl, setUrl] = useRecoilState(previewUrlState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    //TODO Andy 修改成播放預覽音樂

    const fetchSongInfo = async () => {
        let trackInfo
        if (track.track.id) {
            trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${track.track.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }
            ).then((res) => res.json());
        }
        return trackInfo
    }
    const playSong = async () => {
        setCurrentTrackId(track.track.id);
        let trackUrl = await fetchSongInfo().then((res) => {
            setUrl(res.preview_url);
            return res.preview_url;
        })
        let url = trackUrl;
        if (null !== url) {
            const player = document.getElementById('player');
            player.volume = 0.5;
            player.play();
        } else {
            alert('This song is not have preview')
        }
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
            <audio id="player" src={testUrl}/>
        </div>
    )
}

export default Song;