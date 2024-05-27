// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function addMatchToDatabase(match) {
  const matchesRef = ref(database, 'matches');
  const newMatchRef = push(matchesRef);
  set(newMatchRef, match)
    .then(() => {
      console.log('Match added successfully');
    })
    .catch((error) => {
      console.error('Error adding match:', error);
    });
}

function addRow() {
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const newCellIndex = newRow.insertCell(0);
    newCellIndex.innerHTML = table.rows.length;

    const newCellTeam1 = newRow.insertCell(1);
    newCellTeam1.contentEditable = "true";
    newCellTeam1.innerHTML = "ใส่ชื่อทีม 1";

    const newCellIcon = newRow.insertCell(2);
    const iconImg = document.createElement("img");
    iconImg.src = "basketball-fire.png"; // เปลี่ยนเป็นเส้นทางของไอคอนของคุณ
    iconImg.alt = "ไอคอนบาสเกตบอล";
    iconImg.className = "icon";
    newCellIcon.appendChild(iconImg);

    const newCellTeam2 = newRow.insertCell(3);
    newCellTeam2.contentEditable = "true";
    newCellTeam2.innerHTML = "ใส่ชื่อทีม 2";

    const newCellTime = newRow.insertCell(4);
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.className = "form-control";
    newCellTime.appendChild(timeInput);

    const newCellVenue = newRow.insertCell(5);
    newCellVenue.contentEditable = "true";
    newCellVenue.innerHTML = "ใส่ชื่อสถานที่";

    const newCellScore = newRow.insertCell(6);
    const scoreInput1 = document.createElement("input");
    scoreInput1.type = "number";
    scoreInput1.className = "form-control";
    scoreInput1.style.display = "inline-block";
    scoreInput1.style.width = "45%";
    const scoreInput2 = document.createElement("input");
    scoreInput2.type = "number";
    scoreInput2.className = "form-control";
    scoreInput2.style.display = "inline-block";
    scoreInput2.style.width = "45%";
    newCellScore.appendChild(scoreInput1);
    newCellScore.appendChild(document.createTextNode(" - "));
    newCellScore.appendChild(scoreInput2);

    const actionsCell = newRow.insertCell(7);
    actionsCell.innerHTML = '<button class="btn btn-danger btn-sm" onclick="deleteRow(this)">ลบ</button>';

    // Create match object
    const match = {
        team1: newCellTeam1.innerHTML,
        team2: newCellTeam2.innerHTML,
        time: timeInput.value,
        venue: newCellVenue.innerHTML,
        score1: scoreInput1.value,
        score2: scoreInput2.value
    };

    // Save match to database
    addMatchToDatabase(match);

    updateIndices();
}
