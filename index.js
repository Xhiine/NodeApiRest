const MongoController = require('./controllers/mongo/mongoController.js')
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(cors());

var mongoC;

const port = 3001;
app.listen(port, () => {
 console.log("Server running on port " + port);
  mongoC = new MongoController("mongodb+srv://mongoUsr:n9f5EPocGguR0Jvd@cluster0-xjofq.mongodb.net/NPAW-TestDB?retryWrites=true&w=majority");
});

app.get('/user', function (req, res) {
  mongoC.getAccount(null, function(accounts){
    res.send(accounts);
  }, function(err){
    res.send(err)
  });
});

app.post('/user', function (req, res) {
  mongoC.newAccount(req.body.name, req.body.password, req.body.commentary, req.body.permissionList, function(){
    res.sendStatus(204);
  }, function(err){
    res.send(err)
  });
});

app.post('/user/:id', function (req, res) {
  mongoC.updateAccount(req.params.id, req.body.permissionList, function(){
    res.sendStatus(204);
  }, function(err){
    res.send(err)
  });
});

app.get('/user/:id', function (req, res) {
  mongoC.getAccount(req.params.id, function(accounts){
    res.send(accounts);
  }, function(err){
    res.send(err)
  });
});

app.delete('/user/:id', function (req, res) {
  mongoC.removeAccount(req.params.id, function(){
    res.sendStatus(204);
  }, function(err){
    res.send(err);
  });
});

app.get('/permission', function (req, res) {
  mongoC.getPermission(null, function(permission){
    res.send(permission);
  }, function(err){
    res.send(err)
  });
});

app.post('/permission', function (req, res) {
  mongoC.newPermission(req.body.name, req.body.commentary, function(){
    res.sendStatus(204);
  }, function(err){
    res.send(err)
  });
});

app.get('/permission/:id', function (req, res) {
  mongoC.getPermission(req.params.id, function(permission){
    res.send(permission);
  }, function(err){
    res.send(err);
  });
});

app.delete('/permission/:id', function (req, res) {
  mongoC.removePermission(req.params.id, function(){
    res.sendStatus(204);
  }, function(err){
    res.send(err);
  });
});