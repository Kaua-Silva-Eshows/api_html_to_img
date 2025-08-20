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
if (!html || typeof html !== "string") {
  return res.status(400).json({ error: "HTML inválido" });
}

    console.log("📥 HTML recebido");
    // const fs = require("fs");
    // const path = require("path");
    // const puppeteerChromiumPath = path.join(__dirname, "node_modules", "puppeteer", ".local-chromium");
    // console.log("📂 Conteúdo de .local-chromium:");
    // fs.readdirSync(puppeteerChromiumPath).forEach(folder => console.log(" -", folder));
    const { execSync } = require("child_process");
    try {
      const systemChrome = execSync("which google-chrome").toString().trim();
      console.log("📌 Chrome do sistema encontrado em:", systemChrome);
    } catch (err) {
      console.log("⚠️ Chrome do sistema não encontrado");
    }
    // --------------------------

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome"
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