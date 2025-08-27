const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

// Receber JSON e texto grande
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.text({ type: ["text/html", "text/plain"], limit: "20mb" }));

/**
 * HTML → PNG
 */
app.post("/html-to-image", async (req, res) => {
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

    console.log("📸 PNG gerado com sucesso");
  } catch (err) {
    console.error("🚨 Erro ao gerar imagem:", err);
    res.status(500).json({ error: "Erro ao gerar imagem", detalhes: err.message });
  }
});

/**
 * HTML → XLS
 */
app.post("/html-to-xls", async (req, res) => {
  try {
    const html = typeof req.body === "string" ? req.body : req.body?.html;
    if (!html || typeof html !== "string") 
      return res.status(400).json({ error: "HTML inválido" });

    // Corrige caracteres deformados
    
    function corrigirAcentos(text) {
      if (!text || typeof text !== "string") return text;
      return text
        .replace(/Hor\uFFFDrio In\uFFFDcio/g, "Horário Início") // substitui Hor�rio In�cio
        .replace(/Hor\uFFFDrio Fim/g, "Horário Fim")           // substitui Hor�rio Fim
        .replace(/Artista/g, "Artista")                         // exemplo, se precisar
        .replace(/Dia da Semana/g, "Dia da Semana");           // exemplo
    }

    const htmlCorrigido = corrigirAcentos(html);

    // HTML completo com meta charset
    const htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          ${htmlCorrigido}
        </body>
      </html>
    `;

    // Adiciona BOM UTF-8
    const bom = Buffer.from("\uFEFF", "utf8");
    const buffer = Buffer.concat([bom, Buffer.from(htmlContent, "utf8")]);

    res.setHeader("Content-Disposition", "attachment; filename=tabela.xls");
    res.setHeader("Content-Type", "application/vnd.ms-excel; charset=UTF-8");
    res.send(buffer);

    console.log("📄 XLS gerado com sucesso!");
  } catch (err) {
    console.error("🚨 Erro ao gerar XLS:", err);
    res.status(500).json({ error: "Erro ao gerar XLS", detalhes: err.message });
  }
});


// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
