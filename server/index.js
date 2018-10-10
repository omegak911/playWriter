import express from 'express';
import path from 'path';
import parser from 'body-parser';

const app = express();
const port = 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

//router goes here
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(port, () => console.log(`server is listening on port ${port}`));