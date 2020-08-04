const express = require('express'),
layout = require('express-ejs-layouts'),
ejs = require('ejs'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
app = express()
let Article = require('./models/article')

mongoose.connect('mongodb://localhost/nodeCrud', {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('open', () => {
    console.info("Baza bilan ulandi")
})

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3333)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(layout)

app.get('/', (req, res) => {
    Article.find({}, (err, data) => {
        if(err) throw err
        res.render('index', {title:"Bosh sahifa", data:data})
    })
    
})

app.get('/maqola/joylash', (req, res) => {
    res.render('add', {title: "Maqola joylash"})
})

app.post('/maqola/joylash', (req, res) => {
    var maqola = new Article()

    maqola.title = req.body.title
    maqola.author = req.body.author
    maqola.body = req.body.body

    maqola.save((err) => {
        if(err) throw err
        else {
            res.redirect('/')
        }
    })
})

app.get('/maqola/:id', (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        if(err) throw err

        res.render('single', {data:data})
    })
})

app.get('/maqola/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        if(err) throw err
        res.render('edit_single', {data:data})
    })
})

app.post('/maqola/edit/:id', (req, res) => {
    var maqola = {}

    maqola.title = req.body.title
    maqola.author = req.body.author
    maqola.body = req.body.body

    Article.updateOne({_id:req.params.id}, maqola, (err) => {
        if(err) throw err
        else {
            res.redirect('/maqola/'+req.params.id)
        }
    })
})

app.delete('/maqola/:id', (req, res) => [
    Article.deleteOne({_id:req.params.id}, (err) => {
        if(err) throw err
        else {
            res.send('Success')
        }
    })
])

app.listen(app.get('port'), () => {
    console.info(`Server Port:${app.get('port')} da ishga tushdi...`)
})
