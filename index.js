function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);  
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var username;
var pass;
var theme;
var roomer='AstarDemo';
function setTheme() {
  if(document.getElementById("myonoffswitch").checked){
    swapStyleSheet("style2.css");
    theme = "dark";
  } else{
    swapStyleSheet("style1.css");
    theme = "light";
  }
}

window.onload = setTheme;


function login(){
    username = document.getElementById('username').value;
    pass = document.getElementById('password').value;
    window.location.href="room_select.html?username="+username+"&password="+pass+"&theme="+theme;
}

function RoomSelect(Room){
    window.location.href="conference.html?username="+username+"&password="+pass+"&theme="+theme+"&room="+Room;
}

username = getParameterByName('username');
pass = getParameterByName('password');
theme = getParameterByName('theme');
var room = getParameterByName('room');
if(theme == "dark"){
    swapStyleSheet("style2.css");
}
else if(theme == "light"){
    swapStyleSheet("style1.css");
}

if(room != ""){
    roomer = room;
}

const domain = 'meet.jit.si';
const options = {
    roomName: roomer,
    width: 600,
    height: 600,
    parentNode: document.querySelector('#meet')
};
const api = new JitsiMeetExternalAPI(domain, options);
api.executeCommand('displayName', username);
//api.executeCommand('password', pass);


setTimeout(() => {
// why timeout: I got some trouble calling event listeners without setting a timeout :)
    // when local user is trying to enter in a locked room 
    api.addEventListener('passwordRequired', () => {
        api.executeCommand('password', '123456');
    });

    // when local user has joined the video conference 
    api.addEventListener('videoConferenceJoined', (response) => {
        api.executeCommand('password', '123456');
    });

}, 10);

document.querySelector('.watermark').style.display = 'none';
