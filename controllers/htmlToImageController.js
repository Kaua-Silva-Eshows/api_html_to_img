const puppeteer = require('puppeteer');

exports.htmlToImage = async (req, res) => {
  try {
    const html = typeof req.body === "string" ? req.body : req.body?.html;
    if (!html || typeof html !== "string") return res.status(400).json({ error: "HTML inválido" });

    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });

    const imageBuffer = await page.screenshot({ fullPage: true, type: "png" });
    await browser.close();

    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar imagem", detalhes: err.message });
  }
};