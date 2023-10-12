console.clear();
const { default: axios } = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

function sending(message, url, profile, name, time) {
    const webhookURL = 'https://discord.com/api/webhooks/1161992356720029706/dAs6bM1a58QKcl3vVSG0RSWPWOjapbNdDYOcA0DXTN6nUqeB7n3QR_qUjJvx44dz8VC4';

    const now = new Date();

    const data = {
        "content": null,
        "embeds": [
            {
                "title": "มีการ PUSH แนกำเข้ามาที่ Repo ของเรา(กดเพื่อเข้าไปดูการเปลี่ยนแปลง)",
                "description": `ข้อความ commit : ${message}
                url commit: ${url}
                commit เวลา: ${time}`,
                "url": url,
                "color": 47359,
                "footer": {
                    "text": name,
                    "icon_url": profile
                },
                "timestamp": now.toISOString()
            }
        ],
        "attachments": []
    }

    axios.post(webhookURL, data)
        .then(response => {
            console.log('ส่งข้อมูลไปยัง Discord สำเร็จ');
            console.log("\n" + response);
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง Discord:', error);
        });

}

app.post('/payload', (req, res) => {
    console.log("/payload" + req.body);
    res.status(200).end();
})

app.post('/', (req, res) => {
    const body = req.body;
    sending(body.head_commit.message, body.head_commit.url, body.sender.avatar_url, body.sender.login, body.head_commit.timestamp);

    res.status(200).end();
})

app.get('/send', (req, res) => {
    sending();
    res.status(200).end();
})

app.listen(3500, () => {
    console.log("http://localhost:3500");
})

