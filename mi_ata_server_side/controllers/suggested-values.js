
const httpStatus = require('http-status-codes');
const SuggestedValues = require('../models/valueModels');

module.exports = {

    GetAllSuggestedValues(req, res, next) {
        console.log(res);
        SuggestedValues.find({}).then(result => {

            res.status(httpStatus.OK).json({
                message: 'All values',
                values: result
            });
        })
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });
    },


    SetNewValue(req, res, next) {
        console.log("im in set value");
        const newValue = new SuggestedValues({
            title: req.body.title,
            description: req.body.description,
            nation: req.body.nation,
            religion: req.body.religion
        });
        newValue.save();

        res.status(httpStatus.CREATED).json({
            message: "הערך נוצרה בהצלחה",
            successStatus: true
        });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "מצטערים, הערך לא נוצר עקב תקלה בשרת המרוחק",
            successStatus: false
        });


    }

};