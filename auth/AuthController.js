const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const News = require('../user/News')
const User = require('../user/User')
const config = require('../config')

app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs')
app.set('views', './public/views')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/register', function(req, res) {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword,

    },
    function (err, user) {
      if (err){
        if(err.code==11000){
          const string = encodeURIComponent('User already exists');
          res.redirect('/admin/login?valid=' + string);
        }
        else{
        const string = encodeURIComponent('There was a problem registering the user');
        res.redirect('/admin/login?valid=' + string);
        }
      }
      else{
      const string = encodeURIComponent('Successfully Registered');
      res.redirect('/admin/login?msg=' + string);
      }
    }); 
  });

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      const string = encodeURIComponent('Please enter valid Credentials');
      if (!user) { res.redirect('/admin/login?valid=' + string);}
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        const expiration = 106400
        const string = encodeURIComponent('Please enter valid Credentials');
        if (!passwordIsValid)  { res.redirect('/admin/login?valid=' + string);}
        else{
        var token = jwt.sign({ id: user._id, admin: user.admin }, config.secret, {
            expiresIn: 106400 
        });
      
        res.cookie('token', token, {
          expires: new Date(Date.now() + expiration),
          secure: false, // set to true if your using https
          httpOnly: true
        })
        // console.log("\n\nLogin Success\n\n")
        res.redirect(`/admin/users/addnews`);
      }
      }
    });
});

router.post('/addnews', function(req, res) {
  const token = req.cookies.token || null
  if (!token) {
    res.redirect('/admin/login')
  }
  else{
    News.create({
      title : req.body.title,
      newsdesc : req.body.newsdesc,
      url : req.body.url,
      image : req.body.image,
      date : req.body.date

    },
    function (err, user) {
      if (err){
        if(err.code==11000){
          const string = encodeURIComponent('News already exists');
          res.redirect('/admin/users/addnews?valid=' + string);
        }
        else{
        const string = encodeURIComponent('There was a problem in adding News');
        res.redirect('/admin/users/addnews?valid=' + string);
        }
      }
      else{
      const string = encodeURIComponent('News added Successfully');
      res.redirect('/admin/users/addnews?msg=' + string);
      }
    })
  }
})

router.delete('/delete', function(req, res) {
  News.findOneAndDelete({ title: req.body.title }, function (err, result) {
    if (err) return res.status(500).send('Error on the server.')
    else{
      res.send({message: 'success'})
    }
  })
})

router.post('/findnews', function(req, res) {
  News.findOne({ title: req.body.title }, function (err, news) {
    if (err) return res.status(500).send('Error on the server.')
    else{
      res.send(news)
    }
  })
})

router.put('/update', function(req, res) {
  News.findOneAndUpdate({ title: req.body.title }, {
    $set:{
    title:req.body.newtitle,
    newsdesc:req.body.newsdesc
}},{upsert:true}, function (err, news) {
    if (err) return res.status(500).send('Error on the server.')
    else{
      res.send({message: 'success'})
    }
  })
})

module.exports = router