    // ✅ Haal de parameter uit de URL
    const getParameterByName = (name) => {
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    };

    // ✅ Check of de parameter 'keuze' bestaat
    const keuze = getParameterByName('keuze');
    if (keuze) {
      const radio = document.getElementById('wn' + keuze);
      if (radio) {
        radio.checked = true;
      }
    }