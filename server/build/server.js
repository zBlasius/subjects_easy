"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientController_1 = __importDefault(require("./controllers/ClientController"));
const CourseController_1 = __importDefault(require("./controllers/CourseController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
require("./database/mongodb/connection");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/temp', express_1.default.static(path_1.default.join(__dirname, 'temp')));
const io = new socket_io_1.Server(server);
const multer = require('multer');
const port = 8080;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, 'temp'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.get('/get_all_clients', (req, res) => {
    ClientController_1.default.getAllClients(req, res).then(ret => {
        res.send(ret);
    });
});
app.get('/edit_some_client', (req, res) => {
    ClientController_1.default.editSomeClient(req, res).then(ret => {
        res.send(ret);
    });
});
app.post("/create_user", (req, res) => {
    const body = req.body;
    const data = body.data;
    UserController_1.default.createUser(body.email, data).then(ret => {
        res.send(ret);
    });
});
app.get("/login", (req, res) => {
    const body = req.query;
    UserController_1.default.login({ email: body.email, password: body.password }).then(ret => {
        res.send({ auth: true });
    }).catch(err => {
        res.send({ auth: false });
    });
});
app.post("/create_new_course", (req, res) => {
    const body = req.body;
    console.log('body', body);
    const user = { email: "blasiusgustavo19@gmail.com" };
    CourseController_1.default.createCourse(user, body.data).then(ret => {
        res.send({ ret });
    }).catch(err => {
        res.send({ err });
    });
});
app.get("/list_all_course", (req, res) => {
    const query = req.query;
    CourseController_1.default.listAllCourseByUser({ email: query.email }).then(ret => {
        res.send({ list: ret });
    }).catch(err => {
        res.send({ err });
    });
});
app.get("/get_course_by_id", (req, res) => {
    const query = req.query;
    CourseController_1.default.listCourseById({ id: query._id }).then(ret => {
        res.send({ list: ret });
    }).catch(err => {
        res.send({ err });
    });
});
app.post('/upload', upload.single('file'), (req, res) => {
    const body = req.body;
    CourseController_1.default.saveNewVideo(body).then(ret => {
        res.send(ret);
    }).catch(err => {
        res.send({ err });
    });
    res.status(200).send('Arquivo recebido com sucesso!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
