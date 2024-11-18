const express = require('express');
const app = express();
const connect = require('./databases/data');
const Reservar = require('./databases/Table');
const BodyParser = require('body-parser');


//Configuração de url e identificação de arquivo html
app.set('view engine', 'ejs');
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));


connect.authenticate().then(()=>{
    console.log('authenticated');
});
app.get("/",(req, res)=>{
    res.render("welcome");
});

app.get("/inicio",(req, res)=>{
    res.render('home')
});
app.get("/reservas",(req, res)=>{
    Reservar.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(reserva=> {
        
        res.render('reservados',{
            reserva: reserva
           
        });
    });
  
});

app.post('/guardar',(req, res)=>{
    var name = req.body.motorista;
    var email = req.body.email;
    var tipoDeCarro = req.body.cartype;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;

    Reservar.create({
        name: name,
        email: email,
        selectCarros: tipoDeCarro,
        datainicio: startdate,
        datafim: enddate
    }).then(()=>{
        res.redirect('/reservas');
    });});

app.delete('/baixadereserva', (req, res)=>{
    var startdate = req.body.startdate;
    
    res.send("Carro livre para agendar")
});

app.listen(80,()=>{
    console.log("Servidor ligado");
});