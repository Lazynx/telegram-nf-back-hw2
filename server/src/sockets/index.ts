import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

export default function (httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`user joined room ${roomId}`);
    });

    // Handle send message event
    socket.on('send_message', ({ roomId, text, sender }) => {
      const message = {
        _id: new Date().getTime().toString(), 
        text,
        sender,
        chat: roomId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      io.to(roomId).emit('receive_message', message);
      console.log(`user ${sender.username} (ID: ${sender._id}) sent message: ${text} to room ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
