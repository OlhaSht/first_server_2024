const http = require('http');
const fs = require('node:fs');
const PORT = 3000;
const users = [];

const requestListener = (req, res) => {
    const {method, url} = req;
    if(method==='GET'){
        if(url === "/"){
           fs.readFile('./views/index.html',(err, data)=>{
        if(err){throw err}
        res.end(data);
    }) 
        }
        if(url === "/about.html"){
            fs.readFile('./views/about.html',(err, data)=>{
         if(err){throw err}
         res.end(data);
     }) 
         }
         if(url === "/contact.html"){
            fs.readFile('./views/contact.html',(err, data)=>{
         if(err){throw err}
         res.end(data);
     }) ;
     return;
         }
    } 
    if(method === "POST"){
        if(url === "./create-user"){
            let jsonString = '';
            req.on("data", (chunk)=>{jsonString += chunk});
            req.on('end', ()=>{
                const user = JSON.parse(jsonString)
                user.id = Date.now();
                users.push(user);
                console.log(users);
                res.end(JSON.stringify(user))
            })
            return;
        }
    }
    fs.readFile('./views/404.html',(err, data)=>{
        if(err){throw err}
        res.end(data);
    }) ;  
}
 
const server = http.createServer(requestListener)
server.listen(PORT);