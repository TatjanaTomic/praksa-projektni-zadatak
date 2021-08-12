const express = require('express');
const router = express.Router();
const measurementDao = require('../dao/measurementDao');
const deviceDao = require('../dao/deviceDao');

router.get('/', (req, res) => {
    measurementDao.getAllMeasurements(result => {
        res.status(200).json({
            measurements : result
        })
    })
})

router.get('/:id', (req, res) => {
    let measurementId = req.params.id;
    if(measurementId){
        measurementDao.getMeasurementById(measurementId, result => {
            if(result){
                res.status(201).json({ //200
                    result
                })
            }
            else{
                res.status(404).json({
                    error : 'Measurement not found'
                })
            }
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})

router.get('/device/:id/latest', (req, res) => {
    let deviceId = req.params.id; //????
    if(deviceId){
        measurementDao.getLatestMeasurementByDeviceId(deviceId, result => {
            if(result){
                res.status(201).json({ //200
                    result
                })
            }
            else{
                res.status(404).json({
                    error : 'Measurements not found'
                })
            }
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})

router.get('/device/:id', (req, res) => {
    let deviceId = req.params.id; //????
    if(deviceId){
        measurementDao.getMeasurementsByDeviceId(deviceId, result => {
            if(result){
                res.status(201).json({ //200
                    result
                })
            }
            else{
                res.status(404).json({
                    error : 'Measurements not found'
                })
            }
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})



router.post('/', (req, res) => {
    let measurement = req.body;
    console.log('measurement', measurement);
    if(measurement){
        measurementDao.addMeasurement(measurement, result => {
            deviceDao.getDeviceById(measurement.deviceId, result =>  {
                res.status(201).json(
                    result
                )
            })
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})


/*
router.put('/:id/measurementInterval', (req, res) => {
    let deviceId = req.params.id;
    let measurementInterval = req.body.measurementInterval;
    if(deviceId&&measurementInterval){
        deviceDao.updateDeviceMeasurementInterval(deviceId, measurementInterval, result => {
            if(result&&result.affectedRows>0){
                res.status(200).json({
                    result
                })
            }
            else{
                res.status(404).json({
                    error : 'Device not found'
                })
            }
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})

router.put('/:id/serialNumber', (req, res) => {
    let deviceId = req.params.id;
    let serialNumber = req.body.serialNumber;
    if(deviceId&&serialNumber){
        deviceDao.updateDeviceSerialNumber(deviceId, serialNumber, result => {
            if(result&&result.affectedRows>0){
                res.status(200).json({
                    result
                })
            }
            else{
                res.status(404).json({
                    error : 'Device not found'
                })
            }
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})

*/

router.delete('/:id', (req, res) => {
    let deviceId = req.params.id;
    if(deviceId){
        deviceDao.deleteDevice(deviceId, result => {
            res.status(204).json({
                result
            })
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})

//just as an example of query parameters
router.delete('/', (req, res) => {
    let deviceId = req.query.deviceId;
    if(deviceId){
        deviceDao.deleteDevice(deviceId, result => {
            res.status(204).json({
                result
            })
        })
    }else{
        res.status(422).json({
            error : 'Invalid parameters.'
        })
    }
})

module.exports = router;
