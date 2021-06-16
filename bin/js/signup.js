const signupForm = document.querySelector('#signup-form')
const Name = document.querySelector('#name')
const Email = document.querySelector('#email')
const Phone = document.querySelector('#phone')
const Password = document.querySelector('#password')
const Age = document.querySelector('#age')

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/createUser?name=${Name.value}&email=${Email.value}&password=${Password.value}&age=${Age.value}&phone=${Phone.value}`).then((response)=>{
        response.json().then((data)=>{
            const status = data.status
            alert(status)
            location.href = `/myProfile?&token=${data.token}`
        })
    })

})