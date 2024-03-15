document.getElementById("add-button").addEventListener("click", function() {
    window.location.href = "../pages/form.html";
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            const userData = document.getElementById('user-table');
            const sampleRow = userData.querySelector('tr'); // Get a sample row for cloning
            data.forEach(user => {
                const row = sampleRow.cloneNode(true); // Clone the sample row
                row.querySelector('td:nth-child(1)').textContent = user.name; // Fill in user data
                row.querySelector('td:nth-child(2)').textContent = user.gender;
                row.querySelector('td:nth-child(3)').textContent = user.Departments;
                row.querySelector('td:nth-child(4)').textContent = user.Salary;
                row.querySelector('td:nth-child(5)').textContent = user.StartDate;
                userData.appendChild(row); // Append the modified row
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
