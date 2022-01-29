// Form elements
const form = document.getElementById('survey-form');
const formPages = document.querySelectorAll('.form__page');

// Buttons
const nextBtn = document.querySelector('.form__btn--next');
const prevBtn = document.querySelector('.form__btn--previous');
const submitBtn = document.querySelector('.form__btn--submit');

const progressBar = document.querySelector('.progress__bar');
const progressChange = Math.ceil(100 / (formPages.length - 1));

let currPage = 0;
let progress = 0;


// Change the current form page
function changePage(btn) {
    formPages[currPage].className = 'form__page';

    if (btn === 'next') {
        if (currPage === 1) togglePrevBtn();
        if (currPage === formPages.length - 1) toggleSubmitBtn();
        progress += progressChange;
        formPages[currPage - 1].classList.add('hidden');
        formPages[currPage].classList.add('slide-in-right');
    }

    if (btn === 'prev') {
        if (currPage === 0) togglePrevBtn();
        if (currPage === formPages.length - 2) toggleSubmitBtn();
        progress -= progressChange;
        formPages[currPage + 1].classList.add('hidden');
        formPages[currPage].classList.add('slide-in-left');
    }
    updateProgressBar();
}

// Show or hide Previous button
function togglePrevBtn() {
    prevBtn.classList.toggle('hidden');
}

// Show or hide Submit button
function toggleSubmitBtn() {
    nextBtn.classList.toggle('hidden');
    submitBtn.classList.toggle('hidden');
}

// Update the progress bar
function updateProgressBar() {
    progressBar.style.width = `${progress}%`;
}

// Check required fields on current page
function checkRequired(page) {
    const requiredFields = page.querySelectorAll('input[required], select[required]');
    const errorMsg = page.querySelectorAll('.form__error-msg');
    let errors = 0;

    for (const [i, input] of requiredFields.entries()) {
        if (input.value === '') {
            displayErrorMsg(errorMsg[i]);
            errors++;
        } else {
            clearErrorMsg(errorMsg[i]);
        }
    }
    return errors;
}

// Show error messages
function displayErrorMsg(field) {
    field.style.display = 'block';
    field.textContent = '* This field is required!';
}

// Hide error messages
function clearErrorMsg(field) {
    field.style.display = 'none';
    field.textContent = '';
}

// Next button event listener
nextBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (checkRequired(formPages[currPage]) === 0) {
        currPage++;
        changePage('next');
    }
});

// Previous button event listener
prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    currPage--;

    changePage('prev');
});

// Form submit event listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
});