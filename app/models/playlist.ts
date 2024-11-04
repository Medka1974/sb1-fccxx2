export interface Channel {
    name: string;
    url: string;
    group: string;
    logo?: string;
}

export interface PlaylistGroup {
    name: string;
    channels: Channel[];
}

export class Playlist {
    private groups: Map<string, PlaylistGroup> = new Map();

    addChannel(channel: Channel) {
        if (!this.groups.has(channel.group)) {
            this.groups.set(channel.group, {
                name: channel.group,
                channels: []
            });
        }
        this.groups.get(channel.group).channels.push(channel);
    }

    getGroups(): PlaylistGroup[] {
        return Array.from(this.groups.values());
    }

    getChannelsByGroup(groupName: string): Channel[] {
        return this.groups.get(groupName)?.channels || [];
    }
}