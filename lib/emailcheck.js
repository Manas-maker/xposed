export const emailCheck = (email) => { 
    const results = fetch(`https://api.xposedornot.com/v1/check-email/${email}`)
    .then((response) => response.json())
    .then((json) => { return json });
    console.log(results.breaches)
}
