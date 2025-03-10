import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { extname, join } from 'node:path';

const PORT = 3000;
const IP = '127.0.0.1';

const getContentType = (filePath) => {
    const ext = extname(filePath);
    switch (ext) {
        case '.html': return 'text/html';
        case '.css': return 'text/css';
        case '.js': return 'text/javascript';
        case '.png': return 'image/png';
        case '.jpg': return 'image/jpeg';
        case '.json': return 'application/json';
				case '.mp3': return 'audio/mpeg';
        default: return 'application/octet-stream';
    }
};

const server = createServer((req, res) => {
    let filePath = join(process.cwd(), req.url === '/' ? 'index.html' : req.url);

    readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(data);
        }
    });
});

server.listen(PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});