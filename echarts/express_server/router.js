const express = require('express');
const home = express.Router();
const fs = require('fs');
const seller = require('./data/seller.json')
const budget = require('./data/budget.json')
const hotproduct = require('./data/hotproduct.json')
const map = require('./data/map.json')
const rank = require('./data/rank.json')
const stock = require('./data/stock.json')
const trend = require('./data/trend.json')

home.get('/seller', (req, res) => {
    res.send(seller)
})
home.get('/budget', (req, res) => {
    res.send(budget)
})
home.get('/hotproduct', (req, res) => {
    res.send(hotproduct)
})
home.get('/map', (req, res) => {
    res.send(map)
})
home.get('/rank', (req, res) => {
    res.send(rank)
})
home.get('/stock', (req, res) => {
    res.send(stock)
})
home.get('/trend', (req, res) => {
    res.send(trend)
})
module.exports = home;