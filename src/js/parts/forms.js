"use strict"

const url = 'https://rabota-gorod.ru/wp-content/themes/blank-sheet/assets/files/curl.php';
const formMsgs = document.querySelector('.form-msgs');

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form')

    if (forms.length) {
        forms.forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                let error = validateForm(form)
                let formData = new FormData(form);

                if (error === 0) {
                    form.classList.add('_sending');

                    let response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        sentMessage(form)
                        form.reset();
                        form.classList.remove('_sending');

                        setTimeout(() => {
                            resetForm(form)
                        }, 5000);
                    }
                    else {
                        failMessage(form)
                        form.classList.remove('_sending');

                        setTimeout(() => {
                            resetForm(form)
                        }, 5000);
                    }
                }
                else {
                    fillAllFields(form)

                    form.classList.remove('_sending');
                    setTimeout(() => {
                        resetForm(form)
                    }, 5000);
                }
            })
        })
    }

    function validateForm(form) {
        let error = 0;
        const formReq = [...form.querySelectorAll('[data-required] input')].concat([...form.querySelectorAll('[data-required] textarea')])
        console.log(formReq);

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]

            formRemoveError(input);
            validateInput()

            input.addEventListener('input', function () {
                formRemoveError(input);
                validateInput()
                resetForm(form)
            })

            function validateInput() {
                if (input.getAttribute('type') === 'email') {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                }
                if (input.getAttribute('type') === 'checkbox') {
                    if (!input.checked) {
                        formAddError(input);
                        error++;
                    }
                }
                else {
                    if (input.getAttribute('name') === 'phone') {
                        if (/[_]/.test(input.value) || input.value.length < 18) {
                            formAddError(input);
                            error++;
                        }
                    }
                    else {
                        if (input.value.length < 2) {
                            formAddError(input);
                            error++;
                        }
                    }
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.closest('.form__input').classList.add('_error');
    }

    function formRemoveError(input) {
        input.closest('.form__input').classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function sentMessage() {
        formMsgs.classList.remove('_error');
        formMsgs.classList.remove('_req');

        formMsgs.classList.add('_sent');
        setTimeout(() => {
            formMsgs.classList.remove('_sent');
        }, 3000);
    }

    function failMessage() {
        formMsgs.classList.remove('_sent');
        formMsgs.classList.remove('_req');

        formMsgs.classList.add('_error');
        setTimeout(() => {
            formMsgs.classList.remove('_error');
        }, 3000);
    }

    function fillAllFields() {
        formMsgs.classList.remove('_sent');
        formMsgs.classList.remove('_error');

        formMsgs.classList.add('_req');
        setTimeout(() => {
            formMsgs.classList.remove('_req');
        }, 3000);
    }

    function resetForm(form) {
    }
});