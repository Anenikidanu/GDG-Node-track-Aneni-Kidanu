const http = require('http');

const PORT = 3000;

let receivedData = null;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Welcome to the Home Page" }));
        
    } else if (url === '/info' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "This is the information page" }));
        
    } else if (url === '/submit' && method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                receivedData = data;
                res.writeHead(200);
                res.end(JSON.stringify(data));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });
        
    } else if (url === '/submit' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ 
            message: "Last submitted data (use POST to submit new data)",
            data: receivedData 
        }));
        
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Part 1 Server is running on http://localhost:${PORT}`);
    console.log(`Available routes:`);
    console.log(`  GET  /         - Welcome message`);
    console.log(`  GET  /info     - Information page`);
    console.log(`  POST /submit   - Submit JSON data`);
    console.log(`  GET  /submit   - View last submitted data`);
});

module.exports = server;
