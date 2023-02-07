let Form = document.getElementById("myform")
Form.addEventListener("submit" , submitForm)

let editKey = 2000 
function idForEdit(){
  editKey++ ; 
  return editKey
}

let deleteKey = 0 ;
function idForDelete(){
    deleteKey++ ; 
    return deleteKey
}

function submitForm(e){
    e.preventDefault() ; 
    idForEdit() ; 
    idForDelete() ;
    let User_Name = document.getElementById("name").value ;
    let User_Email = document.getElementById("email").value ; 
    let Appointment_Date = document.getElementById("date").value ;
    let payload = {Name : User_Name , Email : User_Email , Appointment_date : Appointment_Date}
    let stringPayload = document.createTextNode(JSON.stringify(payload))
    let ol = document.getElementById("ol") ; 
    let li = document.createElement("li") ; 
    let updatebutton = document.getElementById("updateBtn")
    let submitButton = document.getElementById("submitBtn")


    let editButton = document.createElement("button") ; 
    editButton.setAttribute("type" , "button") ;
     editButton.setAttribute("id" , editKey)
    editButton.innerText = "Edit" ; 

    let deleteButton = document.createElement("button") ; 
    deleteButton.setAttribute("type" , "button") ;
    deleteButton.setAttribute("id" , deleteKey)
    deleteButton.innerText = "X" ; 

    axios.post("https://crudcrud.com/api/555d36c52565470a8ef9337005c9253a/User" , payload)
    .then((res)=>{
        let idForLi = res.data._id ;
        li.setAttribute("id" , idForLi)
        li.appendChild(stringPayload)  ; 
        li.appendChild(editButton)
        li.appendChild(deleteButton)
        ol.appendChild(li)
        //console.log(res)
    }) 
    .catch((err)=>{console.log(err)})

    /*
    edit button functionality 
    1.edit button click-> remove from page & and add data to input field & enable update & disable-submit button
    2. update button click -> put api call , show updated appointment on page
    */
    let ParentLiId;
    let ParentLi
    editButton.addEventListener("click" , editFunction)
    function editFunction(){
        ParentLi = document.getElementById(this.id).parentElement ;
        ParentLiId = ParentLi.getAttribute("id") ;
        /*as edit button is clicked -1. get the data from server and fill the input field or 2. we can take the data from li element -
        convert it to obj and fill input field it will save a network call*/
        updatebutton.disabled = false ;
        submitButton.disabled = true ; 
         ol.removeChild(ParentLi) //remove  element from page
         document.getElementById("name").value = payload.Name
         document.getElementById("email").value = payload.Email
         document.getElementById("date").value = payload.Date

         updatebutton.addEventListener("click" , updateFunction)
    function updateFunction(){
       // console.log(ParentLi)
        let newName = document.getElementById("name").value
        let newDate = document.getElementById("date").value
        let newEmail = document.getElementById("email").value
        let newPayload = {Name : newName , Email : newEmail , Appointment_date : newDate} 
        let stringNewPaylaod = document.createTextNode(JSON.stringify(newPayload)) 
        console.log(stringNewPaylaod)
        console.log(stringPayload)
        ParentLi.replaceChild(stringNewPaylaod , stringPayload)
        ol.appendChild(ParentLi); 
        axios.put(`https://crudcrud.com/api/555d36c52565470a8ef9337005c9253a/User/${ParentLiId}` , newPayload)
        .then((res)=>{
            console.log(res.data)
            document.getElementById("updateBtn").disabled = true ; 
            document.getElementById("submitBtn").disabled = false ;
         })
         .catch((err)=>{console.log(err)})
        console.log(ParentLi)
        Form.reset();
        
        //location.reload()
    } 
    }

    deleteButton.addEventListener("click" , deleteFunction);
     function deleteFunction(){
        let ParentLi = document.getElementById(this.id).parentElement 
        let ParentLiId = ParentLi.getAttribute("id")
        document.getElementById("ol").removeChild(ParentLi)
        axios.delete(`https://crudcrud.com/api/555d36c52565470a8ef9337005c9253a/User/${ParentLiId}`)
        .then(()=>{alert("Appointmen removed")})
        .catch((err)=>{console.log(err)})
     }


    Form.reset()  //clear input field after submission of form

    window.addEventListener("DOMContentLoaded" , ()=>{
        axios.get("https://crudcrud.com/api/555d36c52565470a8ef9337005c9253a/User")
        .then((res)=>{
            let data = res.data ; 
            
            for(let i = 0 ; i<data.length ; i++){
                let ol = document.getElementById("ol")
                let li = document.createElement("li")
                li.innerText = JSON.stringify(data[i])
                ol.appendChild(li)
            }
            console.log(data)
        })
    })
}


// if(location.reload){
//     //alert("vimal")
//     axios.get("https://crudcrud.com/api/555d36c52565470a8ef9337005c9253a/User")
//     .then((res)=>{
//         let text = ""
//         res.data.forEach((app)=>{
//             text += {Name : app.Name , Email : app.Email , Appointment_date : app.Date}
//             document.getElementById("ol").innerHTML = text ;
//         })
       
//     })
// }

window.addEventListener("DOMContentLoaded" , ()=>{
    axios.get("https://crudcrud.com/api/555d36c52565470a8ef9337005c9253a/User")
    .then((res)=>{
        let data = res.data ; 
        
        for(let i = 0 ; i<data.length ; i++){
            let ol = document.getElementById("ol")
            let li = document.createElement("li")
            li.innerText = JSON.stringify(data[i])
            ol.appendChild(li)
        }
        console.log(data)
    })
})