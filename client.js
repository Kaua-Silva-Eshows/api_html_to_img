const fs = require("fs");
const axios = require("axios");

(async () => {
    const html = `
<!DOCTYPE 
html><html 
lang="pt-BR"><head> <meta charset="UTF-8"> <title>Tabela de Shows</title> <style> 
body { font-family: Arial, sans-serif; margin: 20px; } table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #000; 
  padding: 8px; text-align: left; } th { background-color: #ffb131; color: #fff; } /* Header laranja */ td { word-wrap: break-word; max-width: 250px; } 
  tbody tr:nth-child(even) { background-color: #f2f2f2; } /* linhas pares cinza */ tbody tr:nth-child(odd) { background-color: #ffffff; } /* linhas ímpares brancas */ 
  tbody tr:hover { background-color: #ffe8b3; } /* opcional: highlight ao passar o mouse */ </style></head><body> <h2>Tabela de Shows</h2> <table> <thead> 
  <tr> <th>DATA</th> <th>ARTISTA</th> <th>HORÁRIO INÍCIO</th> <th>HORÁRIO FIM</th> <th>DIA DA SEMANA</th> </tr> </thead> <tbody> <tr> 
  <td>20 de ago.</td> <td>Dj teo</td> <td>07:00</td> <td>10:00</td> <td>quarta-feira</td> </tr> <tr> <td>20 de ago.</td> <td>Fets Dômino</td>
   <td>19:00</td> <td>21:30</td> <td>quarta-feira</td> </tr> <tr> <td>20 de ago.</td> <td>Caju Hassen</td> <td>19:30</td> <td>22:30</td> 
   <td>quarta-feira</td> </tr> <tr> <td>20 de ago.</td> <td>Fabio Rodrigues</td> <td>20:00</td> <td>22:15</td> <td>quarta-feira</td> </tr> 
   <tr> <td>20 de ago.</td> <td>Renata Dalmora Bossa Jazz - Bossa</td> <td>20:00</td> <td>22:00</td> <td>quarta-feira</td> </tr> <tr> 
   <td>21 de ago.</td> <td>Jere Buchert</td> <td>07:00</td> <td>10:00</td> <td>quinta-feira</td> </tr> <tr> <td>21 de ago.</td> <td>Música Brasileira Em vinil</td> <td>19:00</td> <td>23:00</td> <td>quinta-feira</td> </tr> <tr> <td>21 de ago.</td> <td>Fabio Rodrigues</td> <td>20:00</td> <td>22:30</td> <td>quinta-feira</td> </tr> <tr> <td>21 de ago.</td> <td>Ellen Chelsea</td> <td>20:30</td> <td>22:45</td> <td>quinta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Dj teo</td> <td>07:00</td> <td>10:00</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Projeto BLOCS</td> <td>12:30</td> <td>14:45</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Kadu Justa</td> <td>18:00</td> <td>20:00</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Renan Amorim</td> <td>18:30</td> <td>21:30</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Márcio Macedo Acústico </td> <td>19:30</td> <td>22:30</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Neon Band - John Mayer Tribute</td> <td>20:00</td> <td>23:00</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>OUTRORA</td> <td>20:30</td> <td>22:45</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Sessions - Banda, Duo e Trio</td> <td>20:30</td> <td>23:00</td> <td>sexta-feira</td> </tr> <tr> <td>22 de ago.</td> <td>Fets Dômino</td> <td>20:31</td> <td>22:46</td> <td>sexta-feira</td> </tr> <tr> <td>23 de ago.</td> <td>Liehdj</td> <td>09:00</td> <td>12:00</td> <td>sábado</td> </tr> <tr> <td>23 de ago.</td> <td>DJ FIL</td> <td>18:00</td> <td>20:00</td> <td>sábado</td> </tr> <tr> <td>23 de ago.</td> <td>Two Brothers</td> <td>18:30</td> <td>21:30</td> <td>sábado</td> </tr> <tr> <td>23 de ago.</td> <td>Indayana</td> <td>19:30</td> <td>22:30</td> <td>sábado</td> </tr> <tr> <td>23 de ago.</td> <td>Rodrigo Aragão</td> <td>20:30</td> <td>22:45</td> <td>sábado</td> </tr> <tr> <td>23 de ago.</td> <td>TATIANNA FREITAS</td> <td>20:30</td> <td>23:00</td> <td>sábado</td> </tr> <tr> <td>23 de ago.</td> <td>Daniel Cobaia</td> <td>20:31</td> <td>22:45</td> <td>sábado</td> </tr> <tr> <td>24 de ago.</td> <td>Gestão Eshows</td> <td>07:00</td> <td>08:00</td> <td>domingo</td> </tr> <tr> <td>24 de ago.</td> <td>Jere Buchert</td> <td>09:00</td> <td>12:00</td> <td>domingo</td> </tr> <tr> <td>24 de ago.</td> <td>Supernova</td> <td>19:00</td> <td>21:30</td> <td>domingo</td> </tr> </tbody> </table></body></html>
`;

    const resp = await axios.post(
        "http://localhost:3000/html-to-image",
        { html },
        { responseType: "arraybuffer" }
    );

    fs.writeFileSync("tabela.png", resp.data);
    console.log("✅ Imagem salva em tabela.png");
})();
