document.getElementById("add-button").addEventListener("click", function() {
    window.location.href = "../pages/form.html";
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            const userData = document.getElementById('user-table');
            data.forEach(user => {
                const newRow = createTableRow(user); // Create a new row for each user
                userData.appendChild(newRow); // Append the new row to the table
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function createTableRow(user) {
    const row = document.createElement('tr');

    // Fill in the cells with user data
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.gender}</td>
        <td>${user.Departments}</td>
        <td>${user.Salary}</td>
        <td>${user.StartDate}</td>
        <td>
            <button class="delete"><i class="material-icons">&#xe872;</i></button>
            <button class="edit"><i class="fa">&#xf044;</i></button>
        </td>
    `;

    return row;
}
