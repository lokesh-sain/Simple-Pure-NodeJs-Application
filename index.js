const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

const myApp = http.createServer((req,res)=>{
    let filePath = path.join(__dirname,'views',req.url==='/'? 'index.html': req.url);
    let ext = path.extname(filePath);
    let ct;
    if(!ext){
        filePath+='.html';
    }
    
    switch(ext){
        case '.css': ct='text/css';break;
        case '.js' : ct='application/javascript';break;
        case '.svg': ct='image/svg+xml';break;
        default: ct='text/html';break;
        // You can add more here.....
    }

    fs.readFile(filePath,(err,loadContent)=>{
        if(err){
            fs.readFile(path.join(__dirname,'views','error404.html'),(error,data)=>{
                if(error){
                    res.writeHead(500);
                    res.end("Error");
                }else{
                    res.writeHead(404,{
                        'Content-Type':ct
                    });
                }
                res.end(data);
            })
        }else{
            res.writeHead(200,{
                'Content-Type':ct
            });
            res.end(loadContent);
        }
    })
});
myApp.listen(PORT,()=>{
    console.log('Server is running on '+PORT);
})

