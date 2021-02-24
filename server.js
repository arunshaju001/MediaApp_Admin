const app = require('./app');
const express = require('express');
const port = process.env.PORT || 5100;

app.use(express.static(__dirname+'/public'));


app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get(['/admin/login','/admin/'],(req,res) => {
    res.render('login',{error: req.query.valid?req.query.valid:'',
    msg: req.query.msg?req.query.msg:''})
})

app.get('admin/*',(req,res) => {
  res.send('<center><b><h1>Error 404 not found!!!</h1></b></center>')
})


app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});