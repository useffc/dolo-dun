var express = require('express');
var quotes = require('./lib/quotes.js');
var model = require('./data');

module.exports = function(app) {
  app.route('/')
  .get(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  })
  .post(function(req, res) {
    console.log('damn');
    res.sendStatus(200);
  });
  app.route('/data')
  .get(function(req, res) {
    model.find(function(err, data) {
      if(err) {
        res.send(err);
      }
      res.json(data);
    });
  })
  .post(function(req, res) {
    var item = new model();
    item.name = req.body.name;
    item.surname = req.body.surname;
    item.style = req.body.style;
    item.color = req.body.color;
    console.log(req);

    item.save(function(err) {
      if(err) {
        res.send(err);
      }

      res.json({
        message: 'new item created',
        data: item
      });
    });
  });
  //individual
  app.route('/data/:item_id')
    .get(function(req, res) {
      model.findById(req.params.item_id, function(err, item) {
        if(err) {
          res.send(err);
        }
        res.json(item);
      });
    })
    .put(function(req, res) {
      model.findById(req.params.item_id, function(err,item) {
        if(err) {
          res.send(err);
        }
        item.name = req.body.name;
        item.surname = req.body.surname;
        item.style = req.body.style;
        item.color = req.body.color;
        item.save(function(err) {
          if(err) {
            res.send(err);
          }
          res.json({
            message: 'item updated',
            data: item
          });
        });
      });
    })
    .delete(function(req, res) {
      model.findByIdAndRemove(req.params.item_id, function(err, item) {
        if(err) {
          res.send(err);
        }
        res.json({
          message: 'item deleted',
          item: item
        });
      });
    });
};
