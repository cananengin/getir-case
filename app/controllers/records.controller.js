const {Record} = require('../models/Records');
const validator = require('validator');

module.exports = {
    sayHi: sayHi,
    getRecords: getRecords
};

function sayHi(req, res) {
    res.send('Getir Bir Mutluluk');
};
async function getRecords(req, res) {

    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const minCount = req.body.minCount;
    const maxCount = req.body.maxCount;  

    let recordsResponse;

    if (endDate < startDate) {
        return res.status(422).send({
            code: -1,
            msg: 'endDate < startDate'
        });
    } else if (typeof maxCount === 'string' || typeof minCount === 'string') {
        return res.status(422).send({
            code: -1,
            msg: 'maxCount and minCount should be a number'
        });
    } else if(minCount > maxCount) {
        return res.status(422).send({
            code: -1,
            msg: 'maxCount < minCount'
        });
    } else if (maxCount.length === 0 || minCount.length === 0 || startDate.length === 0 || endDate.length === 0) {
        return res.status(500).send({
            error: "empty value"
        });
    }
    else {
        try {
            const records = await Record.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gt: new Date(startDate),
                            $lt: new Date(endDate)
                        }
                    }
                },
                {
                    $project: {
                        key: 1,
                        _id: 0,
                        createdAt: 1,
                        totalCount: {
                            $sum: '$counts'
                        }
                    }
                },
                {
                    $match: {
                        totalCount: {
                            $gt: parseInt(minCount),
                            $lt: parseInt(maxCount)
                        }
                    }
                }
            ])
            
            recordsResponse=records.length>1?recordResponse = {code: 0, msg: 'success', records}:{code: 1, msg: 'There is no record'}
            res.status(200)
    
            const rest = await Record.find({});
            console.log("rest", rest)
        } catch (e) {
            console.log(e)
            recordResponse = {code: -1, msg: 'Body not correct (startDate, endDate, minCount, maxCount)'}
            res.status(422)
        } finally {
            res.json(recordsResponse)
        }
    }
   
    
}