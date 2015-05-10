var JSONMapping;

(function(JSONMapping){

   /**
    * JSONMapping
    * A JSON object that defines the mapping of properties to another format
    */

   JSONMapping.inverse=function(mapping){

      var inversed={};

      for(var key in mapping)
      {
         inversed[mapping[key]]=key;
      }

      return inversed;
   };

   JSONMapping.to=function(mapping, object){

      var mapped={};

      for(var key in object)
      {
         mapped[mapping[key]]=object[key];
      }

      return mapped;
   };

   JSONMapping.from=function(mapping, object){

      var inversed=JSONMapping.inverse(mapping);

      return JSONMapping.to(inversed, object);
   };

})(JSONMapping || (JSONMapping = {}));

(typeof(module)!=="undefined" ? (module.exports=JSONMapping) : (window.JSONMapping=JSONMapping));
