const mongoose = require('mongoose');

const Schema =mongoose.Schema;

var schemaMatchs = new mongoose.Schema(
  {
    date :{
      type : Date,
     require : true
    },
    startTime:{
      type : String,
      require : true
    },

    score1:{
      type:Number,

       require :true

          },


  score2:{
  type:Number,
   require :true

      },

  status:{
  type:String,
   require :true,
default:'pas encore'

      },
      
      endTime:{ 
      type : String,
      require : true
       },

      equipe1:{
        type: Schema.Types.ObjectId,
        ref: 'Club',
       require :true
      
      },

      equipe2:{
        type: Schema.Types.ObjectId,
        ref: 'Club',
        require :true
       
       },
     adresse:'string',
   },

      

   );
var Matchs= mongoose.model('Match', schemaMatchs);

module.exports =Matchs;