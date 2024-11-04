import { EventData, Page, NavigatedData } from '@nativescript/core';
import { PlayerViewModel } from '../viewmodels/player-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    const channel = page.navigationContext;
    page.bindingContext = new PlayerViewModel(channel);
}