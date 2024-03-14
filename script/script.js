document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    
    nameInput.addEventListener('blur', function() {
        const name = this.value.trim();
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        
        if (!nameRegex.test(name)) {
            alert('Name is incorrect. Please enter at least 3 alphabetical characters.');
        }
    });
});

function register_employee() {
    let name = document.getElementById("name").value;
    let notes = document.getElementById("notes").value;
    let date = getDate(); // Call a function to get the selected date
    let gender = getGender(); // Call a function to get the selected gender
    let salary = document.getElementById("salary").value;
    let profile = getProfile(); // Call a function to get the selected profile
    
    let dept1 = document.getElementById("dept1").checked;
    let dept2 = document.getElementById("dept2").checked;
    let dept3 = document.getElementById("dept3").checked;
    let dept4 = document.getElementById("dept4").checked;
    let dept5 = document.getElementById("dept5").checked;
    
    const obj = {
        Name: name,
        Notes: notes,
        Gender: gender ? "male" : "female",
        Department: [],
        Salary: salary,
        Start_Date: date,
        Profile: profile
    }
    
    let dept_values = []
    if (dept1){
        dept_values.push("HR")
    }
    if (dept2){
        dept_values.push("Sales")
    }
    if (dept3){
        dept_values.push("Finance")
    }
    if (dept4){
        dept_values.push("Engineer")
    }
    if (dept5){
        dept_values.push("Others")
    }
    obj.Department = dept_values;
    console.log(obj);
}

function getDate() {
    let day = document.getElementById("day").value;
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    return `${day}/${month}/${year}`;
}

function getGender() {
    let male = document.getElementById("male").checked;
    let female = document.getElementById("Female").checked;
    return male ? "male" : (female ? "female" : "");
}

function getProfile() {
    let radios = document.getElementsByName("profile-pic");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].id;
        }
    }
    return "";
}

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    register_employee();
    document.getElementById("Employee-Payroll").reset();
    alert("Form Submitted Successfully!");
});