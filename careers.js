// Open modal with position
function openApplicationModal(button) {
  const position = button.getAttribute('data-position') || 'Open Position';
  document.getElementById('positionInput').value = position;
  document.getElementById('modalPositionText').textContent = 'Applying for: ' + position;
  document.getElementById('applicationModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeApplicationModal() {
  document.getElementById('applicationModal').classList.remove('active');
  document.body.style.overflow = '';
}

// File upload handling
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('resume');
  const fileName = document.getElementById('fileName');
  
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (file.size > maxSize) {
          showErrorMessage(
            'File Too Large',
            'Please upload a file smaller than 5MB.'
          );
          fileInput.value = '';
          fileName.classList.remove('active');
          return;
        }
        
        fileName.textContent = `✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`;
        fileName.classList.add('active');
      }
    });
  }
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('applicationForm');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('span');
      const originalText = btnText.textContent;
      
      // Check internet connection
      if (!navigator.onLine) {
        showErrorMessage(
          'No Internet Connection',
          'Please check your internet connection and try again.'
        );
        return;
      }
      
      // Validate file
      const fileInput = document.getElementById('resume');
      if (!fileInput.files || !fileInput.files[0]) {
        showErrorMessage(
          'Resume Required',
          'Please upload your resume/CV before submitting.'
        );
        return;
      }
      
      // Disable button and show loading
      submitBtn.disabled = true;
      btnText.textContent = 'Submitting...';
      
      try {
        const formData = new FormData(form);
        
        // Submit to FormSubmit with file
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        // Reset button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        if (response.ok) {
          // Success!
          closeApplicationModal();
          showSuccessMessage();
          
          // Reset form
          form.reset();
          document.getElementById('fileName').classList.remove('active');
        } else {
          throw new Error('Submission failed');
        }
        
      } catch (error) {
        console.error('Form error:', error);
        
        // Reset button
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // Show error
        showErrorMessage(
          'Submission Failed',
          'There was an error submitting your application. Please try again or email your resume to careers@nxsys.com'
        );
      }
    });
  }
});

// Success and Error functions
function showSuccessMessage() {
  document.getElementById('successOverlay').classList.add('show');
  setTimeout(() => closeSuccessMessage(), 7000);
}

function closeSuccessMessage() {
  document.getElementById('successOverlay').classList.remove('show');
}

function showErrorMessage(title, message) {
  document.getElementById('errorTitle').textContent = title;
  document.getElementById('errorText').textContent = message;
  document.getElementById('errorOverlay').classList.add('show');
}

function closeErrorMessage() {
  document.getElementById('errorOverlay').classList.remove('show');
}

// Close modal on background click
document.addEventListener('click', function(e) {
  if (e.target.id === 'applicationModal') {
    closeApplicationModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeApplicationModal();
    closeSuccessMessage();
    closeErrorMessage();
  }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}