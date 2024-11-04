import { File, Folder, knownFolders, path } from '@nativescript/core';
import { Channel, Playlist } from '../models/playlist';

export class PlaylistService {
    private static instance: PlaylistService;
    private playlist: Playlist;

    private constructor() {
        this.playlist = new Playlist();
    }

    static getInstance(): PlaylistService {
        if (!PlaylistService.instance) {
            PlaylistService.instance = new PlaylistService();
        }
        return PlaylistService.instance;
    }

    async loadPlaylist(content: string): Promise<void> {
        const lines = content.split('\n');
        let currentChannel: Partial<Channel> = {};

        for (const line of lines) {
            if (line.startsWith('#EXTINF:')) {
                const match = line.match(/group-title="([^"]*)".*,(.*)$/);
                if (match) {
                    currentChannel.group = match[1] || 'Ungrouped';
                    currentChannel.name = match[2].trim();
                }
            } else if (line.startsWith('http')) {
                currentChannel.url = line.trim();
                if (currentChannel.name && currentChannel.url) {
                    this.playlist.addChannel(currentChannel as Channel);
                }
                currentChannel = {};
            }
        }
    }

    getPlaylist(): Playlist {
        return this.playlist;
    }
}