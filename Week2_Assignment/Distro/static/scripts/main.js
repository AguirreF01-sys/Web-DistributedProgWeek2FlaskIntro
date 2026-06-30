    // The existing button in main.html calls runMain().
    Execute();
}

function Execute() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (!firstName || !lastName) {
        alert('Enter both a first name and a last name.');
        return;
    }

    const data = {
        firstName: firstName,
        lastName: lastName
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                responseData.error || 'The name could not be saved.'
            );
        }

        return responseData;
    })
    .then(responseData => {
        console.log('Success:', responseData);
        alert(responseData.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}

function GetLast() {
    const firstName = document.getElementById('name2').value.trim();
    const output = document.getElementById('last-name');

    if (!firstName) {
        output.innerText = 'Enter a first name.';
        return;
    }

    fetch(
        `/get_last_name?firstName=${encodeURIComponent(firstName)}`
    )
    .then(async response => {
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                responseData.error ||
                'The last name could not be found.'
            );
        }

        return responseData;
    })
    .then(responseData => {
        output.innerText = responseData.last_name;
    })
    .catch(error => {
        console.error('Error:', error);
        output.innerText = error.message;
    });
}