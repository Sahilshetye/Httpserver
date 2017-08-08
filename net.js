    process.stdout.write('\u001B[2J\u001B[0;0f');

    const server = require('net').createServer();
    let counter=0;
    let sockets={};

    server.on('connection',socket =>{
        socket.id= counter++;
        sockets[socket.id]= socket;
    

        console.log('Client connected');
        socket.write('Type your Name:\n');
        
        function timestamp(){
            const now= new Date();
            return `${now.getHours}:${now.getMinutes()}`;
        };
        socket.on('data',data=>{
            // Object.keys(socket).forEach(([,cs])=>{
            if (!sockets[socket.id]){
                socket.name=data.toString().trim();
                socket.write(`Welcome ${socket.name}`);
                sockets[socket.id] = socket;
                return;
            }
                
            Object.entries(sockets).forEach(([key,cs])=>{
            if (socket.id == key) return;
            console.log('data is: ',data);
            cs.write(`${socket.name}: `);
            cs.write(data);
            });
            
        });

        socket.setDefaultEncoding('utf8')

        socket.on('end',()=>{
            delete sockets[socket.id];
            console.log('Client disconnected');
        });
    });

    server.listen(8001,()=> console.log('Server Bound'));