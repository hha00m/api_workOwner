const ClientStatement = require('../../models/financeModels/clientStatement');
const { errorHandler } = require('../../helpers/dbErrorHandler');

exports.clientStatementById = (req, res, next, id) => {
    ClientStatement.findById(id).exec((err, clientStatement) => {
        if (err || !clientStatement) {
            return res.status(400).json({
                error: ' غير موجودة يرجى اضافتها',
            });
        }
        req.clientStatement = clientStatement;
        next();
    });
};
exports.create = (req, res) => {
    const clientStatement = new ClientStatement(req.body);
    clientStatement.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};
exports.read = (req, res) => {
    return res.json(req.clientStatement);
};
exports.update = (req, res) => {
    ClientStatement.update({ _id: req.body.id }, {
        $set: {
            note: req.body.note,
            balance: req.body.balance,

        },
    }).then((result) => { res.json(result) })
        .catch((err) => {
            return res.status(400).json({ error: errorHandler(err) })
        })
};
exports.increaseBalanceAssets = (req, res) => {

    ClientStatement.update({ client: req.body.client }, {
        $inc: {
            balance: req.body.balance,
        },
    }).then((result) => { res.json(result) })
        .catch((err) => {
            return res.status(400).json({ error: errorHandler(err) })
        })
};
exports.remove = (req, res) => {
    ClientStatement.deleteOne({ _id: req.body.keys[0] }).then((result) => {
        res.json({
            message: 'type deleted successfully',
        });
    }).catch((err) => {
        return res.status(400).json({
            error: errorHandler(err),
        });
    })
};
exports.list = (req, res) => {
    const pageSize = 20; //page size which is limeit
    const current = 0; // return currnet page else 0


    ClientStatement
        .find()
        .populate('client', 'name _id')
        // .populate('store', 'name _id')
        // .skip(pageSize * current)
        // .limit(pageSize)
        .sort({ name: 1 })
        .then((clientStatements) => {
            res.json({
                data: clientStatements,
                success: true,
                current,
                pageSize,
                total: clientStatements.length,
            });
        }).catch((err) => {
            return res.status(400).json({
                success: false,
                error: 'clientStatement not found',
            })
        })

};
