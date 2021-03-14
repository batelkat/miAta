
const httpStatus = require('http-status-codes');
const SuggestedQuestion = require('../models/questionsModels');

module.exports = {

    GetAllSuggestedQuestion(req, res, next) {
        console.log(res);
        SuggestedQuestion.find({}).then(result => {

            res.status(httpStatus.OK).json({
                message: 'All question',
                questions: result
            });
        })
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });
    },


    SetNewQuestion(req, res, next) {

        const newQuestion = new SuggestedQuestion({
            questionBody: req.body.questionBody,
            questionRelevantNation: req.body.questionRelevantNation,
            questionRelevantReligion: req.body.questionRelevantReligion
        });



        
        newQuestion.save();

        res.status(httpStatus.CREATED).json({
            message: "השאלה נוצרה בהצלחה",
            successStatus: true
        });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "מצטערים, השאלה לא נוצרה עקב תקלה בשרת המרוחק",
            successStatus: false
        });
    }

};