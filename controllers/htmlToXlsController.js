exports.htmlToXls = async (req, res) => {
  try {
    const html = typeof req.body === "string" ? req.body : req.body?.html;
    if (!html || typeof html !== "string") return res.status(400).json({ error: "HTML inválido" });

    const htmlCorrigido = html.replace(/Hor\uFFFDrio In\uFFFDcio/g, "Horário Início").replace(/Hor\uFFFDrio Fim/g, "Horário Fim");

    const htmlContent = `<html><head><meta charset="UTF-8"></head><body>${htmlCorrigido}</body></html>`;
    const bom = Buffer.from("\uFEFF", "utf8");
    const buffer = Buffer.concat([bom, Buffer.from(htmlContent, "utf8")]);

    res.setHeader("Content-Disposition", "attachment; filename=tabela.xls");
    res.setHeader("Content-Type", "application/vnd.ms-excel; charset=UTF-8");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar XLS", detalhes: err.message });
  }
};