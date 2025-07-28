 
        // Form validation and interaction
        const form = document.getElementById('jobApplicationForm');
        const progressFill = document.getElementById('progressFill');
        const successMessage = document.getElementById('successMessage');
        const fileUpload = document.querySelector('.file-upload input');
        const fileLabel = document.querySelector('.file-upload-label span');

        // Update progress bar based on filled fields
        function updateProgress() {
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            const filled = Array.from(inputs).filter(input => {
                if (input.type === 'file') {
                    return input.files.length > 0;
                }
                return input.value.trim() !== '';
            });
            
            const progress = (filled.length / inputs.length) * 100;
            progressFill.style.width = progress + '%';
        }

        // File upload handling
        fileUpload.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                fileLabel.innerHTML = `<i class="fas fa-file-alt"></i> ${fileName}`;
                fileLabel.parentElement.style.background = 'linear-gradient(135deg, #a8edea, #fed6e3)';
                fileLabel.parentElement.style.borderColor = '#a8edea';
                fileLabel.parentElement.style.color = '#2c3e50';
            }
            updateProgress();
        });

        // Real-time progress update
        form.addEventListener('input', updateProgress);
        form.addEventListener('change', updateProgress);

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                document.querySelector('.progress-bar').style.display = 'none';
            }, 2000);
        });

        // Initialize progress
        updateProgress();

        // Floating label enhancement
        document.querySelectorAll('.floating-label input, .floating-label select, .floating-label textarea').forEach(element => {
            element.addEventListener('blur', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });

        // Add some micro-interactions
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(element => {
            element.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            element.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    