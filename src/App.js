
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <ul>
          <li id="emailCheck">Email</li>
          <li id="passCheck">Password</li>
          <li id="domainCheck">Domain</li>
        </ul>
        <div className='contentBody'>
          <input id="lightEmailInput" type="text"></input>
          <button type="button" onClick={emailCheckLight}></button>
          <div id="testDiv"></div>
        </div>
      </div>
    </div>
  );
}

function emailCheckLight(){
  const email = document.getElementById("lightEmailInput").value
  fetch('https://api.xposedornot.com/v1/check-email/'+email).then((res) => {
    const {statusCode} = res
    const contentType = res.headers['content-type']
    let error;
    if (statusCode!==200){
      error = new Error('Request Failed')
    }
    console.log(res)
    const testDiv = document.getElementById('testDiv')
    for (var i in res['breaches']){
      testDiv.innerHTML += i
    }
    
  } )
}

export default App;
