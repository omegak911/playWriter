import express from 'express';
import path from 'path';
import parser from 'body-parser';

import ctrl from './controller';

const app = express();
const port = 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

//router goes here

app.get('/api', async (req,res) => {
  let scripts = await ctrl.readFileCtrl();
  res.status(200).send(scripts);
});

app.post('/api', (req, res) => {
  let scripts = req.body;
  ctrl.writeFileCtrl(scripts);
});

app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(port, () => console.log(`server is listening on port ${port}`));