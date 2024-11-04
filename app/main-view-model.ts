import { Observable } from '@nativescript/core';
import { PlaylistService } from './services/playlist-service';
import { PlaylistGroup } from './models/playlist';

export class MainViewModel extends Observable {
    private playlistService: PlaylistService;

    constructor() {
        super();
        this.playlistService = PlaylistService.getInstance();
        this.loadGroups();
    }

    get groups(): PlaylistGroup[] {
        return this.playlistService.getPlaylist().getGroups();
    }

    async onAddPlaylist() {
        // Sample M3U playlist for testing
        const samplePlaylist = `#EXTM3U
#EXTINF:-1 group-title="News",CNN
http://example.com/cnn.m3u8
#EXTINF:-1 group-title="Sports",ESPN
http://example.com/espn.m3u8`;
        
        await this.playlistService.loadPlaylist(samplePlaylist);
        this.notifyPropertyChange('groups', this.groups);
    }
}