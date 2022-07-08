import express, { request, response } from 'express';
import {StatusCodes} from 'http-status-codes';

const app = express();
const port = 3000;
let users =[

    {id:1,name:'Haroldo', age:35},
    {id:2,name:'Larissa', age:41},
];
app.use(express.json());
app.listen(port,() =>{

    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (request,response)=>{

    return response.send('<h1>Trabalhando com um servidor express.<h2>');

});

app.get('/users',(request,response)=>{

    return response.send(users);
});

app.get('/users/:userId', (request,response) =>{
    const userId = request.params.userId;
    const user =users.find(user =>{

       return  (user.id === Number(userId))
    })
    return response.send(user);
});

app.post('/users/:userId',(request,response) =>{

    const newUser = request.body;

    users.push(newUser);
    return response.status(StatusCodes.CREATED).send(newUser);

});

app.put('/users/:userId',(request,response)=>{

     const userId = request.params.userId;
     const updateUser = request.body;

     users = users.map(user =>{

        if(Number(userId) === user.id) {
            
            return updateUser;
        }
        return user;
     })
    
       return response.send(updateUser);
});

app.delete('/users/:userId',(request,response) =>{

   const userId = request.params.userId;
   
   users = users.filter((user)=> user.id !==Number(userId));

   return response.status(StatusCodes.NO_CONTENT).send();

});
