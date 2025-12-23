const http = require('http');

const PORT = 4000;
let students = [
    { id: 1, name: "aneni kidanu" },
    { id: 2, name: "azeb yirga" },
    { id: 3, name: "bamlak chernet" }
];
const findStudentById = (id) => {
    return students.find(student => student.id === parseInt(id));
};
const generateId = () => {
    return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    const url = req.url;
    const method = req.method;
    if (url === '/students' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
        
    } 
    else if (url === '/students' && method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (!data.name || typeof data.name !== 'string') {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Name is required and must be a string" }));
                    return;
                }
                const newStudent = {
                    id: generateId(),
                    name: data.name.trim()
                };
                students.push(newStudent);
                
                res.writeHead(201);
                res.end(JSON.stringify(newStudent));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });
        
    } 
    else if (url.startsWith('/students/') && method === 'PUT') {
        const id = url.split('/')[2];
        
        if (!id || isNaN(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid student ID" }));
            return;
        }
        
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (!data.name || typeof data.name !== 'string') {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Name is required and must be a string" }));
                    return;
                }
                
                const studentId = parseInt(id);
                const studentIndex = students.findIndex(s => s.id === studentId);
                
                if (studentIndex === -1) {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: `Student with ID ${id} not found` }));
                    return;
                }
                students[studentIndex].name = data.name.trim();
                
                res.writeHead(200);
                res.end(JSON.stringify(students[studentIndex]));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });
        
    } 
    else if (url.startsWith('/students/') && method === 'DELETE') {
        const id = url.split('/')[2];
        
        if (!id || isNaN(id)) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid student ID" }));
            return;
        }
        
        const studentId = parseInt(id);
        const studentIndex = students.findIndex(s => s.id === studentId);
        
        if (studentIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: `Student with ID ${id} not found` }));
            return;
        }
        const deletedStudent = students.splice(studentIndex, 1)[0];
        
        res.writeHead(200);
        res.end(JSON.stringify({ 
            message: `Student with ID ${id} deleted successfully`,
            student: deletedStudent 
        }));
        
    } 
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`\nPart 2 Server is running on http://localhost:${PORT}`);
    console.log(`Available routes:`);
    console.log(`  GET    /students        - Get all students`);
    console.log(`  POST   /students        - Create a new student`);
    console.log(`  PUT    /students/:id    - Update a student`);
    console.log(`  DELETE /students/:id    - Delete a student`);
    console.log(`\nInitial students in database:`);
    students.forEach(student => {
        console.log(`  ID: ${student.id}, Name: ${student.name}`);
    });
});

module.exports = server;
