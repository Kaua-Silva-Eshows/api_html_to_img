const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.text({ type: ["text/html", "text/plain"], limit: "20mb" }));

app.post("/html-to-image", async (req, res) => {
  try {
    const html = typeof req.body === "string" ? req.body : req.body?.html;
    if (!html) return res.status(400).json({ error: "HTML não fornecido" });

    console.log("📥 HTML recebido");

    // Descobre o caminho real do Chrome
    const { executablePath } = puppeteer;
    console.log("🧭 Caminho do Chrome:", executablePath());

    const browser = await puppeteer.launch({
  executablePath: executablePath(),
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});


    console.log("✅ Navegador iniciado");

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });

    const imageBuffer = await page.screenshot({ fullPage: true, type: "png" });

    await browser.close();
    console.log("📸 Imagem gerada com sucesso");

    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (err) {
    console.error("🚨 Erro ao gerar imagem:", err);
    res.status(500).json({ error: "Erro ao gerar imagem", detalhes: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});