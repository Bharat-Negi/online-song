import DiscoverData from '../json-data/discover.json';
import GenresData from '../json-data/genres.json';
import NewSongdb from '../json-data/new-song.json';
import TopSongdb from '../json-data/top-song.json';
import { discoverSongs } from './playerContext';

// "New Songs" on the home page
export const newSongs = NewSongdb.map((item) => ({
    id: 'new-' + item.id,
    name: item.newName,
    artist: item.newArtist,
    image: item.newImg,
    src: item.newAudio,
    time: item.newTime,
    released: item.newReleased
}));

// "Top Songs" chart on the home page
export const topSongs = TopSongdb.map((item) => ({
    id: 'top-' + item.id,
    rank: item.id,
    name: item.topName,
    artist: item.topArtist,
    image: item.topImg,
    src: item.topAudio,
    time: item.topTime,
    plays: item.plays,
    trend: item.trend,
    lastWeek: item.lastWeek
}));

// Every song that can be added to a playlist: { id, name, artist, image, src, time }
export const allSongs = [
    ...discoverSongs.map((song) => ({ ...song, time: DiscoverData.find((item) => item.id === song.id).disTime })),
    ...newSongs,
    ...topSongs,
    ...GenresData.flatMap((genre) => genre.songs)
];

export const findSong = (id) => allSongs.find((song) => song.id === id);
