"https://www.figma.com/file/Snw8n1gba7Mbk6TCLEAB1A/JS-%2F-Solaris?node-id=0%3A1&mode=dev";
"https://gist.github.com/Andreas-Zocom/283889abba78b0a5edf9c09a430c02cd";
//fixa apikey -
//fetch solarSystem-
//skapa htmlelement-
//klicka på planet add event- hitta namn för att komma åt planet?-
// och visa overlay -
//(slide in?), bakåtpil(slide out)
// namn(name),-
//latinska namnet ('latinName'),-
// måne([moons])-
//info (desc)-
//dag/natt temp (temp day, temp night)-
//km från solen (distance)-
// omkrets (circumference)-
// footer
// kryssa ner overlay/piltillbaka

let solarSystem = [];
// hämtar alla planeter
const planetsEl = document.querySelectorAll(".planets_planet");

planetsEl.forEach((planet) => {
  planet.addEventListener("click", (event) => {
    let clickedPlanet = document.getElementById(event.target.id);
    let clickedPlanetID = clickedPlanet.id.replace("planet", "");
    console.log(clickedPlanetID);
    const planet = solarSystem.find((planet) => planet.id == clickedPlanetID);

    if (planet) {
      const planetStyles = window.getComputedStyle(clickedPlanet);
      const bgColor = planetStyles.getPropertyValue("background-color");
      const borderColor1 = bgColor
        .replace("rgb", "rgba")
        .replace(")", ", 0.1)");
      const borderColor2 = bgColor
        .replace("rgb", "rgba")
        .replace(")", ", 0.06)");
      console.log(bgColor.replace("rgb", "rgba").replace(")", ", 0.1)"));
      console.log(planet);
      const html = `<div id="planetInfoOverlay" class="planetInfo">
      <header class="header_overlay">
        <h1 id="primaryNamePlanetOverlay">${planet.name}</h1>
        <h2 id="latinNamePlanetOverlay">${planet.latinName}</h2>
      </header>
      <div id="bigInfoPlanet" style="background-color: ${bgColor}; box-shadow: 0 0 0 2.5rem ${borderColor1},
      0 0 0 5rem  ${borderColor2};" class="planets_planet bigInfoPlanet"></div>
      <section id="planetInfoSection" class="planetInfoSection">
        <p id="desc" class="planetInfoSection_info">
        ${planet.desc}
        </p>
        <section id="planetInfoSection" class="planetInfoSection-list">
        <div class="planetInfoSection-list_item">
        <h3>OMKRETS</h3>
        <p>${planet.circumference}</p>
      </div>
      <div class="planetInfoSection-list_item">
        <h3>KM FRÅN SOLEN</h3>
        <p>${planet.distance}</p>
      </div>
          <div class="planetInfoSection-list_item">
            <h3>MAX TEMPERATUR</h3>
            <p>${planet.temp.day}</p>
          </div>
          <div class="planetInfoSection-list_item">
          <h3>MIN TEMPERATUR</h3>
          <p>${planet.temp.night}</p>
          </div>
       
        </section>
        <h3>MÅNAR</h3>
        <p>${planet.moons}</p>
      </section>
    </div>`;

      // document.querySelector(".wrapper").remove();
      document.querySelector("body").innerHTML = html;
    }
  });
});
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
  solarSystem = await resp.json();
  solarSystem = solarSystem.bodies;
  console.log(solarSystem);
};

const showPlanet = () => {};
