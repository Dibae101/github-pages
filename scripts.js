// Smooth scroll animation for sections
function animateOnScroll() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Enhanced navbar functionality
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');

  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('show');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navUl.classList.remove('show');
    });
  });

  // Add scroll effect to navbar
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(35, 47, 62, 0.98)';
      header.style.transform = 'translateY(0)';
    } else {
      header.style.background = 'rgba(35, 47, 62, 0.95)';
    }
  });
}

// Add stagger animation to skill categories
function animateSkillsOnScroll() {
  const skillsSection = document.querySelector('#skills');
  const skillCategories = document.querySelectorAll('.skill-category');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillCategories.forEach((category, index) => {
          setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0) scale(1)';
          }, index * 100);
        });
      }
    });
  }, { threshold: 0.3 });
  
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// Enhanced Medium posts fetch
async function fetchMediumPosts() {
  try {
    const username = "dibaekhanal101";
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    );
    
    if (!response.ok) {
      throw new Error('Medium API request failed');
    }
    
    const data = await response.json();
    const feedContainer = document.getElementById("medium-feed");
    
    if (!feedContainer || !data.items) return;
    
    // Clear existing content
    feedContainer.innerHTML = '';
    
    const posts = data.items.slice(0, 4);

    if (posts.length === 0) {
      feedContainer.innerHTML = '<p>No articles found.</p>';
      return;
    }

    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("medium-post");
      postElement.style.animationDelay = `${index * 0.1}s`;

      // Extract publish date
      const publishDate = new Date(post.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      postElement.innerHTML = `
        <a href="${post.link}" target="_blank">${post.title}</a>
        <p style="margin-top: 5px; color: var(--text-secondary); font-size: 0.8rem;">
          Published on ${publishDate}
        </p>
      `;

      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    const feedContainer = document.getElementById("medium-feed");
    if (feedContainer) {
      feedContainer.innerHTML = '<p>Unable to load articles at this time.</p>';
    }
  }
}

// Add typing effect to hero title
function addTypingEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '2px solid var(--aws-orange)';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => {
        heroTitle.style.borderRight = 'none';
      }, 500);
    }
  };
  
  // Start typing effect after a short delay
  setTimeout(typeWriter, 1000);
}

// Add parallax effect to hero section
function addParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  animateOnScroll();
  animateSkillsOnScroll();
  fetchMediumPosts();
  
  // Add smooth loading effect
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add performance optimization
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});
