document.getElementById("submitBtn").addEventListener("click" , submitForm);
let keyValue = 0 ;
let idValue = 1000 ;
let liId = 2000 ; 

function submitForm(e){
    e.preventDefault();
    getKey()
    getid() 
    idForLi()
     

    //get the data entered by the user
    let username = document.getElementById("name").value ; 
    let useremail = document.getElementById("email").value ; 
    let userdate = document.getElementById("date").value ;

    //convert the data into object format 
    let myObj = {userName:username , userEmail :useremail , appointmentDate:userdate }

    //convert obj to string to store in local storage
    let myObjString = JSON.stringify(myObj) ; 
    
    //get key value for saving the data in local storage
    
    function getKey(){
        keyValue++ ; 
        return keyValue
    }

    //save data to local storage
    localStorage.setItem(liId,myObjString)

    //as user submitted the form - display details on page - 1.create button/li/append to ol 
    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("id" , keyValue)
    deleteBtn.setAttribute("type", "button")
    deleteBtn.appendChild(document.createTextNode("Delete"))
    
     //function for unique id for each edit button
     function getid(){
        idValue++ ; 
        return idValue
     }
    let editBtn = document.createElement("button")
    editBtn.setAttribute("id" , idValue)
    editBtn.setAttribute("type", "button")
    editBtn.appendChild(document.createTextNode("Edit"))
    


    //create li element - append it to ol
    function idForLi(){
        liId++ ; 
        return liId ;
    }
    let listItem = document.createElement("li")
    listItem.setAttribute("id" , liId)
    listItem.appendChild(document.createTextNode(myObjString))
    listItem.appendChild(editBtn)
    listItem.appendChild(deleteBtn)
    
    //append task
    document.getElementById("ol").appendChild(listItem)

    


   editBtn.addEventListener("click" , function (){
    
    let ol = document.getElementById("ol")
    let editbutton = document.getElementById(this.id).parentElement
    let edittext = localStorage.getItem(document.getElementById(this.id).parentElement.id)
    edittext = JSON.parse(edittext) ; 
    document.getElementById("name").value = edittext.userName
    document.getElementById("email").value = edittext.userEmail
    document.getElementById("date").value = edittext.appointmentDate
    localStorage.removeItem(document.getElementById(this.id).parentElement.id)
    ol.removeChild(editbutton)
   })

   deleteBtn.addEventListener("click" , function (){
    let ol = document.getElementById("ol")
    let deletebutton = document.getElementById(this.id).parentElement
    localStorage.removeItem(document.getElementById(this.id).parentElement.id)
    ol.removeChild(deletebutton)
    console.log("delete clicked")
   })


   document.getElementById("myform").reset()
}
