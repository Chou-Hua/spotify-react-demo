import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    LogoutIcon,
    PlusCircleIcon, RssIcon
} from "@heroicons/react/outline";
import {
    HeartIcon
} from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";


const SideBar = () => {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlists, setPlayList] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    console.log(session)
    console.log('my playlist id >>>>', playlistId);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlayList(data.body.items);
            })
        }
    }, [session, spotifyApi]);


    return (
        <div className="text-gray-500 p-5 text-xs  lg:text-sm border-r border-gray-900 overflow-y-scroll
         scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-100">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                    <LogoutIcon className="h-5 w-5"/>
                    <p>Logout</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5"/>
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[1px] border-gray-900"/>
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p>Create PlayList</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white text-red-500">
                    <HeartIcon className="h-5 w-5"/>
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5"/>
                    <p>Your episodes</p>
                </button>
                <hr className="border-t-[1px] border-gray-900"/>
                {playlists.map((playlist) => (
                    <p
                        key={playlist.id}
                        className="cursor-pointer hover:text-white"
                        onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default SideBar