const http = require('http');

const PORT = 4000;

// In-memory students array
let students = [
    { id: 1, name: "aneni kidanu" },
    { id: 2, name: "azeb yirga" },
    { id: 3, name: "bamlak chernet" }
];

// Helper function to find student by ID
const findStudentById = (id) => {
    return students.find(student => student.id === parseInt(id));
};

// Helper function to generate unique ID
const generateId = () => {
    return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
};

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Set default content type
    res.setHeader('Content-Type', 'application/json');
    
    // Parse URL
    const url = req.url;
    const method = req.method;
    
    // Route: GET /students
    if (url === '/students' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
        
    } 
    // Route: POST /students
    else if (url === '/students' && method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // Validate request body
                if (!data.name || typeof data.name !== 'string') {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: "Name is required and must be a string" }));
                    return;
                }
                
                // Create new student
                const newStudent = {
                    id: generateId(),
                    name: data.name.trim()
                };
                
                // Add to array
                students.push(newStudent);
                
                res.writeHead(201);
                res.end(JSON.stringify(newStudent));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });
        
    } 
    // Route: PUT /students/:id
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
                
                // Validate request body
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
                
                // Update student
                students[studentIndex].name = data.name.trim();
                
                res.writeHead(200);
                res.end(JSON.stringify(students[studentIndex]));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });
        
    } 
    // Route: DELETE /students/:id
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
        
        // Remove student
        const deletedStudent = students.splice(studentIndex, 1)[0];
        
        res.writeHead(200);
        res.end(JSON.stringify({ 
            message: `Student with ID ${id} deleted successfully`,
            student: deletedStudent 
        }));
        
    } 
    // Route not found
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