const express = require("express");
const bodyParser = require("body-parser");
const index = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.text({ type: ["text/html", "text/plain"], limit: "20mb" }));

app.use("/", index);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
