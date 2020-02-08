const express = require('express');
const playerRouter = express.Router();
const PlayerModel = require('../models/player');
const ClubModel = require('../models/club');

playerRouter.get('/', (req, res) => {
    PlayerModel.find({ firstName: { $regex: req.query.filter || '', $options: "i" } }, function (err, players) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(players);
        }
    }).populate('club_id', '-_id');
});
playerRouter.get('/:cin', (req, res) => {
    PlayerModel.findOne({ cin: req.params.cin })
        .exec(function(err, ply) {
            if (err) {
                console.log(err);

                res.send(err);
            } else {
                if (!ply) {
                    res.status(404).send({ msg: "Player not found" });
                } else {
                    console.log(ply);
                    res.send(ply);
                }
            }

        });

});
playerRouter.post('/', (req, res) => {

    ClubModel.findOne({ _id: req.body.club_id})
        .exec(function (err, club) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                if (!club) {
                    res.status(404).send({ msg: "club not found!" });
                }
                else {
                    var Ply = new PlayerModel({
                        cin: req.body.cin,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        tel: req.body.tel,
                        mail: req.body.mail,
                        poids: req.body.poids,
                        longueur: req.body.longueur,
                        adresse: req.body.adresse,
                        club_id: req.body.club_id
                    });
                    Ply.save(function (err) {
                        if (err) {
                            console.log(err);
                            if (err.code == 11000) {
                                res.status(211).send({ msg: 'Player already exists' });
                            }
                            else {
                                res.send(err);
                            }
                        }
                        else {
                            res.json({ success: true });
                        }
                    });
                }
            }
        });


});
playerRouter.put('/:cin', (req, res) => {
    ClubModel.findOne({ _id: req.body.club_id})
        .exec(function (err, club) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                if (!club) {
                    res.status(404).send({ msg: "club not found!" });
                }
            else {
                PlayerModel.update({ cin: req.params.cin }, req.body,
                  function(err) {
                  if (err) {
                   res.send(err);
                } 
                else {
                 res.json({ msg: "Player updated succefully" });
                }
            
            });
        }

        }
      
}).populate('club_id', '-_id');;
});
playerRouter.delete('/:cin', (req, res) => {
    PlayerModel.deleteOne({ cin: req.params.cin },
        function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ msg: "Player deleted succefully" });
            }
        });
});
module.exports = playerRouter;