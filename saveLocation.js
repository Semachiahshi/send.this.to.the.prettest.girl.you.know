{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ MongoClient \} from 'mongodb';\
\
// Z\'edsk\'e1n\'ed p\uc0\u345 ipojovac\'edho \u345 et\u283 zce z environment\'e1ln\'edch prom\u283 nn\'fdch\
const uri = mongodb+srv://semachiahsi:<youtube>@cluster0.gnefk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;\
const client = new MongoClient(uri);\
\
export default async function handler(req, res) \{\
    if (req.method === 'POST') \{\
        const \{ latitude, longitude \} = req.body;  // Z\'edsk\'e1n\'ed dat z body requestu\
\
        // Pokud nejsou sou\uc0\u345 adnice, vr\'e1t\'edme chybu\
        if (!latitude || !longitude) \{\
            return res.status(400).json(\{ error: 'Latitude and longitude are required.' \});\
        \}\
\
        try \{\
            // P\uc0\u345 ipojen\'ed k datab\'e1zi MongoDB\
            await client.connect();\
            const database = client.db('geolocation'); // Vybereme datab\'e1zi (geolocation)\
            const collection = database.collection('locations'); // Vybereme kolekci (locations)\
\
            // Ulo\'9een\'ed dat do kolekce\
            const result = await collection.insertOne(\{\
                latitude,\
                longitude,\
                date: new Date(), // P\uc0\u345 id\'e1me datum ulo\'9een\'ed\
            \});\
\
            // Odpov\uc0\u283 \u271  po \'fasp\u283 \'9an\'e9m ulo\'9een\'ed\
            res.status(200).json(\{ message: 'Location saved!', result \});\
        \} catch (error) \{\
            console.error('Database error:', error);\
            res.status(500).json(\{ error: 'Internal server error' \});\
        \} finally \{\
            await client.close(); // Uzav\uc0\u345 en\'ed p\u345 ipojen\'ed k datab\'e1zi\
        \}\
    \} else \{\
        res.setHeader('Allow', ['POST']);\
        res.status(405).end(`Method $\{req.method\} Not Allowed`); // Pokud nen\'ed metoda POST\
    \}\
\}}