const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const formData = require("express-form-data")
const PORT = 2007

app.use(express.static(path.join(__dirname, "../client/dist")))
app.use(express.json())
let users = require("./data/users.json")
let currentUserIndex = 0
let currentUser = users[currentUserIndex]

const options = {
    uploadDir: path.join(__dirname, "./data/imgs"),
    autoClean: false,
};
app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

function rewriteUsers() {
    fs.writeFile(path.join(__dirname, './data/users.json'), JSON.stringify(users, null, 2), err => {
        if (err) {
            console.error(err);
        }
    })
    currentUser = users[currentUserIndex]
}

app.post("/api/register", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email) {
            return res.status(400).send({ error: 'Email already exists' })
        }
    }
    const newUser = { avatar: "https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png", email: req.body.email, password: `${req.body.pass}`, tasks: [] }
    users.push(newUser)
    rewriteUsers()
    currentUser = newUser
    currentUserIndex = users.length - 1;
    res.status(200).json(currentUser)
})
app.post("/api/authorise", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email && users[i].password === req.body.pass) {
            currentUser = users[i]
            currentUserIndex = i
            return res.status(200).json(currentUser)
        }
    }
    return res.status(400).send({ error: 'Email doesnt exist' })
})

app.post("/api/add-task", (req, res) => {
    for (let i = 0; i < currentUser.tasks; i++) {
        if (currentUser.tasks[i].startTime === req.body.startTime) {
            return res.status(400).send({ error: 'You cant add 2 tasks at the same time' })
        }
    }
    const newTask = { name: req.body.name, description: req.body.description, category: req.body.category, startTime: req.body.startTime, endTime: req.body.endTime, date: req.body.date }
    currentUser.tasks.push(newTask);
    users[currentUserIndex].tasks = currentUser.tasks;

    rewriteUsers()
    res.status(200).json(currentUser)
})

app.delete("/api/delete-task/:name", (req, res) => {
    if (currentUser.tasks) {
        const name = req.params.name;
        const updatedTasks = currentUser.tasks.filter((task) => task.name != name);
        users[currentUserIndex].tasks = updatedTasks;

        rewriteUsers()
        res.status(200).json(currentUser)
    }
})

app.get("/api/logout/:email", (req, res) => {
    if (currentUser && req.params.email) {
        currentUser = {};
        currentUserIndex = 0;
        res.status(200).json(currentUser)
    }
})

app.put("/api/user/edit", (req, res) => {
    const newEmail = req.body.newEmail;
    const newPassword = req.body.newPassword;
    let newAvatar = "";
    if (req.body.newAvatar) {
        newAvatar = req.body.newAvatar.path.split(`\\`)[ req.body.newAvatar.path.split("\\").length-1]
        fs.unlink(path.join(__dirname, "./data/imgs/", currentUser.avatar), err => {});
        fs.unlink(path.join(__dirname, "../client/dist/imgs/", currentUser.avatar), err => {});
        fs.copyFile(path.join(__dirname, "./data/imgs/", newAvatar), path.join(__dirname, "../client/dist/imgs/", newAvatar), err => {
            if(err) throw err;
        });     
    }

    currentUser.email = newEmail;
    currentUser.password =  newPassword;
    newAvatar ? currentUser.avatar = newAvatar : currentUser.avatar = currentUser.avatar;

    users[currentUserIndex] = currentUser;
    rewriteUsers()
    res.status(200).json(currentUser)
})

app.listen(PORT, () => {
    const sourceDir = path.join(__dirname, "/data/imgs");
    const targetDir = path.join(__dirname, "../client/dist/imgs");

    fs.mkdir(targetDir, err => {});

    fs.readdirSync(sourceDir).forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);
        fs.copyFileSync(sourceFile, targetFile);
    });
    console.log(`Server listening on ${PORT}`)
})