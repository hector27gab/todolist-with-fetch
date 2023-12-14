const endpoint = "http...";

const creeateToDo = async() => {
    const response = await fetch('endpoint', {
        method: 'PUT', 
        body: JSON.stringify([]),
        headers: {'Content-Type': 'application/json',
    }
    });
}