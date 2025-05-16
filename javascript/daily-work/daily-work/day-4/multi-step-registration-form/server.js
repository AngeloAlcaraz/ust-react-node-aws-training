const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Almacén en memoria
const formDataList = [];

app.use(bodyParser.json());

// Servir archivos estáticos (como index.html)
app.use(express.static('public'));

// Endpoint para guardar los datos del formulario
app.post('/api/data', (req, res) => {
  const formData = req.body;
  console.log('Data received:', formData);

  // Guardar en la lista
  formDataList.push(formData);

  res.json({ message: 'Data saved successfully' }); 
});

// Endpoint para ver los datos guardados
app.get('/api/data', (req, res) => {
  res.json(formDataList);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Listening server on http://localhost:${port}`);
});
