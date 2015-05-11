var MochiComparators={
   "==" : "equal to",
   "===" : "exactly equal to",
   "!=" : "not equal to",
   "!==" : "exactly not equal to",
   ">" : "greater than",
   ">=" : "greater than or equal",
   "<" : "less than",
   "<=" : "less than or equal ",
   "in" : "in"
};

function mochi(title, a, comparator, b)
{
   /* jshint evil:true */
   if(arguments.length===1)
   {
      it(title);
   }
   else
   {
      if(typeof(a)==="function")
      {
         it(title + ": function return should " + MochiComparators[comparator] + " " + b, function(){ a=a(); eval("if(!(a " + comparator + " b)) throw new Error(a + ' is not ' + MochiComparators[comparator] + ' ' + b);"); });
      }
      else
      {
         it(title + ": " + a + " should be " + MochiComparators[comparator] + " " + b, function(){ eval("if(!(a " + comparator + " b)) throw new Error(a + ' is not ' + MochiComparators[comparator] + ' ' + b);"); });
      }
   }
}

mochi.assert=function(title, a, comparator, b){

   a=typeof(a)==="string" ? ("'" + a + "'") : a;
   b=typeof(b)==="string" ? ("'" + b + "'") : b;

   if(!eval(a + comparator + b))
   {
      throw new Error(a + ' is not ' + MochiComparators[comparator] + ' ' + b);
   }
};


require(["../json-mapping.js"], function(JSONMapping){

   describe("#inverseEntityMapping", function(){

      var mapping={
         "oldkey": "newkey"
      };

      var inversed=JSONMapping.inverseEntityMapping(mapping);

      mochi("original key doesn't exist", ("oldkey" in inversed), "===", false);
      mochi("new key exists", ("newkey" in inversed), "===", true);
   });

   describe("#inverseSchemaMapping", function(){

      var mapping={
         "entity":{
            "oldkey": "newkey"
         }
      };

      var inversed=JSONMapping.inverseSchemaMapping(mapping);

      mochi("original key doesn't exist", ("oldkey" in inversed.entity), "===", false);
      mochi("new key exists", ("newkey" in inversed.entity), "===", true);
   });

   describe("#toEntityMapping", function(){

      var unmapped={
         "oldkey": "value"
      };

      var mapping={
         "oldkey": "newkey"
      };

      var mapped=JSONMapping.toEntityMapping(mapping, unmapped);

      console.log(JSON.stringify(mapped));

      mochi("original key doesn't exist", ("oldkey" in mapped), "===", false);
      mochi("new key exists", ("newkey" in mapped), "===", true);
      mochi("value exists at new key", mapped.newkey, "===", "value");
   });

   // describe("#toSchemaMapping", function(){
   //
   //    var unmapped={
   //       "entity":{
   //          "oldkey": "value"
   //       }
   //    };
   //
   //    var mapping={
   //       "entity":[{
   //          "oldkey": "newkey"
   //       }]
   //    };
   //
   //    var mapped=JSONMapping.toSchemaMapping(mapping, unmapped);
   //
   //    console.log(JSON.stringify(mapped));
   //
   //    mochi("original key doesn't exist", ("oldkey" in mapped.entity), "===", false);
   //    mochi("new key exists", ("newkey" in mapped.entity), "===", true);
   //    mochi("value exists at new key", mapped.newkey, "===", "value");
   // });

   describe("#fromEntityMapping", function(){

      var mapped={
         "newkey": "value"
      };

      var mapping={
         "oldkey": "newkey"
      };

      var unmapped=JSONMapping.fromEntityMapping(mapping, mapped);

      console.log("unmapped: ", JSON.stringify(unmapped));

      mochi("'oldkey' exists", ("oldkey" in unmapped), "===", true);
      mochi("'newkey' does not exist", ("newkey" in unmapped), "===", false);
      mochi("value exists at old key", unmapped.oldkey, "===", "value");
   });

   // global || window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();
   mocha.run();
});
