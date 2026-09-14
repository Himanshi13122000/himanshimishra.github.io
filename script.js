// ===========================
// MOBILE MENU TOGGLE
// ===========================

const menuButton = document.querySelector('.menu');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

// Toggle menu on button click
menuButton.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuButton.setAttribute('aria-expanded', nav.classList.contains('active'));
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && !e.target.closest('.menu')) {
    nav.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in and reveal elements
document.querySelectorAll('.fade-in, .reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===========================
// SMOOTH SCROLL WITH OFFSET
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================

window.addEventListener('scroll', () => {
  let current = '';
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===========================
// COUNTER ANIMATION
// ===========================

const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number, [class*="stat-value"]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    
    if (!isNaN(target)) {
      let current = 0;
      const increment = target / 50;
      
      const updateCount = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start animation when element is in view
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.unobserve(counter);
        }
      });
      
      observer.observe(counter);
    }
  });
};

// Call on load
window.addEventListener('load', animateCounters);

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
  // Close menu on Escape
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// ===========================
// LAZY LOADING FOR IMAGES
// ===========================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ===========================
// FORM SUBMISSION (if needed)
// ===========================

const handleFormSubmit = (form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      button.textContent = 'Sent Successfully! ✓';
      button.style.background = '#4CAF50';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
        form.reset();
      }, 3000);
    }, 1000);
  });
};

// Apply to any forms
document.querySelectorAll('form').forEach(form => {
  handleFormSubmit(form);
});

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑ Top';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 12px 20px;
  background: #b87a42;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 99;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.opacity = '1';
    scrollToTopButton.style.visibility = 'visible';
  } else {
    scrollToTopButton.style.opacity = '0';
    scrollToTopButton.style.visibility = 'hidden';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===========================
// PERFORMANCE MONITORING
// ===========================

if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', pageLoadTime + 'ms');
  });
}

// ===========================
// ANALYTICS (Optional - Replace with your tracking)
// ===========================

const trackEvent = (eventName, eventData = {}) => {
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }
  console.log('Event tracked:', eventName, eventData);
};

// Track section views
document.querySelectorAll('section').forEach(section => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      trackEvent('section_viewed', {
        section: section.id
      });
      observer.unobserve(section);
    }
  });
  observer.observe(section);
});

// Track button clicks
document.querySelectorAll('a, .btn').forEach(element => {
  element.addEventListener('click', () => {
    trackEvent('element_clicked', {
      element: element.textContent,
      href: element.href
    });
  });
});

// ===========================
// INITIALIZATION
// ===========================

console.log('Portfolio script loaded successfully');

// Add 'loaded' class to body when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  });
} else {
  document.body.classList.add('loaded');
}
