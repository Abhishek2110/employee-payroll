document.getElementById("add-button").addEventListener("click", function() {
    window.location.href = "../pages/form.html";
});

document.addEventListener('DOMContentLoaded', function() {
    
    var searchInput = document.getElementById('search-button');
    searchInput.addEventListener('input', function() {
        var searchText = this.value.trim().toLowerCase(); 
        var rows = document.querySelectorAll('#user-table tbody tr'); 

        rows.forEach(function(row) {
            var displayRow = false; 

            row.querySelectorAll('td').forEach(function(cell) {
                if (cell.textContent.toLowerCase().includes(searchText)) {
                    displayRow = true; 
                }
            });

            if (displayRow) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var userData = document.getElementById('user-table');
                var data = JSON.parse(xhr.responseText);
                
                data.forEach(function(user) {
                    var newRow = createTableRow(user); 
                    userData.appendChild(newRow); 
                });

                document.querySelectorAll('.edit').forEach(button => {
                    button.addEventListener('click', function() {
                        const row = this.closest('tr');
                        const userId = row.dataset.userId;
                        window.location.href = `../pages/form.html?id=${userId}`;
                    });
                });
                
                var deleteButtons = document.querySelectorAll('.delete');
                deleteButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        var row = this.closest('tr'); 
                        var userId = row.dataset.userId; 
                        var confirmed = window.confirm("Are you sure you want to delete this user?");
                        if (confirmed) {
                            deleteUser(userId, row); 
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
    row.classList.add('user-row'); 
    row.dataset.userId = user.id; 

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

    let departmentSpans = '';
    if (Array.isArray(user.Department)) {
        user.Department.forEach(dept => {
            departmentSpans += `<span class="dept">${dept}</span>`;
        });
    } else {
        departmentSpans = `<span class="dept">${user.Department}</span>`;
    }

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
                row.remove();
            } else {
                console.error('Error deleting user:', xhr.status);
            }
        }
    };
    
    xhr.open('DELETE', 'http://localhost:3000/user/' + userId, true);
    xhr.send();
}