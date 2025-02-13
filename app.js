const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Simuler une base de données en mémoire
let users = [];

// Route pour ajouter un utilisateur (POST)
app.post("/users", (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: "Nom et âge requis" });
    }
    const user = { id: users.length + 1, name, age };
    users.push(user);
    res.status(201).json(user);
});

// Route pour récupérer tous les utilisateurs (GET)
app.get("/users", (req, res) => {
    res.json(users);
});

// Route pour récupérer un utilisateur par ID (GET)
app.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
});

// Route pour mettre à jour un utilisateur (PUT)
app.put("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const { name, age } = req.body;
    if (name) user.name = name;
    if (age) user.age = age;
    res.json(user);
});

// Route pour supprimer un utilisateur (DELETE)
app.delete("/users/:id", (req, res) => {
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res.json({ message: "Utilisateur supprimé" });
});

// Gestion propre du serveur pour les tests
let server;

const startServer = () => {
    if (!server) {
        server = app.listen(port, () => {
            console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
        });
    }
    return server;
};

const stopServer = () => {
    if (server) {
        server.close(() => {
            //console.log("Serveur arrêté");
        });
        server = null;
    }
};

if (require.main === module) {
    startServer();
}

module.exports = { app, startServer, stopServer };
