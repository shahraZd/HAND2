const mongoose = require('mongoose');

var schemaClub = new mongoose.Schema(
  {
    name: {
        type : String,
        unique : true,
        require : true
     },
    adresse: 'string'
   }
   );
var Club = mongoose.model('Club', schemaClub);
module.exports=Club;