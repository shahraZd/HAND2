const express = require('express');
const clubRouter = express.Router();
const clubModel = require('../models/club');


clubRouter.get('/', (req, res) => {
    clubModel.find({ name: { $regex: req.query.filter || '', $options: "i" } })
        .exec(function(err, club) {
            if (err) {
                console.log(err);

                res.send(err);
            } else {
                if (!club) {
                    res.status(404).send({ msg: "club not found" });
                } else {
                    console.log(club);
                    res.send(club);
                }
            }
        });
});
clubRouter.get('/:id', (req, res) => {
    clubModel.findOne({ name: req.params.id })
        .exec(function(err, club) {
            if (err) {
                console.log(err);

                res.send(err);
            } else {
                if (!club) {
                    res.status(404).send({ msg: "club not found" });
                } else {
                    console.log(club);
                    res.send(club);
                }
            }

        });

});
clubRouter.post('/', (req, res) => {
    var clb = new clubModel({
        name: req.body.name,
        adresse: req.body.adresse

    });
    clb.save(function(err) {
        if (err) {
            console.log(err);
            if (err.code == 11000) {
                res.status(211).send({ msg: 'club already exists' });
            } else {
                res.send(err);
            }
        } else {
           
            res.json({ success: true });
        }

    });



});
clubRouter.put('/:id', (req, res) => {
    clubModel.update({_id: req.params.id }, req.body,
        function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ msg: "Club updated succefully" });
            }
        });


});
clubRouter.delete('/:name', (req, res) => {
    clubModel.deleteOne({ name: req.params.name },
        function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ msg: "Club deleted succefully" });
            }
        });
});
module.exports = clubRouter;