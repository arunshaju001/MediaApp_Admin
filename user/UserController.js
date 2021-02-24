const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('../config')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
const User = require('./User')
const News = require('./News')



router.get('/viewnews', function (req, res) {
    const token = req.cookies.token || null
    // console.log(req.cookies)
    if (!token) {
        res.redirect('/admin/login')
    }
    else{
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.redirect('/admin/login')
        }
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/admin/login')}
            if (!user) {res.redirect('/admin/login')}
            News.find({},(err,news)=>{
                if (err) res.status(500).send('Error on the server.')
                else if (!news) res.status(500).send('News not Found')
                else{
                    res.render('viewnews.ejs',{user , news})
                }
                
            })
            
        })
    })
    }
})

router.get('/addnews', function (req, res) {
    const token = req.cookies.token || null
    // console.log(req.cookies)
    if (!token) {
        res.redirect('/admin/login')
    }
    else{
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.redirect('/admin/login')
        }
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/admin/login')}
            if (!user) {res.redirect('/admin/login')}
            else{
                res.render('addnews.ejs',{user, error: req.query.valid?req.query.valid:'', msg: req.query.msg?req.query.msg:'' })
            }
             
        })
    })
    }
})

 router.get('/logout', (req,res) => {
    res.clearCookie("token");
    res.redirect('/admin/login');
 })




module.exports = router