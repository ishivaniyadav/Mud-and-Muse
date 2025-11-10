document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
      }
  });
});

document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', () => {
      alert('Added to cart!');
  });
});

document.querySelectorAll('.product-item button').forEach(button => {
  button.addEventListener('click', () => {
      alert('Added to cart!');
  });
});

document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! We’ll get back to you soon.');
  this.reset(); 
});

const testimonials = document.querySelectorAll('.testimonial-item');
const uniqueTestimonials = new Set();
testimonials.forEach(item => {
  const content = item.innerText.trim();
  if (uniqueTestimonials.has(content)) {
      item.remove();
  } else {
      uniqueTestimonials.add(content);
  }
});
