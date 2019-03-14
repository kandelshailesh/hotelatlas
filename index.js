const express= require('express');
var mysql = require('mysql');
var bodyParser= require('body-parser');
var MySQLEvents = require('mysql-events');


var con = mysql.createConnection({
  host: "localhost",
  user: "hotelatlas",
  password: "Hotel@atlas123",
  database: "hotelatlas",
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
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());

app.get('/',function(req,res)
{
return res.redirect('/billing');
})

app.get('/billing', function(req, res) {
    res.render('pages/billing');
});

// about page 
app.get('/payment', function(req, res) {
  var accountquery = "SELECT * from groups; SELECT * from paymenttable";
    con.query(accountquery,function(err,results,fields)
    {
      // console.log(results[0]);
      // console.log(results[1]);

    // console.log(result.length);
    // if (err) throw err;
    // console.log(result[0].accountname);
    // console.log("Number of records inserted: " + result.affectedRows);
    if(results[1].length===0)
    {
      transactionno= 0;
    }
    else
    {
      for(var i=0; i<results[1].length;i++)
      {
      transactionno= parseInt(results[1][i]['transactionno']);
    }
    }

    console.log(transactionno);
     res.render('pages/payment',{results:results[0],transactionno:transactionno});
    }
    );
    // res.render('pages/payment',);
});

app.get('/reserve', function(req, res) {
    res.render('pages/reserve');
});
app.post('/accountsubmit',(req,res)=>
{
  console.log(req.body.accountdataarray);
  var accountdata=[req.body.accountdataarray];
  // paymentdata=paymentdata[0];
  // console.log(paymentdata);
  if(accountdata[0][4] >0 && accountdata[0][4]<4)
  {
  var accountquery = "INSERT INTO accountinformation(accountname, alias, printname, accountgroup, address, country, telno, fax, mobileno, email, contactperson, panno,accountno,fiscalyear,amount) VALUES ? ";
    con.query(accountquery,[accountdata],function(err,result)
    {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
      res.json({'result':'Submitted'});
    });

}
else
{
  console.log("Hello");
   var accountquery = "INSERT INTO accountinformation(accountname, alias, printname, accountgroup, address, country, telno, fax, mobileno, email, contactperson,panno,fiscalyear,amount) VALUES ? ";
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

app.get('/daybookreturn',(req,res)=>
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
app.get('/trialbalance',(req,res)=>
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
	var paymentdata=req.body.op;
  console.log(paymentdata);
	// paymentdata=paymentdata[0];
	// console.log(paymentdata);
  var transactionno= paymentdata[0][5];


	var inser = "INSERT INTO paymenttable(dctype,account,dcamount,narration,vouchertype,transactionno) VALUES ? ";
    con.query(inser,[paymentdata],function(err,result)
    {
      // console.log([paymentdata]);
    if (err) throw err;
    // console.log("Number of records inserted: " + result.affectedRows);
console.log(result);
    res.json({'transactionno':parseInt(transactionno)+1});
    });

	
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
var port = process.env.port || 3000;
app.listen(port,()=> console.log('Listening on port 3000'));
