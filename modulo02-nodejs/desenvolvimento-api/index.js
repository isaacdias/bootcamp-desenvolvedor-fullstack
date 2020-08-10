import express from 'express';

const app = express();
app.use(express.json());
// all
app.all('/testAll', (req, res) => {
  res.send(req.method);
});

//  caracteres especiais
app.get('/teste?', (req, res) => {
  res.send('/teste?');
});

app.get('/buzz+?', (req, res) => {
  res.send('/buzz+');
});

app.get('/one*Blue', (req, res) => {
  res.send(req.path);
});

app.post('/test(ing)?', (req, res) => {
  console.log(req.body);
  res.send('/test(ing)?');
});

app.get('/testeParams/:id', (req, res) => {
  res.send(req.params.id);
});

app.listen(3000, () => {
  console.log('API started');
});
