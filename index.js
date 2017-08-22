var Client = require('node-rest-client').Client;
var JSON = require('JSON');
var parseString = require('xml2js').parseString;


exports.Retrieve = Retrieve("4ahidRBb0UkwZ1xG0OJ3vMKi");

function Retrieve(AuthKey, Callback){
   console.log("Retrieve the Filter");
   var client = new Client();
   var responseData = {};

   var URL = "https://webservice.S4.exacttarget.com/Service.asmx";
   var args = {
       data: ReturnRetrieveDataExtensionXML(),
	    headers: { "Content-Type": "text/xml;charset=UTF-8",
           "Accept-Encoding": "gzip,deflate",
           "SOAPAction": "Retrieve"}
   };
   //console.log(args.data);
   client.post(URL, args, function (data, response) {
		responseData = data;
		// parsed response body as js object 
		console.log(response.statusCode);
		var ret = Buffer.from(data, 'base64');
		console.log("******************************");
        //console.log("Request data " + JSON.stringify(ret));
		//console.log("******************************");
		parseString(ret, function (err, result) {
			var jsonString = JSON.stringify(result);
			console.log("Request data " + jsonString);
			console.log("******************************");
			
			//var RootString = "['soap:Envelope']['soap:Body'][0]['RetrieveResponseMsg'][0]['Results'][0]['DataExtensionObject'][0]";
			
			
		});
   });
   
}
function ReturnRetrieveDataExtensionXML()
{
   var soapRequest = `<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
  <s:Header>
     <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
        <o:UsernameToken u:Id="uuid-c10e3bda-13ef-4868-bacd-6e760cd45cf2-1">
           <o:Username>la-brenda.campbell</o:Username>
           <o:Password>M3rindahArt!</o:Password>
        </o:UsernameToken>
     </o:Security>
  </s:Header>
  <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
     <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">
        <RetrieveRequest>
           <ObjectType>DataExtensionObject[PI_Offline_Processing_AU]</ObjectType>
           <Properties>Email</Properties>
           <Properties>SKU</Properties>
           <Properties>Qty</Properties>
           <Properties>Transaction Key</Properties>
        </RetrieveRequest>
     </RetrieveRequestMsg>
  </s:Body>
</s:Envelope>`;

   return soapRequest;
}

