const {token} = Qs.parse(location.search,{ignoreQueryPrefix:true})

document.getElementById('update').onclick = function(){
    location.href = `/updateUser?token=${token}`
}

document.getElementById('delete').onclick = function(){
    fetch(`/deleteUser?token=${token}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                alert(data.error)
                return location.href = `/`
            }
            alert(data.status)
            location.href = "/"
        })
    })
}

document.getElementById('logout').onclick = function(){
    fetch(`/logoutUser?token=${token}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                alert(data.error)
                if(data.error === "Please login first"){
                    return location.href = "/"
                }
                return location.href = `/myProfile?token=${token}`
            }
            alert(data.status)
            location.href = "/"
        })
    })
}

