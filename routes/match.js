const express = require('express');
const MatchRouter = express.Router();
const  MatchModel = require('../models/match');
const ClubModel = require('../models/club');


   function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            
            return formatedDate ;
}




MatchRouter.get('/', (req, res) => {
    MatchModel.find({adresse: { $regex: req.query.filter || '', $options: "i"}}, function(err, match){
        if (err) {
            res.send(err);
            console.log('hhhhh111');
        }
        else {
            res.json(match);
           console.log('hhhhh');
           
        }
    }).populate('equipe1', '-_id')
      .populate('equipe2', '-_id');
});

MatchRouter.get('/:id', (req, res) => {

    MatchModel.findOne({ _id: req.params.id })
        .exec(function(err, match) {
            if (err) {
                console.log(err);

                res.send(err);
            } else {
                if (!match) {
                    res.status(404).send({ msg: "match not found" });
                } else {
                    var d =new Date();
                    var hours =(d.getHours()+1) + ":" + d.getMinutes();
                    //var dateCurr=match.date.getFullYear()+'/'+(match.date.getMonth()+1)+'/'+match.date.getDate();
                    console.log(match.date.getFullYear());

                  //  var dt=d.getFullYear()+'/'+(d.getMonth())+'/'+d.getDate();
                      
                   

                       if (((match.date.getFullYear() < d.getFullYear())||(match.date.getDate() < d.getDate() && match.date.getMonth() === d.getMonth()&& match.date.getFullYear() === d.getFullYear())||(match.date.getMonth() < d.getMonth()) ))
                       {
                           match.status="terminée";
                         match.save();}
                     else
                     {
                        match.status="En cours";
                        match.save();
                     }

                       /* if(dateCurr === dt)
                        {
            
                           match.status="En cours";
                           match.save();
                           console.log(dateCurr);
                        } 
                        else if ( dateCurr < dt)
                        {
                            match.status="Terminer";
                           match.save();
                        }*/








                    console.log(match);
                   res.send(match);


                }
            }

        });

});


MatchRouter.post('/', (req, res) => {

    ClubModel.findOne({ _id: req.body.equipe1})
        .exec(function (err1, club1) {
            if (err1) {
                console.log(err);
                res.send(err1);

            }
           
            ClubModel.findOne({ _id: req.body.equipe2})
            .exec(function (err2, club2) {
                if (err2) {
                    console.log(err2);
                    res.send(err2);
                }

            
            else {
                if (!club1  ) {
                    res.status(404).send({ msg: "club not found!" });
                }
                else if(!club2  ) {
                        res.status(404).send({ msg: "club not found!" });
                    }
                
                else {
        
                    var Mat = new MatchModel({
                            
                        equipe1: req.body.equipe1,
                        equipe2: req.body.equipe2,
                        adresse: req.body.adresse,
                        date:stringToDate(req.body.date, "dd/mm/yyyy","/"),
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                       // status: req.body.status,
                    });
                  
                    Mat.save(function (err) {
                        if (err) {
                            console.log(err);
                            if (err.code == 11000) {
                                res.status(211).send({ msg: 'Matchs already exists' });
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
});


MatchRouter.delete('/:id', (req, res) => {
    MatchModel.deleteOne({ _id: req.params.id },
        function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ msg: "Match deleted succefully" });
            }
        });
});



module.exports =MatchRouter;