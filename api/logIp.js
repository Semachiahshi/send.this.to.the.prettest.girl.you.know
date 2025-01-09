export default function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Logged IP: ${ip}`);
    res.status(200).send(`Your IP has been logged: ${ip}`);
}
