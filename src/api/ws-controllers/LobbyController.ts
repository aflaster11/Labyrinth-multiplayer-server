import {
    SocketController,
    ConnectedSocket,
    OnMessage,
    MessageBody, SocketIO, OnConnect, OnDisconnect
} from "socket-controllers";
import {Logger} from "../../decorators/Logger";
import { LoggerInterface } from '../../lib/logger';
import { Room } from '../models/Room';

@SocketController('/lobby')
export class LobbyController {
    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private testBoard = [
            [	{type: 'Corner', rot: '90',  playerBase: 0, player: '', symbol: ''},
                {type: 'Straight', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0', playerBase: '', player: '', symbol: 'Arrow'},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '180', playerBase: 1, player: '', symbol: ''}],
            [	{type: 'Straight', rot: '0', playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: 'Tome'},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''}],
            [	{type: 'Intersection', rot: '90',  playerBase: '', player: '', symbol: 'Helmet'},
                {type: 'Corner', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0',  playerBase: '', player: '', symbol: ''}],
            [	{type: 'Straight', rot: '90',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: 'Axe'},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0',  playerBase: '', player: '', symbol: ''}],
            [	{type: 'Corner', rot: '90',  playerBase: '', player: '', symbol: 'Bracelet'},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''}],
            [	{type: 'Intersection', rot: '90',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '180',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '90',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''}],
            [	{type: 'Corner', rot: '0',  playerBase: 2, player: '', symbol: ''},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '270',  playerBase: '', player: '', symbol: 'Sword'},
                {type: 'Intersection', rot: '270',  playerBase: '', player: '', symbol: ''},
                {type: 'Intersection', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Straight', rot: '0',  playerBase: '', player: '', symbol: ''},
                {type: 'Corner', rot: '270',  playerBase: 3, player: '', symbol: ''}],
        ],
    ) {}

    @OnConnect()
    connection(@ConnectedSocket() socket: any) {
        this.log.info('client connected');
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: any) {
        this.log.info(`client disconnected: ${socket.id} `);
    }

    @OnMessage("createRoom")
    async createRoom(@ConnectedSocket() socket: any, @MessageBody() body: any) {
        //Call firebase service?
    }

    @OnMessage("joinRoom")
    async joinRoom(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        //Call firebase service?
    }

    @OnMessage("gameStart")
    gameStart(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info("Game will start!");
        io.in(`${body.roomId}`).emit("gameStart");
    }

    @OnMessage("assignTurn")
    assignTurn(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info("Turn assigned");
        /*
        let randomPlayer = Math.floor(Math.random() * body.playerCount);
        io.in(`${body.roomId}`).emit("assignTurn", randomPlayer);
        */
    }

    @OnMessage("assignSymbols")
    assignSymbols(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info("Symbols assigned");
        /*
        let roster = io.sockets.adapter.rooms[`${body.roomId}`];
        let symbols = [];
        switch(socket.id){
            case `${Object.keys(roster.sockets)[0]}`:
                symbols = [symbolObjects.ARROW, symbolObjects.AXE, symbolObjects.BRACELET];
                break;
            case `${Object.keys(roster.sockets)[1]}`:
                symbols = [symbolObjects.HELMET, symbolObjects.SWORD, symbolObjects.TOME];
                break;
            case `${Object.keys(roster.sockets)[2]}`:
                break;
            case `${Object.keys(roster.sockets)[3]}`:
                break;
        }
        socket.emit('assignSymbols', symbols);

        */
    }

    @OnMessage("rotate")
    rotate(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info('Rotation received');
        socket.in(`${body.roomId}`).emit('rotate');
    }

    @OnMessage("insertFragment")
    insertFragment(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info("I have received an insertion at: ", body.orientation, body.position);
        //socket.in(`${body.roomId}`).emit('insertFragment', body.orientation, body.position);
    }

    @OnMessage("moveAvatar")
    moveAvatar(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info("Someone just moved the avatar");
        //socket.in(`${body.roomId}`).emit('moveAvatar',  body.currentRow, body.currentColumn, body.newRow, body.newColumn);
    }

    @OnMessage("endTurn")
    endTurn(@SocketIO() io : any, @ConnectedSocket() socket: any, @MessageBody() body: any) {
        this.log.info("Someone just ended their turn");
        //io.to(`${body.roomId}`).emit('endTurn');
    }

    @OnMessage("obtainSymbol")
    obtainSymbol(@ConnectedSocket() socket: any, @MessageBody() body: any) {
    }

    @OnMessage("endGame")
    endGame(@ConnectedSocket() socket: any, @MessageBody() body: any) {
    }
}
