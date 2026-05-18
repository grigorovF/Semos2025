const fetch = (...args) =>  import("node-fetch").then(({ default: fetch }) => fetch(...args));
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// 6f19d3b846570786bda883206f390f0d

let cache = {};

exports.getCity = async (req, res) => {
  //info za vremenska prognoza
  const city = req.params.city;
  const key = "6f19d3b846570786bda883206f390f0d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

//   const data = await fetch(url);
//   const weatherData = await data.json();
//   res.send(weatherData);

    // const cache = {
    //   ohrid: {
    //     localCache: {},
    //     cacheTime: 32523523452352,
    //   },
    //   skopje: {
    //     localCache: {},
    //     cacheTime: 32523523452352,
    //   },
    // };

    const CACHE_TIME = 60*1000;

    const cachedCity = cache[city];


    const now = Date.now();
    const isExpired = !cachedCity || !cachedCity.cacheTime || now - cachedCity.cacheTime > CACHE_TIME;
    
    if (isExpired){
        const response = await fetch(url);
        const data = await response.json();

        cache[city] =  {
            localCache: data,
            cacheTime: now,
        }
    }

    return res.send(cache);
};
