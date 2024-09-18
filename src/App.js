
import './App.css';
import axios from 'axios';
import { useState } from 'react';


function App() {
  var currentPage = 0;
  const [chartData, setChartData] = useState(null); // State to store the breach data


  return (
    <div className="App">
      <div className="Header">
        <ul id="headerItems">
          <li id="emailCheck" onClick={clickHandler}>Email</li>
          <li id="passCheck" onClick={clickHandler}>Password</li>
          <li id="domainCheck" onClick={clickHandler}>Domain</li>
        </ul>
        <div id='contentBodyEmail'>
        <p id="question">Are you Xposed?</p>
          <input id="lightEmailInput" type="email" placeholder="Enter Mail Address"></input><br></br>
          <button id="lightButton" type="button" onClick={emailCheckLight}>LIGHT</button>
          <button id="hardButton"  type="button" onClick={emailCheckHard}>HARD</button>
          <div id="testDiv"></div>

          {/* Conditionally render the DataCharts component */}
          <div className='Charts'>{chartData && <DataCharts data={chartData} />}</div>
        </div>

        
        <div id='contentBodyPassword'>
          <p id="questionpass">Check Your Passwords</p>
          <div id="passCheckDiv">
            <input id="passInput" type="email" placeholder="Enter your password"></input>
            <button type="button" onClick={emailCheckLight}>Pass</button>
          </div>
          <div id="testDivPass"></div>
        </div>



        <div id='contentBodyDomain'>
        <p id="questionDomain">Verify your Domains</p>
          <input id="domainInput" type="email" placeholder="Enter your domain name"></input><br></br>
          <button id="domainButton" type="button" onClick={domainCheck}>Domain</button>
          <button id="domainButton" type="button" onClick={domainCheckAll}>All Domains</button>
          <div id="testDivDom"></div>
        </div>
      </div>
    </div>
  );
}
function clickHandler(event) {
 console.log(event.target)
 const contentBodyPassword = document.getElementById('contentBodyPassword')
 const contentBodyDomain = document.getElementById('contentBodyDomain')
 const contentBodyEmail = document.getElementById('contentBodyEmail')
 if (event.target.id=='emailCheck'){
  contentBodyPassword.style.display='none';
  contentBodyDomain.style.display = 'none';
  contentBodyEmail.style.display = 'block';
 } else if (event.target.id=='domainCheck'){
  contentBodyPassword.style.display='none';
  contentBodyDomain.style.display = 'flex';
  contentBodyEmail.style.display = 'none';
 } else if (event.target.id=='passCheck'){
  contentBodyPassword.style.display='flex';
  contentBodyDomain.style.display = 'none';
  contentBodyEmail.style.display = 'none';
 } 
}

function domainCheck(){
  const domain = document.getElementById('domainInput').value
  axios('https://api.xposedornot.com/v1/breaches?domain='+domain).then((res)=>{
    const testDivDomain = document.getElementById('testDivDom')
    testDivDomain.innerHTMl = res.data
  })
}
function domainCheckAll(){
  const key = process.env.REACT_APP_SECRET_KEY
  console.log(key)
  axios.post('https://api.xposedornot.com/v1/domain-breaches/', {},{headers: {'x-api-key':key}}).then((res)=>{
    console.log(res.data.metrics)
    const testDivDom = document.getElementById('testDivDom')
    testDivDom.innerHTML = ''
    for (var i in res.data.metrics){
      console.log(i)
      const tab = document.createElement('div')
      const h = document.createElement('h2')
      h.innerHTML = i
      const p = document.createElement('ul')
      var c = 0
      for (var j in res.data.metrics[i]){
        const li = document.createElement('li')
        li.id = c
        c++
        li.innerHTML = j
        p.appendChild(li)
      }

      tab.appendChild(h)
      tab.appendChild(p)
      testDivDom.appendChild(tab)
    }
  })
}
function emailCheckLight(){
  const email = document.getElementById("lightEmailInput").value
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
    const email = document.getElementById('lightEmailInput').value;
    axios('https://api.xposedornot.com/v1/breach-analytics?email=' + email)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Request Failed');
        }
        console.log(res.data) // Update state with response data
      })
      .catch((error) => {
        console.error(error);
      });
  };



export default App;
