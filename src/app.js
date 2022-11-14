import './style/styles.css'
import './style/styles.scss'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const form = document.querySelector('form');
const input = document.getElementById("number")


const action = 'https://smtp-ser-ver-for.herokuapp.com/sendMessage'


const showMessage = (data) => {
    alert(data.message)
}
const onSuccess = (res) => {
    return res.json().then(showMessage)
}

const onError = (data) => {
    console.error(data);
}

const onSubmit =  (e) => {
    e.preventDefault()
    const payload = {
        data:{
            Email: 'test@mail',
            Name: 'Name',
            Message: input.value
        }
    };
    fetch(action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify( payload )
    })
        .then(response => onSuccess(response))
        .catch(onError)

}

form.addEventListener('submit', onSubmit);