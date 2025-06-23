    // Bron liquidJS van Dante
    // retrieve JSON data from API
    const data = await (
        await fetch(
          'https://fdnd.directus.app/items/person/?filter={%22id%22:201}'
        )
      ).json();
      
      // parse custom data field from API
      const customField = JSON.parse(data.data[0].custom);
      
      // retrieves the HTML template from the document and renders it with the given data using the Liquid templating engine
      async function renderTemplate(templateId, targetId, data, customField) {
        const template = document.querySelector(templateId).innerHTML;
        const renderedTemplate = await new liquidjs.Liquid().parseAndRender(
          template,
          {
            data: data.data[0],
            customField,
          }
        );
        document.querySelector(targetId).innerHTML = renderedTemplate;
      }
      
      // render the HTML template
      await renderTemplate("#template", "#result", data, customField);



      // Selecteer elementen
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const hamburgerlines = document.querySelectorAll('.line1, .line2, .line3, .typing')
const lightdarkMode = document.getElementById("darkmode");


// Sticky navigatie bij scrollen
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        hamburgerlines.forEach(line => line.classList.add('scrolled'));  // Voeg de 'scrolled' class toe aan elke lijn
    } else {
        navbar.classList.remove('scrolled');
        hamburgerlines.forEach(line => line.classList.remove('scrolled'));
    }
});

// Hamburger-menu functionaliteit
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
});

// volleybal veld on click
function toggleMove(volleyball) {
    // Selecteer de container van de moving volleyball door de bal te vinden en de oudercontainer te selecteren
    const container = document.querySelector('.containerVolleyballVeld');
    container.classList.toggle('active');
}

// Selecteer de checkbox en het bijbehorende label
const darkmodeCheckbox = document.getElementById("darkmode");
const darkmodeLabel = document.querySelector("label[for='darkmode']");

// Voeg een event listener toe aan de checkbox
darkmodeCheckbox.addEventListener("change", function () {
    if (darkmodeCheckbox.checked) {
        // Wanneer darkmode is ingeschakeld
        darkmodeLabel.textContent = "Wil je het lichter?";
    } else {
        // Wanneer darkmode is uitgeschakeld
        darkmodeLabel.textContent = "Wil je het donkerder?";
    }
});
