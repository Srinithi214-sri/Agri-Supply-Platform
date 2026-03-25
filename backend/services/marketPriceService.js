import axios from "axios";

export const getMandiPrices = async () => {

 try {

  const response = await axios.get(
   "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
   {
    params:{
     "api-key":process.env.DATA_GOV_API_KEY,
     format:"json",
     limit:1000
    }
   }
  );

  const selectedCrops = [
   "tomato",
   "onion",
   "potato",
   "rice",
   "carrot"
  ];

  const formattedData = response.data.records

   // flexible Tamil Nadu filter
   .filter(item => 
    item.state?.toLowerCase().includes("tamil")
   )

   // flexible crop filter
   .filter(item =>
    selectedCrops.some(crop =>
     item.commodity?.toLowerCase().includes(crop)
    )
   )

   .map(item => ({

    commodity: item.commodity,

    market: item.market,

    price_per_kg:
     (Number(item.modal_price)/100).toFixed(2),

    date: item.arrival_date

   }));


  console.log(formattedData); 
  return formattedData;

 } catch(err){

  console.log(err.message);

  return [];

 }

};