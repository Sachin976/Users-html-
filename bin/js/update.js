const {token} = Qs.parse(location.search,{ignoreQueryPrefix:true})
const signupForm = document.querySelector('#update-form')
const Name = document.querySelector('#name')
const Email = document.querySelector('#email')
const Phone = document.querySelector('#phone')
const Password = document.querySelector('#password')
const Birthdate = document.querySelector('#b-day')

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(`/updateUserData?token=${token}&name=${Name.value}&email=${Email.value}&password=${Password.value}&birthDate=${Birthdate.value}&phone=${Phone.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                alert('Some error occured')
                location.href = `/myProfile?token=${token}`
            }
            const status = data.status
            alert(status)
            location.href = `/myProfile?token=${token}`
        })
    })

})