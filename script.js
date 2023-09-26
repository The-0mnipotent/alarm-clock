
// variables
const ring = new Audio('ringtone.mp3');
ring.loop = true;

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;




//Analog Clock 

// Script for Time and Date
function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        // var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        // for(var i=0; i<ids.length;i++){
        //     document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        // }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#btn-stopAlarm").style.visibility = 'visible';
                
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section
for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 
function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("setSeconds") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
        alert(`Your Alarm Set ${alarmTime}.`);
    }

}
setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm
function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
    alert(`Your Alarm ${click_id} Delete.`);
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#btn-stopAlarm").style.visibility= "hidden";
}



//Analog Clock
let hr = document.querySelector('#hr');
let mn = document.querySelector('#mn');
let sc = document.querySelector('#sc');

setInterval(() =>{
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`; 



    //Digital clock
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    let am = h >= 12 ? "PM" : "AM";

    //convert 24hr clock to 12hr clock

    if(h>12){
        h=h-12;
    }

    //add zero before single digit number

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    yhours.innerHTML = h;
    yminutes.innerHTML = m;
    yseconds.innerHTML = s;
    yampm.innerHTML = am;

});



// Stop Watch

const boundary = document.getElementsByClassName("outer-circle")[0];

const playButton = document.querySelector('[data-play]');
const resetButton = document.querySelector('[data-reset]');
const lapButton = document.querySelector('[data-lap]');

const minute = document.querySelector('[data-minute]');
const second = document.querySelector('[data-second]');
const milisecond = document.querySelector('[data-milisecond]');

const lapsList = document.querySelector('[data-laps]');
const clearAllButton = document.querySelector('[data-clear-all]');

let isPlay = false;
let isReset= false;
let minuteCounter = 0;
let secCounter = 0;
let msecCounter = 0;
let lapItem = 0;
let min;
let sec;
let msec;

const toggleButton = () => {
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
}

const play = () => {
  if(!isPlay && !isReset){
    playButton.innerHTML = "Pause";
    boundary.classList.add("animation-bg");

    min = setInterval(()=>{
      minute.innerText= `${++minuteCounter} : `;
    },1000*60)

    sec = setInterval(()=>{
      if(secCounter === 60 ){
        secCounter = 0;
      }
      second.innerText= ` ${++secCounter} : `;
    },1000)

    msec = setInterval(()=>{
      if(msecCounter === 100 ){
        msecCounter = 0;
      }
      milisecond.innerText= ` ${(++msecCounter)}`;
    },10)

    isPlay=true;
    isReset = true;
  }
  else {
    playButton.innerHTML= "Play";
    boundary.classList.remove("animation-bg");
    clearInterval(sec);
    clearInterval(msec);
    clearInterval(min);
    isPlay=false;
    isReset = false;
  }
  toggleButton();
}

const reset = () => {
  isReset  = true;
  play();
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  minute.innerHTML = "0 :";
  second.innerHTML = "0 : ";
  milisecond.innerHTML = "0";
  minuteCounter = 0;
  secCounter = 0;
  msecCounter = 0;
  lapItem = 0;

}

const lap = () => {
  const li =document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class","time-stamp");

  number.innerHTML = `#${++lapItem}`
  timeStamp.innerHTML = `${minuteCounter} : ${secCounter} : ${msecCounter}`;
  li.append(number, timeStamp);
  lapsList.append(li);

  clearAllButton.classList.remove('hidden');
}

const clearAll = () => {
  lapsList.innerHTML = '';
  lapItem = 0;
  clearAllButton.classList.add('hidden');
  // lapsList.append(clearAllButton);
}

playButton.addEventListener('click', play);
resetButton.addEventListener('click',reset);
lapButton.addEventListener('click',lap);
clearAllButton.addEventListener('click',clearAll);
