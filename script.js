
const themeSwitch = document.querySelector('.theme-switch');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');



themeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  

  const icon = themeSwitch.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  const icon = themeSwitch.querySelector('i');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}


hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});


navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});


window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
  

  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    filterBtns.forEach(btn => btn.classList.remove('active'));
    
 
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        const categories = card.getAttribute('data-category').split(' ');
        if (categories.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});





const skillItems = document.querySelectorAll('.skill-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

skillItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(item);
});


const languageBars = document.querySelectorAll('.language-progress');
const languageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
    }
  });
}, { threshold: 0.1 });

languageBars.forEach(bar => {
  languageObserver.observe(bar);
});


const typingElement = document.querySelector('.hero-text p');
if (typingElement) {
  const text = typingElement.innerHTML;
  typingElement.innerHTML = '';
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      typingElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  // Start typing effect when the page loads
  window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
  });
}