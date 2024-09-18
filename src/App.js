
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <ul id="headerItems">
          <li id="emailCheck">Email</li>
          <li id="passCheck">Password</li>
          <li id="domainCheck">Domain</li>
        </ul>
        <div className='contentBody'>
          <input id="lightEmailInput" type="email"></input>
          <button type="button" onClick={emailCheckLight}>Light</button>
          <button type="button" onClick={emailCheckHard}>Hard</button>
          <div id="testDiv"></div>
        </div>
      </div>
    </div>
  );
}

function emailCheckLight(){
  const email = document.getElementById("lightEmailInput").value
  console.log(process.env.REACT_APP_XPOSED_KEY)
  console.log(process.env)
  axios('https://api.xposedornot.com/v1/check-email/'+email).then((res) => {
    const {statusCode} = res
    const contentType = res.headers['content-type']
    let error;
    if (statusCode!==200){
      error = new Error('Request Failed')
    }
    console.log(res)
    var c  = 0
    const testDiv = document.getElementById('testDiv')
    testDiv.innerHTML = ''
    for (var i in res.data.breaches[0]){
      var lt = res.data.breaches[0][i]
      const li = document.createElement('li')
      li.className = 'breachedEmailListing'
      li.id = c
      li.innerHTML = lt
      c++
      testDiv.appendChild(li)
    }
  })
}

function emailCheckHard() {
  const email = document.getElementById('lightEmailInput').value
  axios('https://api.xposedornot.com/v1/breach-analytics?email='+email).then((res) => {
    const {statusCode} = res
    const contentType = res.headers['content-type']
    let error;
    if (statusCode!==200){
      error = new Error('Request Failed')
    }
   
    function renderData(data,parentLi){
      for (var key in data){
          const subdiv = document.createElement('div')
          subdiv.className = "MainData"
          subdiv.id = key
          subdiv.innerHTML = key
          parentLi.appendChild(subdiv)
      }

      Object.keys(data).forEach(key => {
        if (data[key] === null || data[key] === undefined) {
          // Ignore null or undefined values
          return;
        }

        if (Array.isArray(data[key])) {
          if (data[key].length === 0) {
            // Ignore empty arrays
            return; 
          }
          data[key].forEach((item, index) => {
            const subLi = document.createElement('li')
            subLi.className = index
            subLi.id = index
            subLi.innerHTML = JSON.stringify(item)
            subdiv.appendChild(subLi)
          })
        }
        
      })
  }

    const testDiv = document.getElementById('testDiv')
    renderData(res.data, testDiv)
  })
}

export default App;
