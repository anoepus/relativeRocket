//
const express = require('express');
const app = express();

app.use(express.json());

//GET index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//POST Relative time
app.post('/api/relativeTime', (req, res) => {
    const h = Number(req.body.rH);
    const m = Number(req.body.rM);
    const s = Number(req.body.rS);
    const kms = Number(req.body.kms);

    const c = 299792; // speed of light in km/s
    const realSeconds = h * 3600 + m * 60 + s; // total seconds elapsed since midnight

    const gamma = 1 / Math.sqrt(1 - (kms ** 2) / (c ** 2));
    const rocketSeconds = realSeconds / gamma;

    const rH = Math.floor(rocketSeconds / 3600);
    const rM = Math.floor((rocketSeconds % 3600) / 60);
    const rS = Math.floor(rocketSeconds % 60);

    res.send({
        hours: formatTime(rH),
        minutes: formatTime(rM),
        seconds: formatTime(rS),
    });
});


//GET real time clock
app.get('/api/clocks', (req, res) => {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    h = formatTime(h);
    m = formatTime(m);
    s = formatTime(s);

    res.send({
        hours : h,
        minutes : m,
        seconds : s,
    });
});

function formatTime (i) {
    if (i < 10) {i = "0" + i};
    return i;
};

app.listen(8080, (error) => {
    if (error) {
        console.log(`Server started with a error ${error.message}`);
        return;
    }

    console.log("Server is running on", 8080);
});

