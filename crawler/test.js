import * as querystring from "node:querystring";
const inputs = process.argv
//const data = querystring.parse( process.argv[3] || '' );

const bank_id = querystring.parse(inputs[2] || '').bank_id;
const link = querystring.parse(inputs[3] || '').link
console.log(link);
