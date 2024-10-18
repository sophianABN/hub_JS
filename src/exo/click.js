document.addEventListener('DOMContentLoaded', function() {
    let title = document.querySelector('#title');
    let originalTitle = title.textContent;
    let isOriginal = true;

    title.addEventListener('click', () => {
        if (isOriginal) {
            title.textContent = 'GOOD JOB 🥳';
            title.style.color = 'red';
        } else {
            title.textContent = originalTitle;
            title.style.color = '';
        }
        isOriginal = !isOriginal;
    });
});
