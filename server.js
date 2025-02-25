const express = require("express");
const os = require("os");
const cors = require("cors");

const app = express();

// Port
const PORT = 5000;

// 🔥 Enable CORS
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE", allowedHeaders: "*" }));

// ✅ Endpoint untuk mendapatkan IP klien
app.get("/get-client-ip", (req, res) => {
    let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
     const deviceName = os.hostname();

    // 🔥 Konversi IPv6-mapped IPv4 ke IPv4 biasa
    if (clientIp.includes("::ffff:")) {
        clientIp = clientIp.split("::ffff:")[1];
    }

    res.json({ ip: clientIp, device : deviceName });
});

// ✅ Endpoint untuk mendapatkan IP dari sistem jaringan (Local Network)
app.get("/get-os-ip", (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    let localIP = "Tidak ditemukan";

    Object.values(networkInterfaces).forEach((interfaces) => {
        interfaces.forEach((iface) => {
            if (iface.family === "IPv4" && !iface.internal) {
                localIP = iface.address; // ✅ Ini IP dari jaringan lokal OS
            }
        });
    });

    res.json({ ip: localIP });
});

// ✅ Endpoint untuk mendapatkan nama perangkat (hostname)
app.get("/get-device-name", (req, res) => {
    const deviceName = os.hostname();
    res.json({ device: deviceName });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
