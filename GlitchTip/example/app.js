const express = require('express');
const Sentry = require("@sentry/node");
Sentry.init({
    dsn: "http://c0ef338276fe46739bc4f8b008e8c71b@localhost:8000/1"
});

const app = express();

app.use(Sentry.Handlers.requestHandler());

app.get("/", (req, res) => {
    res.json({ status: "success", message: "This is a GlitchTip test app" });
});

app.get("/error", (req, res) => {
    throw new Error("My first GlitchTip error!");
});

app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}`); });
