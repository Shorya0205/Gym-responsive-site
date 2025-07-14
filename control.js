// Footer scroll-in animation
const footer = document.querySelector('.footer__container');
if (footer) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('footer-animate-in');
        } else {
          footer.classList.remove('footer-animate-in');
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(footer);
}

// Testimonial carousel
const testimonials = [
  {
    text: `What truly sets this gym apart is their expert team of trainers. The trainers are knowledgeable, approachable, and genuinely invested in helping members achieve their fitness goals. They take the time to understand individual needs and create personalized workout plans, ensuring maximum results and safety.`,
    name: 'Jane Cooper',
    role: 'Software Developer',
    img: 'assets/test 2.jpg'
  },
  {
    text: `Pulse Fitness has completely changed my outlook on health and fitness. The community is supportive, the classes are always challenging, and the trainers keep me motivated. I feel stronger and more confident every day. The facilities are always clean and the staff is incredibly friendly, making every visit enjoyable and productive.`,
    name: 'Alex Morgan',
    role: 'Marketing Specialist',
    img: 'assets/c2.jpg'
  },
  {
    text: `I love the variety of programs and the personal attention from the trainers. The facilities are top-notch, the staff is friendly, and I always look forward to my workouts at Pulse Fitness! The trainers go above and beyond to help you reach your goals, and the positive atmosphere keeps me coming back week after week.`,
    name: 'Lily Madison',
    role: 'Entrepreneur',
    img: 'assets/test 3.jpg'
  },
  {
    text: `Joining Pulse Fitness was the best decision I made for my health. The trainers are always encouraging, the equipment is state-of-the-art, and the group classes are both fun and effective. I’ve made great friends and achieved results I never thought possible!`,
    name: 'Ava Nicole',
    role: 'Business Analyst',
    img: 'assets/test 1.jpg'
  }
];

const testimonialCard = document.getElementById('testimonial-card');
const testimonialText = document.getElementById('testimonial-text');
const testimonialName = document.getElementById('testimonial-name');
const testimonialRole = document.getElementById('testimonial-role');
const testimonialImg = document.getElementById('testimonial-img');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');

let testimonialIndex = 0;
let testimonialInterval = null;

function showTestimonial(idx) {
  testimonialCard.classList.remove('fade-in');
  testimonialCard.classList.add('fade-out');
  setTimeout(() => {
    testimonialText.textContent = testimonials[idx].text;
    testimonialName.textContent = testimonials[idx].name;
    testimonialRole.textContent = testimonials[idx].role;
    testimonialImg.src = testimonials[idx].img;
    testimonialCard.classList.remove('fade-out');
    testimonialCard.classList.add('fade-in');
  }, 400);
}

function startTestimonialInterval() {
  if (testimonialInterval) clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }, 3000);
}

if (testimonialPrev && testimonialNext) {
  testimonialPrev.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
    startTestimonialInterval();
  });
  testimonialNext.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
    startTestimonialInterval();
  });
}

// Initial fade-in
testimonialCard.classList.add('fade-in');
startTestimonialInterval();

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.contact__btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Add success animation
      contactForm.classList.add('form-success');
      setTimeout(() => {
        contactForm.classList.remove('form-success');
      }, 600);
    }, 2000);
  });
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Field validation function
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  
  // Remove existing error classes
  field.classList.remove('error', 'valid');
  
  // Validate based on field type
  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        field.classList.add('error');
        showFieldError(field, 'Name must be at least 2 characters long');
      } else {
        field.classList.add('valid');
        clearFieldError(field);
      }
      break;
      
    case 'email':
      if (!isValidEmail(value)) {
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid email address');
      } else {
        field.classList.add('valid');
        clearFieldError(field);
      }
      break;
      
    case 'phone':
      if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid phone number');
      } else if (value) {
        field.classList.add('valid');
        clearFieldError(field);
      }
      break;
      
    case 'subject':
      if (!value) {
        field.classList.add('error');
        showFieldError(field, 'Please select a subject');
      } else {
        field.classList.add('valid');
        clearFieldError(field);
      }
      break;
      
    case 'message':
      if (value.length < 10) {
        field.classList.add('error');
        showFieldError(field, 'Message must be at least 10 characters long');
      } else {
        field.classList.add('valid');
        clearFieldError(field);
      }
      break;
  }
}

// Show field error
function showFieldError(field, message) {
  clearFieldError(field);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ff4757;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    animation: slideIn 0.3s ease;
  `;
  
  field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="ri-${type === 'success' ? 'check-line' : type === 'error' ? 'close-line' : 'information-line'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(45deg, #2ed573, #7bed9f)' : 
                 type === 'error' ? 'linear-gradient(45deg, #ff4757, #ff6b7a)' : 
                 'linear-gradient(45deg, var(--secondary-color), #ff8c42)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    max-width: 400px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .notification-content i {
    font-size: 1.2rem;
  }
`;
document.head.appendChild(style);

// Enhanced testimonial functionality
function enhanceTestimonials() {
  // Add progress indicator
  const progressContainer = document.createElement('div');
  progressContainer.className = 'testimonial-progress';
  progressContainer.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
  `;
  
  testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'progress-dot';
    dot.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255,107,0,0.3);
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    dot.addEventListener('click', () => {
      testimonialIndex = index;
      showTestimonial(testimonialIndex);
      startTestimonialInterval();
    });
    
    progressContainer.appendChild(dot);
  });
  
  const testimonialContainer = document.querySelector('.review__container');
  if (testimonialContainer) {
    testimonialContainer.appendChild(progressContainer);
  }
  
  // Update progress dots
  function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
      if (index === testimonialIndex) {
        dot.style.background = 'var(--secondary-color)';
        dot.style.transform = 'scale(1.2)';
      } else {
        dot.style.background = 'rgba(255,107,0,0.3)';
        dot.style.transform = 'scale(1)';
      }
    });
  }
  
  // Override showTestimonial to update progress
  const originalShowTestimonial = showTestimonial;
  showTestimonial = function(idx) {
    originalShowTestimonial(idx);
    updateProgressDots();
  };
  
  // Initialize progress dots
  updateProgressDots();
}

// Initialize enhanced testimonials
if (testimonialCard) {
  enhanceTestimonials();
}

// Section scroll-in animation
const animatedSections = document.querySelectorAll('.animate-in-section');
if (animatedSections.length) {
  const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
          entry.target.classList.add('section-animate-in');
          } else {
          entry.target.classList.remove('section-animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );
  animatedSections.forEach(section => sectionObserver.observe(section));
  }

document.addEventListener('DOMContentLoaded', function () {
  function animateNumber(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    function update() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + '+';
        requestAnimationFrame(update);
      } else {
        element.textContent = target + '+';
      }
    }
    update();
  }

  const stats = [
    { selector: '.stat__number:nth-child(1)', target: 500 },
    { selector: '.stat__number:nth-child(2)', target: 50 },
    { selector: '.stat__number:nth-child(3)', target: 100 }
  ];

  // Instead, select all .stat__number elements in order
  const statElements = document.querySelectorAll('.header__stats .stat__number');
  const statTargets = [500, 50, 100];
  statElements.forEach((el, i) => {
    animateNumber(el, statTargets[i], 1500);
  });
});

// Hamburger menu functionality
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

if (navToggle && navLinks && navOverlay) {
  navToggle.addEventListener('click', function () {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    document.body.classList.toggle('nav-open');
  });
  navOverlay.addEventListener('click', function () {
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  });
  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}
