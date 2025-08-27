// api/lookup.js
const data = [
  {
    "Number": "918297000013",
    "Carrier": "Vodafone",
    "Name": "Grey Ticket",
    "Gender": "UNKNOWN",
    "Image": "",
    "Address": "Andhra Pradesh in",
    "JobTitle": "",
    "CompanyName": "",
    "Email": "support@greyticket.com",
    "Website": "",
    "Facebook": "",
    "Twitter": "",
    "Tags": "",
    "Badges": "verified,user",
    "Score": "0.9",
    "SpamCount": "0"
  },
  {
    "Number": "918297000561",
    "Carrier": "Vodafone",
    "Name": "Satish Novo. Rep",
    "Gender": "",
    "Image": "",
    "Address": "Andhra Pradesh ",
    "JobTitle": "",
    "CompanyName": "",
    "Email": "",
    "Website": "",
    "Facebook": "",
    "Twitter": "",
    "Tags": "",
    "Badges": "",
    "Score": "0.3274227",
    "SpamCount": "0"
  },
  {
    "Number": "918297001223",
    "Carrier": "Vodafone",
    "Name": "Shaik Ismail",
    "Gender": "UNKNOWN",
    "Image": "",
    "Address": "Andhra Pradesh in",
    "JobTitle": "",
    "CompanyName": "",
    "Email": "shakaffiliate@gmail.com",
    "Website": "",
    "Facebook": "",
    "Twitter": "",
    "Tags": "",
    "Badges": "user",
    "Score": "0.9",
    "SpamCount": "0"
  },
  {
    "Number": "918297001499",
    "Carrier": "Vodafone",
    "Name": "Sridevi Rao",
    "Gender": "UNKNOWN",
    "Image": "https://s3-eu-west-1.amazonaws.com/images1.truecaller.com/myview/1/3de75e3e99b9c7ce11cd81175797151e/1",
    "Address": "Andhra Pradesh in",
    "JobTitle": "",
    "CompanyName": "",
    "Email": "asreesanth@gmail.com",
    "Website": "",
    "Facebook": "",
    "Twitter": "",
    "Tags": "",
    "Badges": "user",
    "Score": "0.9",
    "SpamCount": "0"
  },
  {
    "Number": "918297001493",
    "Carrier": "Vodafone",
    "Name": "Edelweise Srinivas",
    "Gender": "",
    "Image": "",
    "Address": "Andhra Pradesh ",
    "JobTitle": "",
    "CompanyName": "",
    "Email": "",
    "Website": "",
    "Facebook": "",
    "Twitter": "",
    "Tags": "",
    "Badges": "",
    "Score": "0.3774799",
    "SpamCount": "0"
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ 
      error: 'Number parameter is required',
      usage: '/api/lookup?number=918297000013'
    });
  }

  // Clean the number (remove any non-digit characters)
  const cleanNumber = number.replace(/\D/g, '');
  
  // Find the entry in our data
  const entry = data.find(item => item.Number === cleanNumber);
  
  if (!entry) {
    return res.status(404).json({ 
      error: 'Number not found in database',
      number: cleanNumber
    });
  }
  
  // Return the found entry
  res.status(200).json(entry);
}