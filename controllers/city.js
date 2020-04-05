const City = require("../models/city");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.cityById = (req, res, next, id) => {
  City.findById(id).exec((err, city) => {
        if (err || !city) {
            return res.status(400).json({
                error: "المدينه غير موجودة يرجى اضافتها"
            });
        }
        req.city = city;
        next();
    });
};

exports.create = (req, res) => {
    const city = new City(req.body);
    city.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.city);
};

exports.update = (req, res) => {
    const city = req.city;
    city.name = req.body.name;
    city.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const city = req.city;
    city.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "city deleted"
        });
    });
};

exports.list = (req, res) => {
    City.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
