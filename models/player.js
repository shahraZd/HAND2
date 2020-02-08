const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schemaPlayer = new mongoose.Schema(
  {
    cin: {
        type : String,
        unique : true,
        require : true
     },
    firstName: {
        type : String,
        require : true
     },
   lastName: {
        type : String,
       
        require : true
     },
     tel: {
        type : String,
        require : true
     },
     mail:String,
    poids: {
        type : Number,

        require : true
     },
     longueur: {
        type : Number,
        require : true
     },
     adresse: String,
    club_id: {
        type: Schema.Types.ObjectId,
        ref: 'Club'
    }
   }
   );
var Player = mongoose.model('Player', schemaPlayer);

module.exports = Player;