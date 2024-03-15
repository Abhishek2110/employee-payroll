document.getElementById("add-button").addEventListener("click", function() {
    window.location.href = "../pages/form.html";
});

document.addEventListener('DOMContentLoaded', function() {
    
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var userData = document.getElementById('user-table');
                var data = JSON.parse(xhr.responseText);
                
                data.forEach(function(user) {
                    var newRow = createTableRow(user); // Create a new row for each user
                    userData.appendChild(newRow); // Append the new row to the table
                });

                // Add event listeners for delete buttons
                var deleteButtons = document.querySelectorAll('.delete');
                deleteButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        var row = this.closest('tr'); // Find the closest row
                        var userId = row.dataset.userId; // Extract the user ID or any unique identifier
                        var confirmed = window.confirm("Are you sure you want to delete this user?");
                        if (confirmed) {
                            deleteUser(userId, row); // Call the function to delete the user
                        }
                    });
                });
            } else {
                console.error('Error fetching data:', xhr.status);
            }
        }
    };
    
    xhr.open('GET', 'http://localhost:3000/user', true);
    xhr.send();
});

function createTableRow(user) {
    const row = document.createElement('tr');
    row.classList.add('user-row'); // Add a class to the row
    row.dataset.userId = user.id; // Assign user ID to dataset

    // Determine the image source based on user profile
    let src;
    if (user.Profile == "pic1"){
        src = "../assets/option 1.jpg";
    } else if (user.Profile == "pic2"){
        src = "../assets/option 2.jpg";
    } else if (user.Profile == "pic3"){
        src = "../assets/option 3.jpg";
    } else {
        src = "../assets/option 4.jpg";
    }

    // Check if user.Department is an array
    let departmentSpans = '';
    if (Array.isArray(user.Department)) {
        // Create department spans
        user.Department.forEach(dept => {
            departmentSpans += `<span class="dept">${dept}</span>`;
        });
    } else {
        // If user.Department is not an array, just use it as a single department
        departmentSpans = `<span class="dept">${user.Department}</span>`;
    }

    // Fill in the cells with user data
    row.innerHTML = `
        <td><img src="${src}" alt="404" class="profile-pic" id="opt1"></td>
        <td><span class="employee-name">${user.Name}</span></td>
        <td>${user.Gender}</td>
        <td class="dept">${departmentSpans}</td>
        <td>&#8377; ${user.Salary}</td>
        <td>${user.Start_Date}</td>
        <td><button class="delete"><i style="font-size:20px" class="material-icons">&#xe872;</i></button><button class="edit"><i style="font-size:17px" class="fa">&#xf044;</i></button></td>
    `;

    return row;
}

function deleteUser(userId, row) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Remove the row from the table
                row.remove();
            } else {
                console.error('Error deleting user:', xhr.status);
            }
        }
    };
    
    xhr.open('DELETE', 'http://localhost:3000/user/' + userId, true);
    xhr.send();
}