const express=require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const Materias = require('../../services/materias');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Chart = require('chart.js');

router.post('/add', async (req, res) => {
    const {
        nombre,
        hora,
        grupo
    } = req.body;
    await Materias.createMaterias(nombre, hora, grupo);
    res.redirect('/materias');
});

// Ruta para obtener datos de la API
router.get('/materias', async (req, res) => {
    const data = await Materias.getMaterias();
    res.json( data )
  });

  router.get('/materiasOne/:id', async (req, res) => {
    const materiaId = req.params.id;
    const data = await Materias.getOneMaterias(materiaId);
    res.json( data )
  });

  router.delete('/delete/:id', async (req, res) => {
    const materiaId = req.params.id;
    const data = await Materias.deleteMaterias(materiaId);
    res.json( data )
  });

  router.put('/edit/:id', async (req, res) => {
    const materiaId = req.params.id;
    console.log(materiaId);
    const { nombre, hora, grupo } = req.body;
    try {
        // Llama a la función editMaterias para editar la materia
        const materiaEditada = await Materias.editMaterias(materiaId, nombre, hora, grupo);
        // Devuelve la materia editada como respuesta
        res.json(materiaEditada);
    } catch (error) {
        // Maneja errores
        console.error('Error al editar materia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
router.get('/', isLoggedIn, async (req, res) => {
    const response = await axios.get('http://localhost:3000/materias/materias'); // Reemplaza con la URL de tu API
    const data = response.data;
    res.render('materias/materias', {data});
});

router.get('/materiaAdd', isLoggedIn, async (req, res) => {
    const response = await axios.get('http://localhost:3000/materias/materias'); // Reemplaza con la URL de tu API
    const data = response.data;
    res.render('materias/materiaAdd', {data});
});

router.get('/detalles/:id', isLoggedIn, async (req, res) => {
    const response = await axios.get('http://localhost:3000/materias/materiasOne/' + req.params.id);
    const data = response.data;
    console.log("Data: "+data)
    res.render('materias/materiaDetalles', {data});
});

// router.post('/delete/:id', isLoggedIn, async (req, res) => {
//     const response = await axios.get('http://localhost:3000/materias/delete/' + req.params.id);
//     const data = response.data;
//     res.redirect('materias/materias', {data});
// });

// router.post('/edit/:id', isLoggedIn, async (req, res) => {
//     const response = await axios.get('http://localhost:3000/materias/edit/' + req.params.id);
//     const data = response.data;
//     res.redirect('materias/materias', {data});
// });

router.post('/generar-pdf', (req, res) => {
    var data = req.body;

    var doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('tabla.pdf'));

    var table = {
        headers: data[0],
        rows: data.slice(1)
    };

    var tableWidth = 500;
    var cellPadding = 10;

    function drawTable(table, startX, startY) {
        var headerY = startY;
        var rowY = headerY + doc.currentLineHeight();

        doc
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(table.headers.join('   '), startX, headerY);

        doc.font('Helvetica')
            .fontSize(10);

        table.rows.forEach(row => {
            row.forEach((cell, i) => {
                doc.text(cell, startX + (i * tableWidth / table.headers.length), rowY)
                    .lineWidth(0.5)
                    .stroke();
            });
            rowY += doc.currentLineHeight() + cellPadding;
        });
    }

    drawTable(table, 50, 50);

    doc.end();

    res.download('tabla.pdf');
});

module.exports = router;