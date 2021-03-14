
const httpStatus = require('http-status-codes');
const Nation = require('../models/nationModels');
const Religion = require('../models/nationModels');
const Question = require('../models/nationModels');
const Knowledge = require('../models/nationModels');

module.exports = {

    GetAllNations(req, res, next) {
        Nation.find({}).then(result => {

            res.status(httpStatus.OK).json({
                message: 'All Nation',
                nations: result
            });
        })
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' });
            });
    },


    SetNewNation(req, res, next) {
        const newNation = new Nation({
            name: req.body.name,
        });
        newNation.save();

        res.status(httpStatus.CREATED).json({
            message: "הקבוצה נוצרה בהצלחה",
            successStatus: true
        });
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "מצטערים, הקבוצה לא נוצרה עקב תקלה בשרת המרוחק",
            successStatus: false
        });
    },

    SetReligion(req, res, next) {
        const newReligion = new Religion({
            name: req.body.name,
        });
        Nation.findByIdAndUpdate(req.params.id,
            {
                $push: {
                    religion: newReligion
                }
            }
        )
            .then(result => {
                res.status(httpStatus.CREATED).json({
                    message: "הקבוצה נוצרה בהצלחה",
                    successStatus: true
                });
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "מצטערים, הקבוצה לא נוצרה עקב תקלה בשרת המרוחק",
                    successStatus: false
                });
            })
    },

    RemoveReligion(req, res, next) {
        Nation.findByIdAndUpdate(req.body.nationId,
            {
                $pull: {
                    religion: { _id: req.body.religionId }
                }
            }
        )
            .then(result => {
                res.status(httpStatus.CREATED).json({
                    message: "הקבוצה נמחקה בהצלחה",
                    successStatus: true
                });
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "מצטערים, הקבוצה לא נמחקה עקב תקלה בשרת המרוחק",
                    successStatus: false
                });
            })
    },

    RemoveNation(req, res, next) {
        Nation.findByIdAndDelete(req.body.nationId)
            .then(result => {
                res.status(httpStatus.CREATED).json({
                    message: "הקבוצה נמחקה בהצלחה",
                    successStatus: true
                });
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "מצטערים, הקבוצה לא נמחקה עקב תקלה בשרת המרוחק",
                    successStatus: false
                });
            })
    },

    RemoveQuestion(req, res, next) {
        Nation.updateOne({ "religion.suggestedQuestions._id": req.body.questionId },
            {
                $pull: {
                    'religion.$.suggestedQuestions': { _id: req.body.questionId }
                }
            }
        )
            .then(result => {
                res.status(httpStatus.CREATED).json({
                    message: "השאלה נמחקה בהצלחה",
                    successStatus: true
                });
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "מצטערים, השאלה לא נמחקה עקב תקלה בשרת המרוחק",
                    successStatus: false
                });
            })
    },

    RemoveGoodToKnow(req, res, next) {
        Nation.updateOne({ "religion.knowledgeItems._id": req.body.itemId },
            {
                $pull: {
                    'religion.$.knowledgeItems': { _id: req.body.itemId }
                }
            }
        )
            .then(result => {
                res.status(httpStatus.CREATED).json({
                    message: "הערך נמחק בהצלחה",
                    successStatus: true
                });
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "מצטערים, הערך לא נמחק עקב תקלה בשרת המרוחק",
                    successStatus: false
                });
            })
    },

    SetQuestion(req, res, next) {
        Nation.updateOne({ "religion._id": req.params.id },
            {
                $push: {
                    "religion.$.suggestedQuestions": {
                        questionBody: req.body.questionBody
                    }
                }
            }
        ).then(result => {
            res.status(httpStatus.CREATED).json({
                message: "השאלה נוצרה בהצלחה",
                successStatus: true
            });
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: "מצטערים, האובייקט לא נוצר עקב תקלה בשרת המרוחק",
                successStatus: false
            });
        });
    },

    SetKnowledgeItem(req, res, next) {

        Nation.updateOne({ "religion._id": req.params.id },
            {
                $push: {
                    "religion.$.knowledgeItems": {
                        title: req.body.title,
                        description: req.body.description
                    }
                }
            }
        ).then(result => {
            res.status(httpStatus.CREATED).json({
                message: "הפריט נוצר בהצלחה",
                successStatus: true
            });
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: "מצטערים, האובייקט לא נוצר עקב תקלה בשרת המרוחק",
                successStatus: false
            });
        });
    }

};