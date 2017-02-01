"use strict";
var express = require('express');
var router = express.Router();
var moment = require('moment');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/homeautomation.db');

/* GET last values ventilation temp. */
router.get('/', function (req, res, next) {

    db.all('SELECT * FROM VENTILATION ORDER BY timestamp DESC LIMIT 1', function (err, row) {
        if (err !== null) {
            res.json(err);
        } else {
            //console.log(row);
            res.status(200).json(row);
        }
    });
});

/*
 * POST to add ventilation temperature data
 */
router.post('/', function (req, res) {

    var fresh = req.body.fresh,
        supply_hr = req.body.supply_hr,
        supply = req.body.supply,
        waste = req.body.waste,
        exhaust = req.body.exhaust,
        exhaust_humidity = req.body.exhaust_humidity,
        hr_effiency_in = req.body.hr_effiency_in,
        hr_efficiency_out = req.body.hr_efficiency_out,
        humidity_48h = req.body.humidity_48h,
        control_state = req.body.control_state,
        heating_status = req.body.heating_status,
        timestamp = new Date().getTime(),
        sqlRequest = "INSERT INTO 'VENTILATION' (timestamp, fresh, supply_hr, supply, waste, exhaust, exhaust_humidity, hr_effiency_in, hr_efficiency_out, humidity_48h, control_state, heating_status) " +
                     "VALUES('" + timestamp + "', '" + fresh + "','" + supply_hr + "','" + supply + "','" + waste + "','" + exhaust + "','" + exhaust_humidity + "','" + hr_effiency_in + "','"+ hr_efficiency_out + "','" + humidity_48h + "','" + control_state + "','" + heating_status + "')";
    db.run(sqlRequest, function(err) {
        if (err !== null) {
            res.json(err);
        } else {
            res.json(201);
        }
    });
});

module.exports = router;
