const btn = document.querySelector("#btn");
const name_value = document.querySelector("#name_value");

function createCountryCard(obj, nationalize) {
  const single = document.createElement("div");
  single.setAttribute("class", "single-chart");

  const h1 = document.createElement("h1");
  h1.textContent = obj.name;
  h1.setAttribute("class", "text-center");

  const h3 = document.createElement("h3");
  h3.textContent = obj.capital;
  h3.setAttribute("class", "text-center");

  const p = document.createElement("p");
  p.textContent = obj.languages[0].name;
  p.setAttribute("class", "text-center");

  const percents = document.createElement("p");
  percents.textContent = `${(nationalize.probability * 100).toFixed(2)}%`;
  percents.setAttribute("class", "text-center");

  single.append(h1, percents, h3, p);

  document.querySelector(".flex-wrapper").append(single);
}

btn.addEventListener("click", async () => {
  try {
    document.querySelector(".flex-wrapper").innerHTML = "";
    document.querySelector(".flex-wrapper").innerHTML = `
        <div class="text-center spinner-border" role="status">
        <span class="sr-only"></span>
        </div
        `;

    const response = await fetch(
      `https://api.nationalize.io/?name=${name_value.value}`
    );
    const data = await response.json();
    const countries_codes = data.country;

    if (countries_codes.length > 0) {
      document.querySelector(".flex-wrapper").innerHTML = "";

      for (let cc of countries_codes) {
        const response = await fetch(
          `https://restcountries.com/v2/alpha/${cc.country_id}`
        );
        const data = await response.json();
        const country_details = data;

        createCountryCard(country_details, cc);
      }
    } else {
      document.querySelector(".flex-wrapper").innerHTML = "not found result";
    }
  } catch (error) {
    console.log(error);
  }
});
