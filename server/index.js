import express from 'express';
import path from 'path';
import parser from 'body-parser';

import ctrl from './controller';

const app = express();
const port = 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/script', async (req,res) => {
  let scripts = await ctrl.readFileCtrl();
  res.status(200).send(scripts);
});

app.post('/api/edit', async (req, res) => {
  let scripts = req.body;
  await ctrl.writeFileCtrl(scripts);
  res.status(201).send('success');
});

app.get('/api/draft', async (req, res) => {

  //readfile
  let draft = await ctrl.readDraftCtrl()
  res.status(200).send(draft);
})

app.post('/api/draft', async (req, res) => {
  let { draft } = req.body;
  //writefile
  ctrl.writeDraftCtrl(draft);
  res.status(201).send('success');
})

app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(port, () => console.log(`server is listening on port ${port}`));