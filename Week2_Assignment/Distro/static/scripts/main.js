function runMain() {
    var first_name = document.getElementById("firstName").value
    var last_name = document.getElementById("lastName").value
    console.log(first_name)
    console.log(last_name)
    var my_json = `{"firstName": "${first_name}", "lastName": "${last_name}"}`;
    console.log(my_json)
}

function Execute() {
    var name = document.getElementById('name').value;
    console.log('Name:', name);

    // Create the JSON data
    var data = {name: name};

    // Send a POST request to the Flask route
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function GetLast() {
    fetch('/get_last_name')
        .then(response => response.json())
        .then(data => {
                document.getElementById('last-name').innerText = data.last_name
            }
        )
        .catch((error) => {
            console.error('Error:', error);
        });

}