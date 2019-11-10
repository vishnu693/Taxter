var allData;
var AGIData;
var filData;
var dat;
var fields = {
    MaritalStatus: "",
	Age: 0,
	AGI: 0
	
};
var sol = [];
var tempSol=[];
var tempDat =[];

var incomeArray=[];
var ageArray=[];
var TaxRefundArray=[];
var maritalArray =[]
var average =0;




function getAllData() {

    const url1 = 'https://p50s9dc5r8.execute-api.us-east-1.amazonaws.com/Prod/UserData/All';
    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    fetch(url1)
        .then(response => response.json())
        .then(json => {
			console.log("started");
            //console.log(json);
            var val = json.length;
			
			fieldData();

            console.log("length : " + val);
			getAGIRange();
        });


}

function dataArrays()
{
	const url1 = 'https://p50s9dc5r8.execute-api.us-east-1.amazonaws.com/Prod/UserData/All';
    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    fetch(url1)
        .then(response => response.json())
        .then(json => {
			console.log("started");
            //console.log(json);
            var val = json.length;
			console.log("length : " + val);
			putArray(json);
        });
		
		
		

}
function putArray(allData)
{
	for(var i =0; i < allData.length; i++)
		{
			incomeArray.push(allData[i].AGI.Value);
			ageArray.push(allData[i].Age.Value);
			TaxRefundArray.push(allData[i].RefundAmount.Value);
			
			if(typeof(allData[i].MaritalStatus) !='undefined'){
				var temp = allData[i].MaritalStatus.Value;
				//console.log(temp);
				maritalArray.push(temp);
			}
			else 
			{
				maritalArray.push("");
			}
			
		}
		
	//var matIncomeW = fun('Widowed');
	//var matIncomeM = fun('Married');
	//var matIncomeD = fun('Divorced');
	
	//console.log("Widowed : " + matIncomeW);
	//console.log("Married : " +matIncomeM);
	//console.log("Divorced : " + matIncomeD);
	
	//var I1829 = fun2(18,29);
	//var I3039 = fun2(30,39);
	//var I4049 = fun2(40,49);
	//var I5059 = fun2(50,59);
	//var I6080 = fun2(60,81);
	//console.log("1: "+I1829);
	//console.log("2: "+I3039);
	//console.log("3: "+I4049);
	//console.log("4: "+I5059);
	//console.log("5: "+I6080);
	
	fields.AGI =125000;
	getAGIRange();
	
	
		
		//console.log("income Array : " + incomeArray);
		//console.log("Age Array : " + ageArray);
		//console.log("Refund Array : " + TaxRefundArray);
		//console.log("marital array : " + maritalArray);
}


function getAGIRange()
{
	if(fields.AGI >= 25000 && fields.AGI < 50000)
	{
		getAGIData(25000,50000);
	}
	else if(fields.AGI >= 50000 && fields.AGI < 75000)
	{
		getAGIData(50000,75000);
	}
	else if(fields.AGI >= 75000 && fields.AGI < 100000)
	{
		getAGIData(75000,100000);
	}
	else if(fields.AGI >= 100000 && fields.AGI < 125000)
	{
		getAGIData(100000,125000);
	}
	else if(fields.AGI >= 125000 && fields.AGI < 150000)
	{
		getAGIData(125000,150000);
	}
	
}



function getUserData(email) {
    const url1 = 'https://p50s9dc5r8.execute-api.us-east-1.amazonaws.com/Prod/' + email;
    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    fetch(url1)
        .then(response => response.json())
        .then(json => {
            allData = json;
            //console.log(json);
            var val = json.length;

            console.log("Total length : " + val);
			
        });
}

function getAGIData(min,max) {
    const url1 = 'https://p50s9dc5r8.execute-api.us-east-1.amazonaws.com/Prod/UserData/AGI/' + min + '/' + max;
    const myInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    fetch(url1)
        .then(response => response.json())
        .then(json => {
            AGIData = json;
            //console.log(json);
            var val = json.length;

            console.log("filtered AGI data length : " + val);
			//fun3(json);
			processData();
			
        });
}
function fieldData()
{
	//Age=33&Income=&maritalStat=
	dat = window.location.href;
    var vals = dat.split("?");
    dat = vals[1];
    var values = dat.split("&");
	var temp = values[0].split("=");
	fields.Age = temp[1];
	temp = values[1].split("=");
	fields.AGI = temp[1];
	temp = values[2].split("=");
	fields.MaritalStatus = temp[1];
	//console.log(fields.Age);
	//console.log(fields.AGI);
	//console.log(fields.MaritalStatus);
	
	
    
}

function processData() {
	
    //fieldData();
	var num =0;
	while(AGIData.length >0) 
	{
		var temp = AGIData.pop();
		if(temp.MaritalStatus == fields.MaritalStatus )
		{
			sol.push(temp);
			//console.log("In 9"); 
		}
		else
		{
			tempDat.push(temp);
		}
		num++;
	}
	console.log("Len "+AGIData.length);
	AGIData = Array.from(tempDat);
	console.log("Count" + num);
	console.log("After 2 : " + AGIData.length);
	console.log("Here 1");
	tempDat = [];
	num =0;
	
	var low = parseInt(fields.Age/10) *10;
	var high = (parseInt(fields.Age/10)+1) *10
	if(high == 20){
		high = 30;
	}
	
	console.log("Low: " +low);
	console.log("High: " +high);
	while(AGIData.length >0) 
	{
		var temp = AGIData.pop();
		if(temp.Age >= low &&  temp.Age< high  )
		{
			sol.push(temp);
			//console.log("In 9"); 
		}
		else
		{
			tempDat.push(temp);
		}
		num++;
	}
	console.log("After 5 : " + tempDat.length);
	console.log("Num " + num);
	tempDat = [];
	//console.log(sol);
	console.log("Final data set size is : " + sol.length);
	var avg = AvgRefund(sol);
	
	console.log("Avg Refund is: " +average);
	var sd = SDRefund(sol,average);
	console.log("SD Refund is: " +sd);
	var max = maxRefund(sol);
	var min = minRefund(sol);
	var error = errorCal(sol,sd);
	console.log("max: " + max+" min: "+ min);
	console.log("Error %: " + (error*100)+"%");
	displayData(avg);
}

function AvgRefund(sol)
{
	var sum =0;
	for(var i =0; i < sol.length; i++)
	{
		sum = sum + sol[i].RefundAmount;
	}
	console.log("Sum is " +sum);
	var avg = sum / sol.length;
	avg = avg.toFixed(2);
	
	return avg;
	
}

function SDRefund(sol, avg)
{
	var sum =0;
	for(var i =0; i< sol.length; i++)
	{
		sum = sum + ((sol[i].RefundAmount-avg)*(sol[i].RefundAmount-avg));
	}
	
	var temp  = Math.sqrt(sum/sol.length);
	temp = temp.toFixed(2);
	return temp;
}

function errorCal(sol, sd)
{
	var error = sd/Math.sqrt(sol.length);
	return error;
}

function minRefund(sol)
{
	var min = sol[0].RefundAmount;
	for(var i =0; i< sol.length; i++)
	{
		if(sol[i].RefundAmount < min)
		{
			min = sol[i].RefundAmount;
		}
	}
	return min;
}

function maxRefund(sol)
{
	var max = sol[0].RefundAmount;
	for(var i =0; i< sol.length; i++)
	{
		if(sol[i].RefundAmount > max)
		{
			max = sol[i].RefundAmount;
		}
	}
	return max;
}

function fun( str)
{
	var sum =0;
	var counter =0; 
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> "+typeof(Number(TaxRefundArray[0])));
	for(var i =0; i <maritalArray.length; i++ )
	{
		if(maritalArray[i] == str)
		{
			sum = sum + Number(TaxRefundArray[i]);
			counter++;
		}
	}
	console.log(maritalArray.length);
	console.log("Sum is " + sum);
	console.log(counter);
	
	var temp = (sum/counter);
	console.log(temp);
	return temp;
	
}

function fun2(min,max)
{
	var sum =0;
	var counter =0; 
	//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> "+typeof(Number(TaxRefundArray[0])));
	for(var i =0; i <ageArray.length; i++ )
	{
		if(ageArray[i] >= min && ageArray[i] < max)
		{
			sum = sum + Number(TaxRefundArray[i]);
			counter++;
		}
	}
	console.log("Sum is " + sum);
	console.log(counter);
	
	var temp = (sum/counter);
	console.log(temp);
	return temp;
}

function fun3(AGIData)
{
	var ISum =0; 
	var RSum =0;
	
	for(var i =0; i < AGIData.length; i++)
	{
		ISum = ISum + Number(AGIData[i].AGI);
		RSum = RSum + Number(AGIData[i].RefundAmount);
		
	}
	console.log("ISum: "+ISum);
	console.log("RSum: "+RSum);
	var avg1 = ISum/AGIData.length;
	var avg2 = RSum/AGIData.length;
	
	console.log("AGI: " + avg1);
	console.log("Refund: " + avg2);
	
	
}

function displayData(avg)
{
	document.getElementById("data").innerHTML = avg;
}




