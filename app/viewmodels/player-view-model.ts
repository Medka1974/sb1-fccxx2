import { Observable } from '@nativescript/core';
import { Channel } from '../models/playlist';

export class PlayerViewModel extends Observable {
    private _currentChannel: Channel;

    constructor(channel: Channel) {
        super();
        this._currentChannel = channel;
    }

    get currentChannel(): Channel {
        return this._currentChannel;
    }
}