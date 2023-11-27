"https://www.figma.com/file/Snw8n1gba7Mbk6TCLEAB1A/JS-%2F-Solaris?node-id=0%3A1&mode=dev";
"https://gist.github.com/Andreas-Zocom/283889abba78b0a5edf9c09a430c02cd";
//fixa apikey
//fetch solarSystem
//skapa htmlelement
//klicka på planet och visa overlay (slide in?), bakåtpil(slide out)
// namn(name),
//latinska namnet ('latinName'),
// måne([moons])
//info (desc)
//dag/natt temp (temp day, temp night)
//km från solen (distance)
// omkrets (circumference)

//hämtar APIkey
const getApiKey = async () => {
  let respKey = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
      headers: { "x-zocom": "<solaris-key-here>" },
    }
  );

  let apiKey = await respKey.json();
  console.log(apiKey.key);
  fetchSolarSystem(apiKey.key);
};
getApiKey();

// skickar med apikey som inparameter och hämtar listan med planetobjekt
const fetchSolarSystem = async (key) => {
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      method: "GET",
      headers: { "x-zocom": key },
    }
  );
  let solarSystem = await resp.json();
  console.log(solarSystem);
};
