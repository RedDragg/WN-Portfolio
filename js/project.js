    // ✅ Haal de parameter uit de URL
    const getParameterByName = (name) => {
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    };

    // ✅ Check of de parameter 'keuze' bestaat
    const keuze = getParameterByName('pj');
    if (keuze) {
      const radio = document.getElementById('pj' + keuze);
      if (radio) {
        radio.checked = true;
      }
    }