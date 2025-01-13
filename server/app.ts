import express from 'express';
import DatabaseConnection from './db';


const Port = 3001;
const app = express();
DatabaseConnection().then(()=> {
    app.listen(Port, () => {
        console.log(`Server is running on port ${Port}`);
        
    })
}).catch((err)=> {
console.log('mongodb connection failed!', err)
})




app.get('/', ()=> {
    console.log("get request")
})
