let submit = document.addEventListener('submit' , booking);




function booking(e){
   e.preventDefault();  //to prevent default refreshing of the page when form is submitted
    
        let pName = document.getElementById('name-text').value;
        let pEmail = document.getElementById('email-text').value;   //to get value entered by patient
        let pContact = document.getElementById('contact-text').value;
        let pAppDate = document.getElementById('date-text').value;
        let pAppTime = document.getElementById('time-text').value;
        let PatientList =  document.getElementById('list');
   

    let patient = {Name : pName , Email : pEmail , Contact : pContact , AppDate : pAppDate , AppTime : pAppTime};
    localStorage.setItem( pEmail , JSON.stringify(patient)); //local storage can store only string so convert obj to str

    // in local storage , the patient details are saved in a string format ,  so first we have to convert it to object after that we can display it on the page
    let patientStr = JSON.parse(localStorage.getItem(pEmail));  
    
   
    let newPatient = document.createElement('li');
    let patientDetails = document.createTextNode(pName + " " + pEmail + " " + pContact + " " + pAppDate + " " + pAppTime);
    newPatient.appendChild(patientDetails);
    PatientList.appendChild(newPatient);

    // now we will add edit and delete buttons
    let editButton = document.createElement('button');   //create edit button with some class
    editButton.className = 'edit';
    editButton.setAttribute('type' , 'button'); //to prevent it from working as a submit button
    editButton.appendChild(document.createTextNode('Edit'));  //edit button text

    function deleteItem(){

        
        console.log('delete button executed');
    }

    let deleteButton = document.createElement('button');  //create delete button with class
    //deleteButton.className = 'delete';
    //deleteButton.setAttribute('type' , 'button') //before setting this attribute ,  when i clicked on delete button it was working as submit form button , so if u click delete it would append the li element
    //deleteButton.setAttribute("onclick" , "deleteItem()");

    deleteButton.appendChild(document.createTextNode('Delete'));
    

    // now add this button to the li element so that it will be displayed on the page
    newPatient.appendChild(editButton);
    newPatient.appendChild(deleteButton);

    

    
    

    //now add functionality for edit and delete button

    //for delete button
    deleteButton.addEventListener("click" , deleteItem);
    function deleteItem(e){
        e.preventDefault();
        PatientList.removeChild(e.target.parentElement);
    }

    //for edit button 
    editButton.addEventListener('click' , editItem);
    function editItem(e){
        e.preventDefault();
        document.getElementById('name-text').value = patient.Name ;
        document.getElementById('email-text').value = patient.Email ;
        document.getElementById('contact-text').value = patient.Contact;
        document.getElementById('date-text').value = patient.AppDate ; 
        document.getElementById('time-text').value = patient.AppTime ; 
        PatientList.removeChild(e.target.parentElement)
    }
    
   




}


