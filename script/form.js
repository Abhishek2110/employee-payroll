document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('blur', function() {
        const name = this.value.trim();
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        
        if (!nameRegex.test(name)) {
            alert('Name is incorrect. Please enter at least 3 alphabetical characters.');
        }
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    if (userId) {
        fetchUserDetails(userId);
    }

    document.getElementById("clear").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("Employee-Payroll").reset();
    });

    document.getElementById("cancel").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "../pages/dashboard.html";
    });
});

function fetchUserDetails(userId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const user = JSON.parse(xhr.responseText);
                console.log(user);
                populateFormFields(user);
            }
            else {
                console.error('Error fetching user details:', xhr.status);
            }
        }
    };
    xhr.open('GET', `http://localhost:3000/user/?id=${userId}`, true);
    xhr.send();
}

function populateFormFields(user) {
    const userData = user[0];
    document.getElementById("name").value = userData.Name;
    document.getElementById("notes").value = userData.Notes;
    document.getElementById("salary").value = userData.Salary;
    document.getElementById(userData.Gender.toLowerCase()).checked = true;
    userData.Department.forEach(dept => {
        document.getElementById(dept.toLowerCase()).checked = true;
    });
    document.getElementById(userData.Profile).checked = true;
    const [day, month, year] = userData.Start_Date.split('/');
    document.getElementById("day").value = day;
    document.getElementById("month").value = month;
    document.getElementById("year").value = year;
    document.getElementById('submit').innerText = 'Update';
}

function register_employee() {
    let name = document.getElementById("name").value;
    let notes = document.getElementById("notes").value;
    let date = getDate();
    let salary = document.getElementById("salary").value;
    let profile = getProfile();
    
    let hr = document.getElementById("hr").checked;
    let sales = document.getElementById("sales").checked;
    let finance = document.getElementById("finance").checked;
    let engineer = document.getElementById("engineer").checked;
    let others = document.getElementById("others").checked;
    
    const obj = {
        Name: name,
        Notes: notes,
        Gender: getGender(),
        Department: [],
        Salary: salary,
        Start_Date: date,
        Profile: profile
    }
    
    let dept_values = []
    if (hr){
        dept_values.push("HR")
    }
    if (sales){
        dept_values.push("Sales")
    }
    if (finance){
        dept_values.push("Finance")
    }
    if (engineer){
        dept_values.push("Engineer")
    }
    if (others){
        dept_values.push("Others")
    }
    obj.Department = dept_values;

    if (document.getElementById('submit').innerText === 'Update') {
        const userId = getUserIdFromUrl();
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/user/${userId}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(obj));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    window.location.href = '../pages/dashboard.html';
                    alert("Data Updated Successfully!"); 
                    console.log(xhr.status);
                } else {
                    console.error('Error updating user details:', xhr.status);
                }
            }
        };
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/user');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(obj));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201) {
                    console.log('Data added successfully:', xhr.responseText);
                    console.log(xhr.status);
                    alert("Form Submitted Successfully!");
                    document.getElementById("Employee-Payroll").reset();
                } else {
                    console.error('Error adding user:', xhr.status);
                }
            }
        };
    }
}

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getDate() {
    let day = document.getElementById("day").value;
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    return `${day}/${month}/${year}`;
}

function getGender() {
    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;
    if (male){
        return "Male";
    }
    else if (female){
        return "Female";
    }
    else{
        return "";
    }
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
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'update') {
        event.preventDefault();
        register_employee();
        document.getElementById("Employee-Payroll").reset();
        alert("Data Updated Successfully!");
    }
});