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


var JSONMapping=require("../json-mapping.js");

describe("#to", function(){

   var mapping={
      "oldkey": "newkey"
   };

   var unmapped={
      "oldkey": "value"
   };

   var mapped=JSONMapping.to(mapping, unmapped);

   mochi("original key doesn't exist", ("oldkey" in mapped), "===", false);
   mochi("new key exists", ("newkey" in mapped), "===", true);
   mochi("value exists at new key", mapped.newkey, "===", "value");
});

describe("#from", function(){

   var mapping={
      "oldkey": "newkey"
   };

   var mapped={
      "newkey": "value"
   };

   var unmapped=JSONMapping.from(mapping, mapped);

   mochi("'oldkey' exists", ("oldkey" in unmapped), "===", true);
   mochi("'newkey' does not exist", ("newkey" in unmapped), "===", false);
   mochi("value exists at old key", unmapped.oldkey, "===", "value");
});

// global || window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();

// mocha.run();
