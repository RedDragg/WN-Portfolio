gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
  // Sluit nav bij klik
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('hamburger').checked = false;
    });
  });

  // Thema ophalen en toepassen
  const savedTheme = localStorage.getItem('theme') || 'light';
  const themeRadio = document.getElementById(savedTheme);
  if (themeRadio) themeRadio.checked = true;

  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        localStorage.setItem('theme', radio.id);
      }
    });
  });

  // GSAP animaties
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });

  gsap.utils.toArray(".goal-title").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: i % 2 === 0 ? -40 : 40,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  gsap.utils.toArray(".goal-content p").forEach((p, i) => {
    gsap.from(p, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: p,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  gsap.utils.toArray(".projects-container ul li").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      scale: 0.95,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none none"
      }
    });
  });

  // Skills progress
  const animateSkill = (skill) => {
    const progress = skill.querySelector('progress');
    const label = skill.querySelector('p span:last-child');
    const target = parseInt(skill.getAttribute('data-percent')) || 0;
    let current = 0;

    const animate = () => {
      if (current <= target) {
        progress.value = current;
        label.textContent = `${current}%`;
        current++;
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkill(entry.target);
        gsap.from(entry.target, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: "power2.out"
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill').forEach(skill => {
    observer.observe(skill);
  });

  // Header-text animatie
  gsap.from(".header-text-content h1", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".header-text-content",
      start: "top 80%",
    }
  });

  gsap.from(".header-text-content p", {
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".header-text-content",
      start: "top 80%",
    }
  });

  // Tabel filters
  const rows = document.querySelectorAll("table tr:not(:first-child)");

  const getSelectedValue = (name) => {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
  };

  const filterRows = () => {
    const usefullVal = getSelectedValue("usefull");
    const inspiredVal = getSelectedValue("inspired");
    const roleVal = getSelectedValue("role");

    let count = 0;

    rows.forEach(row => {
      const usefull = row.querySelector(".usfl")?.classList || [];
      const inspired = row.querySelector(".insp")?.classList || [];
      const role = row.querySelector(".role")?.classList || [];

      const matchesUsefull = !usefullVal || usefull.contains(usefullVal);
      const matchesInspired = !inspiredVal || inspired.contains(inspiredVal);
      const matchesRole = !roleVal || role.contains(roleVal);

      const visible = matchesUsefull && matchesInspired && matchesRole;
      row.style.display = visible ? "" : "none";

      if (visible) count++;
    });

    const countElement = document.getElementById("result-count");
    if (countElement) {
      countElement.textContent = `Showing ${count} item${count === 1 ? "" : "s"}`;
    }
  };

  document.querySelectorAll('.filters input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', filterRows);
  });

  filterRows(); // eerste keer toepassen

  // Klaar!
  return;
});
