import './style/styles.css'
import './style/styles.scss'
import image from "./assets/imges/blue-drops-bg.jpg"
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
const form = document.querySelector('form');
const input = document.getElementById("number")
const wrapper = document.getElementById('wrapper')
wrapper.style.backgroundImage = `url(${image})`



const action = 'https://smtp-ser-ver-for.herokuapp.com/sendTest'


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