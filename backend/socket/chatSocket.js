// Store all currently online users mapped to their socket IDS
const onlineUsers = new Map();

const chatSocket = (chatNamespace)=>{
    chatNamespace.on('connection', (socket)=>{
        console.log(`New Connection for Chat: ${socket.id}`);


        /**
         * (1) User Joins the chat
         * The Frontend emits 'joinChat' with user info when the connect
         * We store that user with their socket ID and Update all clients ( kila msee online)
         */
        socket.on('joinChat', (user)=>{
            if(!user || !user.name) return; //Simple guard
            onlineUsers.set(socket.id, user);

            //Emit updated online users list to all
            chatNamespace.emit('onlineUsers', Array.from(onlineUsers.values()));

            //Broadcast to others that someone has joined (Except myself)
            socket.broadcast.emit('chatNotification', {
                message: `${user.name} has joined the chat.`,
                type: 'info',
            });
        });


        /**
         * (2) Handle New Messages
         * Frontend emits 'newMessage' with messageObj { user, message }
         * We broadcasr this Message to everyone including the sender
         */
        socket.on('newMessage', (messageObj)=>{
            if(messageObj && messageObj.user && messageObj.message){
                chatNamespace.emit('messageReceived', messageObj);
                console.log(`Message from ${messageObj.user.name}: ${messageObj.message}`);
            }
        });

        
        /**
         * (3) Handle Typing Indicators
         * When a user is typing, we broadcast to other that they're typing.
         */
        socket.on('typing', (user)=>{
            if(user && user.name){
                socket.broadcast.emit('userTyping', user);
            }
        });


        /**
         * (4) Handle Disconnection
         * When a user leaves or disconnects, remove them and update all others.
         */
        socket.on('disconnect', ()=>{
            const user = onlineUsers.get(socket.id);

            if(user){
                onlineUsers.delete(socket.id);

                //Update online users list list for everyone
                chatNamespace.emit('onlineUsers', Array.from(onlineUsers.values()));

                //Notify others that someone has left
                chatNamespace.emit('chatNotification', {
                    message: `${user.name} has left the chatNamespace.`,
                    type: 'info',
                });

                console.log(`${user.name} disconnected (${socket.id})`);

            }
        });
    });
};

module.exports = chatSocket;