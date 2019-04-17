const express= require('express');
var mysql = require('mysql');
var bodyParser= require('body-parser');
var MySQLEvents = require('mysql-events');
var proxy = require('express-http-proxy');

var isauthenticated=false;
var authenticate= function(req,res,next)
{
    // console.log(username);
    // console.log(password);
    console.log(req.cookies);
    console.log(req.body);

    if(req.cookies.username)
    {
    username=req.cookies.username;
    password=req.cookies.password;
    }
    else
    {
      username=req.body.username;
      password=req.body.password;
    }
    console.log(username);
    console.log(password);
    var usertable="SELECT * from userlist where username=? and password=?";
    con.query(usertable,[username,password],function(err,result,fields)
    {
      console.log(result.length);
      if(result.length===0)
      {
      res.render('pages/login');
      }
      else
      {
      isauthenticated=true;
      next();
      }  
    }) 
} 
var vouchertype;
var transactionno;
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "hotelatlas",
//   port:3308,
//   multipleStatements: true
// });

var con = mysql.createConnection({
  host: "localhost",
  user: "hotelatlass",
  password: "Hotel@atlas123",
  database: "hotelatlass",
  multipleStatements: true
});
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   port: 3308,
//   database:'hotelatlas',
//   multipleStatements: true
// });
// var newcon= {host: "localhost",
//   user: "root",
//   password: "",
//   port: 3308,
//   database:'hotelatlas'}
var path = require('path')
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!"); 
  });


// mysqleventwatcher= MySQLEvents(newcon);
// console.log(mysqleventwatcher);


const app = express();
const cookieParser= require('cookie-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// app.use(express.json());

app.get('/',authenticate,function(req,res)
{
return res.redirect('/billing');
})

app.post('/createitem',function(req,res)
{
  console.log(req.body);
  var stockitementry=[req.body.formobj.itemsname];
  var itemdetails= [req.body.formobj.itemsname,req.body.formobj.itemalias,req.body.formobj.units,req.body.formobj.itemgroupcreate];

  var stockitementryfunction= () =>
  {
    return new Promise((resolve,reject)=>
    {
      var insertintostockitemtable= `INSERT INTO itemliststock(itemname) values ?`;
      con.query(insertintostockitemtable,[[stockitementry]],function(err,results)
      {
        if(err)
        {
          reject(new Error(err));
        }
        else
        {
          resolve(results);
        }
      })
    })
  }


  stockitementryfunction().then(function(results)
  {
  var insertintoitemtable= "INSERT INTO `itemtable`(`itemname`, `alias`, `units`, `itemgroup`) VALUES ?";
  con.query(insertintoitemtable,[[itemdetails]],function(err,result,fields)
  {
    if(err) 
    {

      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
}).catch(function(err)
{
  console.log(err);
  res.status(500).send({'message':'Enter valid data'});


})
})


app.post('/salescreateitem',function(req,res)
{
  console.log(req.body);
  var stockitementry=[req.body.formobj.itemsname];
  var itemdetails= [req.body.formobj.itemsname,req.body.formobj.itemalias,req.body.formobj.units,req.body.formobj.itemgroupcreate,req.body.formobj.price];

  var stockitementryfunction= () =>
  {
    return new Promise((resolve,reject)=>
    {
      var insertintostockitemtable= `INSERT INTO salesitemliststock(itemname) values ?`;
      con.query(insertintostockitemtable,[[stockitementry]],function(err,results)
      {
        if(err)
        {
          reject(new Error(err));
        }
        else
        {
          resolve(results);
        }
      })
    })
  }


  stockitementryfunction().then(function(results)
  {
  var insertintoitemtable= "INSERT INTO `salesitemtable`(`itemname`, `alias`, `units`, `itemgroup`,`price`) VALUES ?";
  con.query(insertintoitemtable,[[itemdetails]],function(err,result,fields)
  {
    if(err) 
    {

      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
}).catch(function(err)
{
  console.log(err);
  res.status(500).send({'message':'Enter valid data'});


})
})




app.post('/searchstock',function(req,res)
{
console.log(req.body);
var returntable= (index) =>
{
  var stocktablelist= { 1:['itemgroupnametable','groupcategory'],2:['itemgroupnametable','itemgroupname'],3:['itemtable','itemname']}
  return stocktablelist[index];
}
var index=returntable(req.body.index);
// console.log("index is "+ index);
// // var searchby=req.body.searchby;
var senditem= req.body.senditem;

// var purchaseitem;
// var salesitem;
var returnitem= (indexes) =>{
return new Promise((resolve,reject)=>
{
if(Number(indexes)===0)
{
var getitem=`SELECT * FROM itemliststock inner join itemtable on itemliststock.itemname=itemtable.itemname inner join itemgroupnametable on itemtable.itemgroup=itemgroupnametable.itemgroupname `;


var gettotalpurchase=`SELECT sum(quantity) as totalpurchase from purchasetable where itemname in (SELECT itemliststock.itemname FROM itemliststock inner join itemtable on itemliststock.itemname=itemtable.itemname inner join itemgroupnametable on itemtable.itemgroup=itemgroupnametable.itemgroupname)`;
con.query(getitem,function(err,result,fields)
{
  if(err)
  {
    console.log(err);
    // res.status(500).send({'err':'No any item in the list'});
    reject(new Error("No any item found"));
  }
  else
  {
    console.log(result);

    // res.status(200).send({'result':result});
    resolve(result);

  }

})
}
else
{
var getitem=`SELECT * FROM itemliststock inner join itemtable on itemliststock.itemname=itemtable.itemname inner join itemgroupnametable on itemtable.itemgroup=itemgroupnametable.itemgroupname where ${index[0]}.${index[1]}='${senditem}'`;

var gettotalpurchase=`SELECT sum(quantity) as totalpurchase from purchasetable where itemname in (SELECT itemliststock.itemname FROM itemliststock inner join itemtable on itemliststock.itemname=itemtable.itemname inner join itemgroupnametable on itemtable.itemgroup=itemgroupnametable.itemgroupname where ${index[0]}.${index[1]}='${senditem}')`


con.query(getitem,function(err,result,fields)
{
  
  if(err)
  {
    console.log(err);
    // res.status(500).send({'err':'No any item in the list'});
    reject(new Error("No any item found"));
  }
  else
  {
  
  
    console.log(result);
    resolve(result);

   

    }
  
    // res.status(200).send({'result':result});
    

  
})
}
})
}


  var gettotalpurchase=`SELECT sum(quantity) as totalpurchase from purchasetable where itemname in (SELECT itemliststock.itemname FROM itemliststock inner join itemtable on itemliststock.itemname=itemtable.itemname inner join itemgroupnametable on itemtable.itemgroup=itemgroupnametable.itemgroupname where ${index[0]}.${index[1]}='${senditem}')`;

  var gettotalsales=`SELECT sum(quantity) as totalsales from salestable where itemname in (SELECT itemliststock.itemname FROM itemliststock inner join itemtable on itemliststock.itemname=itemtable.itemname inner join itemgroupnametable on itemtable.itemgroup=itemgroupnametable.itemgroupname where ${index[0]}.${index[1]}='${senditem}')`;
        
returnitem(req.body.index).then(function(result)
{

// console.log(result);

con.query(gettotalpurchase,function(err,results,fields)
{
  if(err)
  {
    console.log(err);
    throw err;
  }
  else
  {
  // console.log("Results is"+results[0].totalpurchase);
    // console.log(err);
    for(i=0;i<result.length;i++)
    {
      if(results[i].totalpurchase===null)
      {
        result[i]['purchase']=0;
      }
      else
      {
    result[i]['purchase']= results[i].totalpurchase;
    }
  }
  // newresult[i].push({'purchase':results[0].totalpurchase})
    // result[i]={'purchase':results[0].totalpurchase};
  console.log(result);
  
  // res.status(200).json({'result':result});

  }
  })
  return result;
}).then(function(result)
{

// console.log(result);

con.query(gettotalsales,function(err,results,fields)
{
  if(err)
  {
    console.log(err);
    throw err;
  }
  else
  {
  // console.log("Results is"+results[0].totalpurchase);
    // console.log(err);
    for(i=0;i<result.length;i++)
    {
      if(results[i].totalsales===null)
      {
        result[i]['sales']=0;
      }
      else
      {
    result[i]['sales']= results[i].totalsales;
      }
    }
  // newresult[i].push({'purchase':results[0].totalpurchase})
    // result[i]={'purchase':results[0].totalpurchase};
  console.log(result);
  
  res.status(200).json({'result':result});
  // return result;

  }
  })

}).then(function(result)
{

  console.log("REz")


}).catch(function(err)
{
  console.log(err);
res.status(500).send(err);
})

})




app.get('/stock',authenticate,function(req,res)
{
  var selectstock=`SELECT * from itemtable; SELECT * from itemgroupnametable;  SELECT * from groupcategory;
SELECT * from unittable`;
con.query(selectstock,function(err,result)
{
  res.render('pages/stock',{itemtable:result[0],itemgrouplist:result[1],itemcategorylist:result[2],unittable:result[3]});

})
})

app.post('/searchitem',function(req,res)
{

  var itemname= req.body.itemname;
  var quantity= req.body.quantity;
  console.log(req.body.salesdate);
  console.log(req.body.rthname);
  console.log(req.body.itemname);

  console.log(req.body.quantity);
console.log(req.body.billno);
  var rthname= req.body.rthname;
  // console.log(salesdate);

  var rthtable={'room':'roomnamestatus','hall':'hallnamestatus','table':'tablenamestatus'}
  var selectitem=`SELECT price from salesitemtable where itemname = ?`;
  var selectfromtemptable="SELECT * from tempbilltable where itemname=? and name=?";
  var selectfromtemptable1="SELECT * from tempbilltable where name=?";
  var insertintotemptablequery=`INSERT INTO tempbilltable(name,itemname,quantity,price,amount,salesdate,billno) values (?,?,?,?,?,?,?)`;
  var updateintotemptablequery=`UPDATE tempbilltable set quantity= quantity+?,amount=amount+? where name=? and itemname=?`;

  var updaterthstatus=`UPDATE ${rthtable[req.body.rthtype]} set status="Open" where name=?`;

  var finalbilldata= () =>
  {
    return new Promise((resolve,reject)=>
    {
      con.query(selectfromtemptable1,[[req.body.rthname]],function(err,results)
  {
    if(err)
    {
      console.log(err);
      reject(new Error(err));
    }
  
      console.log(results);
      resolve(results);
  
    })
  })

}
 
  var insertintotemptable=(price) =>
  {
    console.log("Price is");
    console.log(price[0].price);
    return new Promise((resolve,reject)=>
    {
  con.query(selectfromtemptable,[[req.body.itemname],[req.body.rthname]],function(err,results)
  {
    if(err)
    {
      console.log(err);
      reject(new Error(err));
    }
    else if(results.length===0)
    {

        con.query(insertintotemptablequery,[[req.body.rthname],[req.body.itemname],[req.body.quantity],[Number(price[0].price)],[[req.body.quantity] * [Number(price[0].price)]],[req.body.salesdate],[req.body.billno]],function(err,results)
        {
          if(err) console.log(err);
          resolve("ok");
        });
    }
    else
    {  
      con.query(updateintotemptablequery,[req.body.quantity,Number(req.body.quantity)*Number(price[0].price),req.body.rthname,req.body.itemname],function(err,results)
      {
        if(err) 
        {
          console.log(err);
        }
        else
        {
        resolve(results);
        }

      });
    }
  });
})
  }
  var getprice= () =>
  {
    return new Promise((resolve,reject)=>
    {
  con.query(selectitem,[[req.body.itemname]],function(err,results)
  {
    if(results.length === 0)
    {
      reject(new Error(err));
    }
    else
    {  
      resolve(results);
    }
  });
})
  }


  getprice().then((price)=>
  {
    console.log("Price is");
    console.log(price[0].price);
    return new Promise((resolve,reject)=>
    {
  con.query(selectfromtemptable,[[req.body.itemname],[req.body.rthname]],function(err,results)
  {
    if(err)
    {
      console.log(err);
      reject(new Error(err));
    }
    else if(results.length===0)
    {

        con.query(insertintotemptablequery,[[req.body.rthname],[req.body.itemname],[req.body.quantity],[Number(price[0].price)],[[req.body.quantity] * [Number(price[0].price)]],[req.body.salesdate],[req.body.billno]],function(err,results)
        {
          if(err) console.log(err);
          resolve("ok");
        });
    }
    else
    {  
      con.query(updateintotemptablequery,[req.body.quantity,Number(req.body.quantity)*Number(price[0].price),req.body.rthname,req.body.itemname],function(err,results)
      {
        if(err) 
        {
          console.log(err);
        }
        else
        {
        resolve(results);
        }

      });
    }
  });
})
   }).then((p)=>
   {
    return new Promise((resolve,reject)=>
    {
    con.query(updaterthstatus,[[req.body.rthname]],function(err,results1)
    {
      if(err)
      {
        console.log(err);
        reject(err);
      }
      else
      {
        console.log(results1);
        resolve(results1);
      }
    
      })
    })

   }).then((p)=>
   {
    return new Promise((resolve,reject)=>
    {
    con.query(selectfromtemptable1,[[req.body.rthname]],function(err,results1)
    {
      if(err)
      {
        console.log(err);
        reject(err);
      }
      else
      {
        console.log(results1);
        resolve(results1);
      }
    
      })
    })

   }).then((results1)=>
   {
    console.log(results1);
     res.status(200).send({results:results1});
   }).catch((err)=>
   {
     console.log(err);
     res.status(500).send({'err':'Error occured'})
   });
  
})

app.get('/sellingitem',authenticate,function(req,res)
{
  var selectstock=`SELECT * from salesitemtable; SELECT * from salesitemgroupnametable;SELECT * from salesgroupcategory;SELECT * from salesunittable`;
con.query(selectstock,function(err,result)
{
  if(err)
  {
    console.log(err);
  }
  res.render('pages/sellingstock',{itemtable:result[0],itemgrouplist:result[1],itemcategorylist:result[2],unittable:result[3]});
})
})
app.post('/creategroup',function(req,res)
{
  console.log(req.body);
  var groupdetails= [req.body.formobj.groupname,req.body.formobj.groupcategory];
  var insertintogrouptable= "INSERT INTO `itemgroupnametable`(`itemgroupname`, `groupcategory`) VALUES ?";
  con.query(insertintogrouptable,[[groupdetails]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})

app.post('/salescreategroup',function(req,res)
{
  console.log(req.body);
  var groupdetails= [req.body.formobj.groupname,req.body.formobj.groupcategory];
  var insertintogrouptable= "INSERT INTO `salesitemgroupnametable`(`itemgroupname`, `groupcategory`) VALUES ?";
  con.query(insertintogrouptable,[[groupdetails]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})


app.post('/searchitembyrth',function(req,res)
{
var selectfromtemptable1="SELECT * from tempbilltable where name=?";
con.query(selectfromtemptable1,[[req.body.rthname]],function(err,results)
{
  if(err)
  {
    console.log(err);
    res.status(500).send({'err':'No any item in the list'});
  }
  else{
    res.status(200).send({results:results});

  }
})
})

app.post('/createcategory',function(req,res)
{
  console.log(req.body);
  var categorydetails= [req.body.formobj.categoryname];
  console.log(categorydetails);
  var insertintocategorytable= "INSERT INTO `groupcategory`(`categoryname`) VALUES ?";
  con.query(insertintocategorytable,[[[categorydetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})

app.post('/salescreatecategory',function(req,res)
{
  console.log(req.body);
  var categorydetails= [req.body.formobj.categoryname];
  console.log(categorydetails);
  var insertintocategorytable= "INSERT INTO `salesgroupcategory`(`categoryname`) VALUES ?";
  con.query(insertintocategorytable,[[[categorydetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})

app.post('/createunit',function(req,res)
{
  console.log(req.body);
  var unitdetails= [req.body.formobj.unitname];
  console.log(unitdetails);
  var insertintounittable= "INSERT INTO `unittable`(`name`) VALUES ?";
  con.query(insertintounittable,[[[unitdetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})

app.post('/salescreateunit',function(req,res)
{
  console.log(req.body);
  var unitdetails= [req.body.formobj.unitname];
  console.log(unitdetails);
  var insertintounittable= "INSERT INTO `salesunittable`(`name`) VALUES ?";
  con.query(insertintounittable,[[[unitdetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})

app.post('/createtable',function(req,res)
{
  console.log(req.body);
  var tabledetails= [req.body.formobj.tablename];
  console.log(tabledetails);
  var insertintotabletable= "INSERT INTO `tablenamestatus`(`name`) VALUES ?";
  con.query(insertintotabletable,[[[tabledetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})

app.post('/createroom',function(req,res)
{
  console.log(req.body);
  var roomdetails= [req.body.formobj.roomname];
  console.log(roomdetails);
  var insertintoroomroom= "INSERT INTO `roomnamestatus`(`name`) VALUES ?";
  con.query(insertintoroomroom,[[[roomdetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})


app.get('/getroom',authenticate,function(req,res)
{
var getroomdata= "SELECT * from `roomnamestatus`";
con.query(getroomdata,function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else{
      res.status(200).send({'result':result});

    }
  })
})
app.get('/gettable',authenticate,function(req,res)
{
var getroomdata= "SELECT * from `tablenamestatus`";
con.query(getroomdata,function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else{
      res.status(200).send({'result':result});

    }
  })
})
app.get('/gethall',authenticate,function(req,res)
{
var getroomdata= "SELECT * from `hallnamestatus`";
con.query(getroomdata,function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else{
      res.status(200).send({'result':result});

    }
  })
})

app.post('/createhall',function(req,res)
{
  console.log(req.body);
  var halldetails= [req.body.formobj.hallname];
  console.log(halldetails);
  var insertintohallhall= "INSERT INTO `hallnamestatus`(`name`) VALUES ?";
  con.query(insertintohallhall,[[[halldetails]]],function(err,result,fields)
  {
    if(err) 
    {
      console.log(err);
      res.status(500).send({'message':'Enter valid data'});
    }
    else
    {
      console.log("Submitted Successfully");
      res.status(200).send({'message':'Submitted Successfully'});
    }

  })
})


app.get('/billing',authenticate, function(req, res) {
var selectitem=`SELECT * from salesitemtable`;
con.query(selectitem,function(err,result)
{
  console.log(result);
  res.render('pages/billing',{itemtable:result});
})
});

// about page
 


app.get('/voucher',authenticate,function(req, res) {
  var accountquery = "SELECT * from groups; SELECT * from paymenttable;SELECT * from accountinformation;SELECT * from itemtable; SELECT * from itemgroupnametable;  SELECT * from groupcategory;SELECT * from paymenttable where vouchertype='Payment' order by transactionno DESC LIMIT 1;SELECT * from paymenttable where vouchertype='Receipt' order by transactionno DESC LIMIT 1;SELECT * from paymenttable where vouchertype='Contra' order by transactionno DESC LIMIT 1;SELECT * from paymenttable where vouchertype='Journal' order by transactionno DESC LIMIT 1; SELECT * from purchasedetails order by purchaseno DESC LIMIT 1;SELECT * from unittable;SELECT * from salesdetails order by salesno DESC LIMIT 1;";
    con.query(accountquery,function(err,results,fields)
    {
      console.log(err);
      // console.log(results[0]);
      // console.log(results[1]);

    // console.log(result.length);
    // if (err) throw err;
    // console.log(result[0].accountname);
    // console.log("Number of records inserted: " + result.affectedRows);
    // if(results[1].length===0)
    // {
    //   transactionno= 0;
    // }
    // else
    // {
    //   for(var i=0; i<results[1].length;i++)
    //   {
    //   transactionno= parseInt(results[1][i]['transactionno']);
    // }
    // }


    // console.log(transactionno+results[6]);
     res.render('pages/payment',{error:'',results:results[0],accountinformations:results[2],'itemtable':results[3],'itemgrouplist':results[4],'itemcategorylist':results[5],paymentno:results[6],'receiptno':results[7],'contrano':results[8],'journalno':results[9],'purchaseno':results[10],'unittable':results[11],'salesno':results[12]});
    }
    );
    // res.render('pages/payment',);
});

app.get('/reserve',authenticate,function(req, res) {
    res.render('pages/reserve');
});
app.post('/accountsubmit',(req,res)=>
{
  // console.log(req.body.accountdataarray);
  console.log(req.body.formobj);

  var accountdata=[req.body.formobj];

  var length=accountdata[0].length;
  if(accountdata[0][length-2].length===0)
  {
accountdata[0][length-2]='1915-03-31';
accountdata[0][length-1]=0.00;
  }

  // paymentdata=paymentdata[0];
  // console.log(paymentdata);
  if(Number(accountdata[0][3]) >0 && Number(accountdata[0][3])<4)
  {
  var accountquery = "INSERT INTO accountinformation(accountname, alias, printname, accountgroup, address, country, telno, fax, mobileno, email, contactperson, panno,accountno) VALUES ? ";
    con.query(accountquery,[accountdata],function(err,result)
    {
    // if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
      res.json({'result':'Submitted'});
    });

}
else
{
    console.log("INserted here");

  console.log("Hello");
   var accountquery = "INSERT INTO accountinformation(accountname, alias, printname, accountgroup, address, country, telno, fax, mobileno, email, contactperson,panno) VALUES ? ";
    con.query(accountquery,[accountdata],function(err,result)
    {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
      res.json({'result':'Submitted'});
    });
}
})


// app.get('/billings',(req,res)=>

// {
// res.sendFile(__dirname + '/public/billing.html');
// });
// app.get('/reserve',(req,res)=>

// {
// res.sendFile(__dirname + '/public/reserve1.html');
// });
app.post('/accountreturn',(req,res)=>
{
  console.log(req.body.a);
  var accountquery = "SELECT accountname from accountinformation where accountname like ? ";
    con.query(accountquery,'%' + req.body.a + '%',function(err,result,fields)
    {
    // console.log(result.length);
    // if (err) throw err;
    // console.log(result[0].accountname);
    // console.log("Number of records inserted: " + result.affectedRows);
    res.json({result});
    });
})

app.get('/daybookreturn',authenticate,(req,res)=>
{
  console.log(req.body.a);
  // var accountquery = "SELECT * from paymenttable where paymentdate between ? and ? ";
  var accountquery = "SELECT dctype,account,dcamount,DATE_FORMAT(paymentdate,'%Y-%m-%d') as paymentdate,transactionno,narration from paymenttable";
  var accountquery1 = "SELECT account,SUM(dcamount) as total,dctype from paymenttable group by account,dctype";
  var totalcredit=0,totaldebit=0;

  


  con.query(accountquery1,function(err,results,fields)
    {
    // console.log(results.length);
    // console.log(results);
    for(var key in results)
    {
      // console.log("Key is "+key);
      if(results[key]['dctype']==='c')
    {
      totalcredit=totalcredit+results[key]['total'];
    }
    else
    {
      totaldebit=totaldebit+results[key]['total'];
    }
    }
  });

    // con.query(accountquery,[req.body.date1],[req.body.date2],function(err,result,fields)
  con.query(accountquery,function(err,result,fields)
    {
    var i=0;
    // var transactionno=[];
    var results={};
    const grouped = result.reduce((groups, cur) => {
      console.log(groups);
      console.log(cur);
    var key = cur.transactionno;
    // console.log(key);
    const key1=cur.paymentdate;
   // groups[key]={'1':(groups[key] || 0) + 1};
    groups[key] = (groups[key] || 0) + 1;



    return groups;
}, {});
    // console.log(grouped);
    // console.log(results);

// const totaltransaction = resulr.reduce((groups, cur) => {
//   console.log(groups);
//       console.log(cur);
// if(groups[cur.titles]==undefined)
// {
//   groups[cur.transactionno]=0;
// }
// const key = cur.transactionno;
    
// groups[key] = groups[key]+ 1;
// return groups;
// }, {});
    
const totaltransaction= Object.keys(grouped).map(key => ({transactionno: key, total: grouped[key]}));
console.log(totaltransaction);
    // for(i=1;i<result.length;i++)
    // {
    
    // }
    // var resulttable="<table><tr><th>S.N</th><th>Account Name</th><th>Debit</th><th>Credit</th></tr>";
    // for(i=1;i<result.length;i++)
    // {
    //  resulttable+=`<tr><td>${i}</td><td>result[i].account</td>`
    // }
    // // console.log(result.length);
    // // if (err) throw err;
    // // console.log(result[0].accountname);
    // // console.log("Number of records inserted: " + result.affectedRows);
    // console.log(result);
    res.render('pages/daybook',{results:result,totaltransaction:totaltransaction,totaldebit:totaldebit,totalcredit:totalcredit});
    });
});
app.get('/trialbalance',authenticate,(req,res)=>
{
  var accountquery = "SELECT account,SUM(dcamount) as total,dctype from paymenttable group by account,dctype";
    con.query(accountquery,function(err,results,fields)
    {
    // console.log(results.length);
    // console.log(results);
    var totalcredit=0,totaldebit=0;
    for(var key in results)
    {
      // console.log("Key is "+key);
      if(results[key]['dctype']==='c')
    {
      totalcredit=totalcredit+results[key]['total'];
    }
    else
    {
      totaldebit=totaldebit+results[key]['total'];
    }
    }
    // console.log("Total amount"+totaldebit);
    // console.log("Total amount"+totalcredit);

    // if (err) throw err;
    // console.log(result[0].accountname);
    // console.log("Number of records inserted: " + result.affectedRows);
    res.render('pages/trialbalance',{results:results,totaldebit:totaldebit,totalcredit:totalcredit});
    });
});
app.post('/paymentsubmit',(req,res)=>
{
	// console.log(req.body.op);
	var paymenttabledata=[req.body.o];
  var paymentdetailsdata=[req.body.paymentdetails];
  console.log(paymenttabledata);
  console.log("Payment "+paymenttabledata[0]['dctype'].length);

  console.log(paymentdetailsdata);
	// paymentdata=paymentdata[0];
	// console.log(paymentdata);
  // var transactionno= paymentdata[0][5];


	var inser = "INSERT INTO paymenttable(dctype,account,dcamount,vouchertype,transactionno,paymentdate) VALUES ? ";
  var inser2= "INSERT INTO `paymentdetails`(`vouchertype`, `transactionno`, `debitamount`, `creditamount`, `date`,`narration` ) VALUES ?";


var insertpaymentdetails= () =>
{
  return new Promise((resolve,reject)=>
  {
    con.query(inser2,[paymentdetailsdata],function(err,result)
    {
      if(result=== undefined)
      {
        console.log(err);
        reject( new Error("Transaction no already in the list "));

      }
      else
      {
        resolve(result);
      }
    })

  })

  
}

insertpaymentdetails().then(function(results)
{
  console.log("INserted Successfully");
  for(i=0;i<paymenttabledata[0]['dctype'].length;i++)
{
    con.query(inser,[[[paymenttabledata[0]['dctype'][i],paymenttabledata[0]['accounttype'][i],paymenttabledata[0]['dcamount'][i],paymenttabledata[0]['transactiontitle'][i],paymenttabledata[0]['transactionno'][i],paymenttabledata[0]['paymentdate'][i]]]],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) 
      {
        console.log(err);
      }
      else
      {
    // console.log("Number of records inserted: " + result.affectedRows);
console.log(result);
    
    }
    });
  }
  res.status(200).send("Transaction completed Successfully");
}).catch((err)=>
{
  console.log(err);
  res.status(500).send("Error in the transaction");

})



})
app.post('/purchasesubmit',(req,res)=>
{
  // console.log(req.body.op);
  var purchasetabledata=[req.body.o];
  var purchasedetailsdata=[req.body.purchasedetails];
  console.log(purchasetabledata);
  console.log("Payment "+purchasetabledata[0]['itemname'].length);

  console.log(purchasedetailsdata);
  // paymentdata=paymentdata[0];
  // console.log(paymentdata);
  // var transactionno= paymentdata[0][5];


  var inser = "INSERT INTO `purchasetable`(`itemname`, `quantity`, `rate`, `units`, `amount`, `purchaseno`, `purchasedate`) VALUES ? ";
  var inser2= "INSERT INTO `purchasedetails`(`purchaseno`, `accountname`, `totalamount`, `purchasedate`) VALUES ?";

var inser3="UPDATE itemliststock set `remaining`=`remaining`+? where itemname=? ";

var insertpurchasedetails= () =>
{
  return new Promise((resolve,reject)=>
  {
    con.query(inser2,[purchasedetailsdata],function(err,result)
    {
      if(result=== undefined)
      {
        reject( new Error("Transaction no already in the list "));

      }
      else
      {
        resolve(result);
      }
    })

  })

  
}

insertpurchasedetails().then(function(results)
{
return new Promise((resolve,reject)=>
{
  console.log("INserted Successfully");
  for(i=0;i<purchasetabledata[0]['itemname'].length;i++)
{
    con.query(inser,[[[purchasetabledata[0]['itemname'][i],purchasetabledata[0]['quantity'][i],purchasetabledata[0]['rate'][i],purchasetabledata[0]['units'][i],purchasetabledata[0]['amount'][i],purchasetabledata[0]['transactionno'][i],purchasetabledata[0]['purchasedate'][i]]]],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) 
      {
        console.log(err);
        reject(new Error(err));
      }
      else
      {
    // console.log("Number of records inserted: " + result.affectedRows);
console.log(result);
resolve(result);
    
    }
    });
  }
  // res.status(200).send("Transaction completed Successfully");
})
}).then(function(results)
{
  return new Promise((resolve,reject)=>
{
  console.log("INserted Successfully");
  for(i=0;i<purchasetabledata[0]['itemname'].length;i++)
{
    con.query(inser3,[[purchasetabledata[0]['quantity'][i]],[purchasetabledata[0]['itemname'][i]]],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) 
      {
        
        console.log(err);
        reject(new Error(err));      }
      else
      {
    // console.log("Number of records inserted: " + result.affectedRows);
console.log(result);
 res.status(200).send("Transaction completed Successfully");
resolve(result);

    
    }
    });
  }
 
})
}).catch((err)=>
{
  console.log(err);
  res.status(500).send("Error in the transaction");

})
})



app.post('/salessubmit',(req,res)=>
{
  // console.log(req.body.op);
  var salestabledata=[req.body.o];
  var salesdetailsdata=[req.body.salesdetails];
  console.log(salestabledata);
  console.log("Payment "+salestabledata[0]['itemname'].length);

  console.log(salesdetailsdata);
  // paymentdata=paymentdata[0];
  // console.log(paymentdata);
  // var transactionno= paymentdata[0][5];


  var inser = "INSERT INTO `salestable`(`itemname`, `quantity`, `rate`, `units`, `amount`, `salesno`, `salesdate`) VALUES ? ";
  var inser2= "INSERT INTO `salesdetails`(`salesno`, `accountname`, `totalamount`, `salesdate`) VALUES ?";
var inser3="UPDATE itemliststock set `remaining`=`remaining`-? where itemname=? ";


var insertsalesdetails= () =>
{
  return new Promise((resolve,reject)=>
  {
    con.query(inser2,[salesdetailsdata],function(err,result)
    {
      if(result=== undefined)
      {
        reject( new Error("Transaction no already in the list "));

      }
      else
      {
        resolve(result);
      }
    })

  })

  
}

insertsalesdetails().then(function(results)
{
  console.log("INserted Successfully");
  for(i=0;i<salestabledata[0]['itemname'].length;i++)
{
    con.query(inser,[[[salestabledata[0]['itemname'][i],salestabledata[0]['quantity'][i],salestabledata[0]['rate'][i],salestabledata[0]['units'][i],salestabledata[0]['amount'][i],salestabledata[0]['transactionno'][i],salestabledata[0]['salesdate'][i]]]],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) 
      {
        console.log(err);
      }
      else
      {
    // console.log("Number of records inserted: " + result.affectedRows);
console.log(result);
    return result;

    }
    });
  }
}).then(function(results)
{
  return new Promise( (resolve,reject)=>
  {
console.log("INserted Successfully");
  for(i=0;i<salestabledata[0]['itemname'].length;i++)
{
    con.query(inser3,[[salestabledata[0]['quantity'][i]],[salestabledata[0]['itemname'][i]]],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) 
      {
        
        console.log(err);
        reject(new Error(err));      }
      else
      {
    // console.log("Number of records inserted: " + result.affectedRows);
console.log(result);
 res.status(200).send("Transaction completed Successfully");
resolve(result);

    
    }
    });
  }
})
}).
catch((err)=>
{
  console.log(err);
  res.status(500).send("Error in the transaction");

})



})
app.post('/submitcontra',(req,res)=>
{
  // console.log(req.body.op);
  // var paymentdata=req.body.op;
  // paymentdata=paymentdata[0];
  // console.log(paymentdata);
  var contrafinaldata= req.body.contrafinaldata;
  console.log(contrafinaldata);
  var inser = "INSERT INTO contratable(bankname,accountno,accountgroup) VALUES ? ";
    con.query(inser,[[contrafinaldata]],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) throw err;
    // console.log("Number of records inserted: " + result.affectedRows);
    res.json({'result':'Submitted'});
    });

  
})

app.post('/billsubmit',(req,res)=>
{
  // console.log(req.body.op);
  // var paymentdata=req.body.op;
  // paymentdata=paymentdata[0];
  // console.log(paymentdata);
  var billformObj= req.body.billformObj;
  console.log(billformObj);

  var billdetailstable= req.body.billdetailstable;
  console.log(billdetailstable);
  // console.log(contrafinaldata);
  var insert1 = "INSERT INTO `billtable`(`itemname`, `itemquantity`, `units`, `price`, `amount`, `billno`) VALUES ? ";
  var insert2 = "INSERT INTO `billdetailtable`(`billno`, `customername`, `number`, `type`, `total`, `servicecharge`, `taxableamount`, `discountamount`, `tax`, `grandtotal`) VALUES ? ";

    con.query(insert1,[billformObj],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) throw err;
    console.log("Submitted");
    // console.log("Number of records inserted: " + result.affectedRows);
    // res.json({'result':'Submitted'});
    });

    con.query(insert2,[billdetailstable],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) throw err;
    console.log("Submitted");
    // console.log("Number of records inserted: " + result.affectedRows);
    // res.json({'result':'Submitted'});
    });

  res.json({'result':'Submitted'});
})


// app.get('/',(req,res) =>{
// 	   res.sendFile(__dirname + '/public/payment.html');
//     // res.send()
//  // res.send('Hello world');
//  // console.log("HEll");
// });


app.post('/ledger',function(req,res)
{

var getledgerdata1=`SELECT DATE_FORMAT(paymentdate,'%Y-%m-%d') as date,vouchertype,dctype,dcamount,account as accountname, transactionno from paymenttable where transactionno in (SELECT DISTINCT paymenttable.transactionno from paymentdetails inner join paymenttable on paymentdetails.transactionno=paymenttable.transactionno where paymenttable.account=?) and vouchertype in (SELECT DISTINCT paymenttable.vouchertype from paymentdetails inner join paymenttable on paymentdetails.transactionno=paymenttable.transactionno where paymenttable.account=?)   and account!=?`;

var getledgerdata2=`SELECT DATE_FORMAT(purchasedate,'%Y-%m-%d') as date,vouchertype,dctype,totalamount as dcamount,accountname, purchaseno as transactionno from purchasedetails where accountname=?`;

var getledgerdata3=`SELECT DATE_FORMAT(salesdate,'%Y-%m-%d') as date,vouchertype,dctype,totalamount as dcamount,accountname, salesno as transactionno from salesdetails where accountname=?`;



var functiongetledgerdata1= () =>
{
  return new Promise((resolve,reject)=>
  {
    con.query(getledgerdata1,[req.body.accountname,req.body.accountname,req.body.accountname],function(err,results)
    {
      if(err)
      {
        reject(new Error(err));
      }
      else
      {
        resolve(results);
      }
    })
  })
}

var functiongetledgerdata2= () =>
{
  return new Promise((resolve,reject)=>
  {
    con.query(getledgerdata2,[req.body.accountname],function(err,results)
    {
      if(err)
      {
        reject(new Error(err));
      }
      else
      {
        resolve(results);
      }
    })
  })
}

var functiongetledgerdata3= () =>
{
  return new Promise((resolve,reject)=>
  {
    con.query(getledgerdata3,[req.body.accountname],function(err,results)
    {
      if(err)
      {
        reject(new Error(err));
      }
      else
      {
        resolve(results);
      }
    })
  })
}

Promise.all([functiongetledgerdata1(),functiongetledgerdata2(),functiongetledgerdata3()]).then(function(result)
{
  console.log(result);
if(req.body.accountname !== 'Payment Account')
{
  console.log("True");
  for(i=0;i<result[1].length;i++)
  {
    result[1][i].accountname="Payment Accounts"
  }
}
if(req.body.accountname !== 'Sales Account')
{
  console.log("True");

  for(i=0;i<result[2].length;i++)
  {
    result[2][i].accountname="Sales Accounts"
  }
}
return result;

}).then(function(result)
{
var testresult=result;

console.log(testresult);
    res.status(200).send({'ledgerdata':testresult});


}).catch(function(err)
{
  console.log(err);
  res.status(500).send("ERROr occured");
})


app.post('/voucheredit',function(req,res)
{
  console.log("vouchertype is "+ vouchertype);
  console.log("Transaactiontype is "+ transactionno);

 
if(vouchertype==='Payment' || vouchertype==='Contra' || vouchertype==='Receipt' || vouchertype==="Journal")
{
  console.log("GEre");
  var geteditvoucherdata= "SELECT * from paymentdetails inner join paymenttable on paymentdetails.transactionno=paymenttable.transactionno where paymenttable.transactionno=?";
  con.query(geteditvoucherdata,[transactionno],function(err,result,fields)
  {
    if(err)
    {
      console.log(err);
    }
  console.log(result);
      res.render('pages/newpayment',{'prjcdata':result});
  })
}
else if(vouchertype=== 'Sales')
{
  var getsalesdata= "SELECT * from salesdetails inner join salestable on salesdetails.salesno=salestable.salesno where salestable.salesno=?";
  con.query(getsalesdata,[transactionno],function(err,result,fields)
  {
    if(err)
    {
      console.log(err);
    }
  console.log(result);
      res.render('pages/newpayment',{'prjcdata':result});
  })
}
})

app.post('/editvoucher',function(req,res)
{
  vouchertype=req.body.vouchertype;
  transactionno=req.body.transactionno;
   // res.status(500).send('ok');
   console.log("vouchertype is "+ vouchertype);
  console.log("Transaactiontype is "+ transactionno);

 
if(vouchertype==='Payment' || vouchertype==='Contra' || vouchertype==='Receipt' || vouchertype==="Journal")
{
  console.log("GEre");
  var geteditvoucherdata= `SELECT * from paymentdetails inner join paymenttable on paymentdetails.transactionno=paymenttable.transactionno where paymenttable.transactionno=? and paymenttable.vouchertype=? and paymentdetails.vouchertype=? and paymentdetails.transactionno=?`;
  con.query(geteditvoucherdata,[transactionno,vouchertype,vouchertype,transactionno],function(err,result,fields)
  {
    if(err)
    {
      console.log(err);
      res.status(500).send({'err':'Error'});
    }
    else
    {
  console.log(result);
      res.status(200).send({'prjcdata':result});
    }
  })
}
else if(vouchertype=== 'Sales')
{
  var getsalesdata= "SELECT salesdetails.salesno,dctype,vouchertype,accountname,totalamount,DATE_FORMAT(salesdetails.salesdate,'%Y-%m-%d') as salesdate,id,itemname,quantity,rate,units,amount from salesdetails inner join salestable on salesdetails.salesno=salestable.salesno where salestable.salesno=?";
  con.query(getsalesdata,[transactionno],function(err,result,fields)
  {
    if(err)
    {
      console.log(err);
      res.status(500).send({'err':'Error'});
    }
    else
    {
  console.log(result);
  res.status(200).send({'prjcdata':result});
    }
    
  })
}
else{
  var getsalesdata= "SELECT purchasedetails.purchaseno,dctype,vouchertype,accountname,totalamount,DATE_FORMAT(purchasedetails.purchasedate,'%Y-%m-%d') as purchasedate,id,itemname,quantity,rate,units,amount from purchasedetails inner join purchasetable on purchasedetails.purchaseno=purchasetable.purchaseno where purchasetable.purchaseno=?";
  con.query(getsalesdata,[transactionno],function(err,result,fields)
  {
    if(err)
    {
      console.log(err);
      res.status(500).send({'err':'Error'});
    }
    else
    {
  console.log(result);
  res.status(200).send({'prjcdata':result});
    }
    
  })

}     // res.status(200).send({'url':'/voucheredit'});
    

})


// con.query(getledgerdata,[[req.body.accountname],[req.body.accountname],[req.body.accountname],[req.body.accountname]],function(err,results,fields){
//   if(err)
//   {
//     // res.status(500).send({'err':'No transaction till date'});
//     console.log(err);
//   }
//   else
//   {
//     // console.log(results[0]);
//     // resolve(results[0]);
//     console.log("REsult is ");
//     console.log(results)
//     var testresult=Object.assign(results[0],results[1])
//     // testresult=Object.assign(results[0],results[2]);
//     console.log("REsult 0 is ");
//     console.log(results[0])

//     console.log("Test result is" + testresult);
//     res.status(200).send({'ledgerdata':results[0]});

//   }
// })




})



app.use('/proxi',proxy('http://buddha.ansunepal.com/', {
  proxyReqPathResolver: function (req, res) {
      return require('url').parse(req.url).path;
  }

}
));

app.get('/ledger',authenticate,function(req,res)
{
var selectdata= "SELECT * from accountinformation";
con.query(selectdata,[req.body.ledgerinitialdate,req.body.ledgerfinaldate],function(err,result,fields)
    {
        console.log(err);
     
        res.render('pages/groupledger',{accountnamelist:result});

    }

  )
})


app.post('/addintobilldetails',function(req,res)
{
  var billingdetailsdata= req.body.billingdetailsdata;
  console.log(billingdetailsdata);
  var rthtable={'room':'roomnamestatus','hall':'hallnamestatus','table':'tablenamestatus'};

  var insertintobillingdetails = "INSERT INTO billtable select * from tempbilltable where name=?; DELETE from tempbilltable where name=?; INSERT INTO `billingdetails`(`billno`, `rthtype`, `rthname`, `customername`, `address`, `totalamount`, `servicecharge`, `discountpercent`, `discountamount`, `grandtotal`, `paymentreceived`, `balancedue`, `salesdate`) values (?);UPDATE `${rthtable[req.body.billingdetailsdata[1]]}` set status='Available' where name=?";


  con.query(insertintobillingdetails,[[req.body.billingdetailsdata[2]],[req.body.billingdetailsdata[2]],[billingdetailsdata],[req.body.billingdetailsdata[2]]],function(err,results)
  {
    if(err)
    {
      console.log(err);
      res.status(500).send({'err':'Error'});
    }
    else{
      res.status(200).send({'err':'Error'});
    }
  })
})
var username;
var password;

app.post('/login',function(req,res)
{
username=req.body.username;
password=req.body.password;
  console.log(username);
  console.log(password);
  var usertable="SELECT * from userlist where username=? and password=?";
  con.query(usertable,[username,password],function(err,result,fields)
  {
    console.log(result.length);
    if(result.length===0)
    {

    console.log(result);
      res.status(500).send({'err':'User doesnot exist'});
    }
    else
    {
      res.status(200).send({'success':'Success'});
    } 
  })
})

app.get('/register',function(req,res)
{
// var username=req.body.username;
// var password=req.body.password;
res.render('pages/register');
})

app.post('/register',function(req,res)
{
var username=req.body.username;
var password=req.body.password;
var checkuser= "SELECT * from userlist where username=?";
var insertuser= "INSERT INTO userlist(username,password) values (?,?)";
con.query(checkuser,[username],function(err,results)
{
console.log(results);
  if(results.length===0)
  {
con.query(insertuser,[username,password],function(err,results1)
{
  if(err)
  {
    console.log(err);
  }
console.log("Added Successfully");
res.status(200).send({'success':"Inserted Successfully"});
})
  }
  else
  {
    res.status(500).send({'err':"Username already exists"});
  }
})
})

app.get('/login',authenticate,function(req,res)
{
  console.log("Authenticated");
  console.log(isauthenticated);
  if(isauthenticated===false)
  {
  res.render('pages/login');
  }
  else
  {
    return res.redirect('/voucher');
  }
})
var port = process.env.port || 3000;
app.listen(port,()=> console.log('Listening on port 3000'));
