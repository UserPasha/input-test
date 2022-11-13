const form = document.querySelector('form');
const action = form.action

const dataCollection = (currentForm) => {
    const data = new FormData(currentForm);
    
    return data;
   
}

const options = (currentForm) => {
    return {
        method: 'post',
        body: dataCollection(currentForm),
    };
}

const sendForm = (currentForm) => {
    return fetch(action, options(currentForm));
}

const showMessage = (data) => {
    alert(data.message)
}
const onSuccess = (res) => {
    return res.json().then(showMessage)
}

const onError = (data) => {
    console.error(data);
}

const onSubmit = (e) => {
    e.preventDefault()
    sendForm(e.currentTarget)
        .then(response => onSuccess(response, currentTarget))
        .catch(onError);
}

form.addEventListener('submit', onSubmit);