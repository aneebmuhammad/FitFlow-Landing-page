 // Elements to animate on scroll
  const sections = document.querySelectorAll('section:not(.hero)');
  const workoutImage = document.querySelector('.workout-image');
  const workoutText = document.querySelector('.workout-text');
  const navbar = document.querySelector('.navbar');
  const listItems = document.querySelectorAll(".workout-list li");
  const scrollContainer = document.querySelector('.scroll-container');
  const teamMembers = document.querySelectorAll('.team-member');
  const planCards = document.querySelectorAll(".plan-card");
  const faqItems = document.querySelectorAll('.faq-item');
  const planContentCards = document.querySelectorAll('.plans-content .plan-card');
  const planImage = document.querySelector('.plan-image');
  const stats = document.querySelectorAll('.stat');
  const footerLogo = document.querySelector('.footer-logo p');
  const footerLinks = document.querySelector('.footer-links');
  const footerSocial = document.querySelector('.footer-social');
  const footerBottom = document.querySelector('.footer-bottom');
  const logoImg = document.querySelector('.logo-img');
  const footerLogoShape = document.querySelector('.footer-logo-shape');

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }

  // Scroll animation for sections
  function animateOnScroll() {
    // Navbar background on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      // Rotate logo when scrolling
      logoImg.classList.add('logo-rotate');
    } else {
      navbar.classList.remove('scrolled');
      logoImg.classList.remove('logo-rotate');
    }
    
    // Section animations
    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('visible');
      }
    });
    
    // Workout section specific animations
    if (isInViewport(workoutImage)) {
      workoutImage.classList.add('visible');
    }
    
    if (isInViewport(workoutText)) {
      workoutText.classList.add('visible');
    }
    
    // Team member animations
    teamMembers.forEach(member => {
      if (isInViewport(member)) {
        member.classList.add('visible');
      }
    });
    
    // Plan cards animation
    planCards.forEach(card => {
      if (isInViewport(card)) {
        card.classList.add('visible');
      }
    });
    
    // Plans content animation
    planContentCards.forEach(card => {
      if (isInViewport(card)) {
        card.classList.add('visible');
      }
    });
    
    // Plan image animation
    if (planImage && isInViewport(planImage)) {
      planImage.classList.add('visible');
    }
    
    // Stats animation
    stats.forEach(stat => {
      if (isInViewport(stat)) {
        stat.classList.add('visible');
      }
    });
    
    // Footer animations
    if (footerLogo && isInViewport(footerLogo)) {
      footerLogo.classList.add('visible');
      footerLinks.classList.add('visible');
      footerSocial.classList.add('visible');
      footerBottom.classList.add('visible');
      
      // Rotate footer logo shape when footer is in view
      footerLogoShape.classList.add('logo-rotate');
    }
    
    // Workout list items animation
    highlightActiveItem();
  }

  // Highlight active list item based on scroll
  function highlightActiveItem() {
    const containerRect = scrollContainer.getBoundingClientRect();
    const containerMiddle = containerRect.top + containerRect.height / 2;
    
    let closestItem = null;
    let closestDistance = Infinity;
    
    listItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemMiddle = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(itemMiddle - containerMiddle);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
      
      item.classList.remove('active');
    });
    
    if (closestItem) {
      closestItem.classList.add('active');
    }
  }

  // Custom scrolling for the list container
  let isScrolling = false;
  if (scrollContainer) {
    scrollContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (isScrolling) return;
      
      isScrolling = true;
      scrollContainer.scrollBy({
        top: e.deltaY * 0.5,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isScrolling = false;
        highlightActiveItem();
      }, 300);
    });
  }

  // FAQ Toggle
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Initialize animations
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Initial check on page load
  setTimeout(() => {
    animateOnScroll();
    highlightActiveItem();
  }, 500);