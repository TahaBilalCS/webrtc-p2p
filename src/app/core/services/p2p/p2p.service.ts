import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

/** This import is configured in tsconfig.json - track library changes **/
import { joinRoom, getOccupants, FirebaseRoomConfig } from 'trystero/firebase';
import { BaseRoomConfig, Room } from 'trystero';

export interface SessionConfig {
    roomName: string;
    roomPassword?: string;
}

@Injectable({
    providedIn: 'root'
})
export class P2pService {
    trysteroConfig: BaseRoomConfig & FirebaseRoomConfig = { appId: environment.p2pDatabaseUrl };
    room?: Room;

    async ping(id: string) {
        return this.room?.ping(id);
    }

    start(sessionConfig: SessionConfig) {
        let newConfig: BaseRoomConfig & FirebaseRoomConfig;
        if (!sessionConfig.roomPassword) {
            newConfig = { ...this.trysteroConfig };
        } else {
            newConfig = { ...this.trysteroConfig, password: sessionConfig.roomPassword };
        }
        console.log('session config', newConfig);
        try {
            this.room = joinRoom(newConfig, sessionConfig.roomName);

            console.log('room', this.room.getPeers());

            // this.room.onPeerJoin(peerId => console.log(`${peerId} joined`));
            // this.room.onPeerLeave(peerId => console.log(`${peerId} left`));
            console.log('room2', this.room);
        } catch (err) {
            console.log('error joining room', err);
        }

        // const peerAudios: { [key: string]: HTMLAudioElement } = {};
        //
        // // get a local audio stream from the microphone
        // const selfStream = await navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: false
        // });
        //
        // // send stream to peers currently in the room
        // this.room.addStream(selfStream);
        //
        // // send stream to peers who join later
        // this.room.onPeerJoin(peerId => this.room.addStream(selfStream, peerId));
        //
        // // handle streams from other peers
        // this.room.onPeerStream((stream, peerId) => {
        //     // create an audio instance and set the incoming stream
        //     const audio = new Audio();
        //     audio.srcObject = stream;
        //     audio.autoplay = true;
        //
        //     // add the audio to peerAudio object if you want to address it for something
        //     // later (volume, etc.)
        //     peerAudios[peerId] = audio;
        // });
    }

    async leave() {}

    async getRoomOccupants(roomId: string) {
        return getOccupants(this.trysteroConfig, roomId);
    }

    public generateSessionId() {
        const random = Math.random().toString(36).substring(2, 6);
        const timestamp = Date.now().toString(36).slice(-4);
        return `${random}${timestamp}`;
    }

    constructor() {}
}
