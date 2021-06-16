const loginForm = document.querySelector('#login-form')
const Email = document.querySelector('#email')
const Password = document.querySelector('#password')

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    fetch(`/loginUser?email=${Email.value}&password=${Password.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                location.href('/')
                alert(data.error)
            }
            location.href = `/myProfile?token=${data.token}`
        })
    })
})