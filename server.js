const http = require('http');
const fs = require('fs');
const path = require('path');

// Port fourni par Render ou 3000 en local
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Servir le fichier HTML pour toutes les requêtes
    const filePath = path.join(__dirname, 'index.html');
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Erreur serveur');
            console.error('Erreur:', err);
            return;
        }
        
        res.writeHead(200, { 
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache'
        });
        res.end(content);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
    console.log(`🌍 Application accessible`);
});

// Gestion de l'arrêt propre du serveur
process.on('SIGINT', () => {
    console.log('\n👋 Arrêt du serveur...');
    server.close(() => {
        console.log('✅ Serveur arrêté proprement');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n👋 Arrêt du serveur (SIGTERM)...');
    server.close(() => {
        console.log('✅ Serveur arrêté proprement');
        process.exit(0);
    });
});
