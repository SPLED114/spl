// Simulate user login and coin balance
let coinBalance = 0;

// Login functionality
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simple validation (can be expanded)
  if (email && password) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
  } else {
    alert("Please enter valid credentials.");
  }
});

// Watch ad and earn coins
document.getElementById("watch-ad-btn").addEventListener("click", function () {
  coinBalance += 3; // Each ad gives 3 coins
  document.getElementById("coin-count").innerText = coinBalance;
  alert("You've earned 3 coins!");
});

// Join tournament functionality
document.querySelectorAll(".join-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const entryFee = parseInt(
      this.previousElementSibling.innerText.split(" ")[2]
    ); // Get entry fee
    if (coinBalance >= entryFee) {
      coinBalance -= entryFee;
      document.getElementById("coin-count").innerText = coinBalance;
      alert("You've joined the tournament!");
    } else {
      alert("Not enough coins to join the tournament.");
    }
  });
});

// Tournament Data (can be loaded from backend or dynamically created)
const tournaments = [
  { name: "BGMI TDM - 8 Players", entryFee: 20, totalCoins: 160 },
  { name: "Ludo - 4 Players", entryFee: 40, totalCoins: 160 },
  { name: "BGMI Squad - 16 Players", entryFee: 100, totalCoins: 1600 },
  { name: "PUBG Duo - 10 Players", entryFee: 50, totalCoins: 500 }
  // Add more tournaments as needed
];

// Function to dynamically display tournaments
function displayTournaments() {
  const tournamentList = document.querySelector(".tournament-list");
  tournamentList.innerHTML = ""; // Clear existing list

  tournaments.forEach((tournament) => {
    const tournamentDiv = document.createElement("div");
    tournamentDiv.classList.add("tournament");
    tournamentDiv.innerHTML = `
            <h3>${tournament.name}</h3>
            <p>Entry Fee: ${tournament.entryFee} Coins</p>
            <button class="join-btn">Join</button>
        `;
    tournamentList.appendChild(tournamentDiv);
  });
}

// Load tournaments on page load
window.onload = displayTournaments;

// Join tournament functionality (updated for dynamic tournaments)
document
  .querySelector(".tournament-list")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("join-btn")) {
      const entryFee = parseInt(
        e.target.previousElementSibling.innerText.split(" ")[2]
      );
      if (coinBalance >= entryFee) {
        coinBalance -= entryFee;
        document.getElementById("coin-count").innerText = coinBalance;
        alert(`You've joined the tournament!`);
      } else {
        alert("Not enough coins to join the tournament.");
      }
    }
  });
let userCoinBalance = 0;

function addCoins(num) {
  userCoinBalance += num;
  updateCoinDisplay();
}

function deductCoins(num) {
  if (userCoinBalance >= num) {
    userCoinBalance -= num;
    updateCoinDisplay();
    return true;
  } else {
    alert("Not enough coins!");
    return false;
  }
}

function updateCoinDisplay() {
  document.getElementById("coin-count").innerText = userCoinBalance;
}

// Simulate watching ads to add coins
document.getElementById("watch-ad-btn").addEventListener("click", function () {
  addCoins(3); // Each ad gives 3 coins
  alert("You've earned 3 coins!");
});
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
// User sign-up
function signUpUser(email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed up: ", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing up: ", error.message);
    });
}

// User login
function loginUser(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User logged in: ", userCredential.user);
    })
    .catch((error) => {
      console.error("Error logging in: ", error.message);
    });
}
// Add a new tournament to Firestore
function createTournament(tournamentName, entryFee, totalCoins) {
  db.collection("tournaments")
    .add({
      name: tournamentName,
      entryFee: entryFee,
      totalCoins: totalCoins,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Tournament created!");
    })
    .catch((error) => {
      console.error("Error creating tournament: ", error.message);
    });
}

// Fetch tournament data
db.collection("tournaments")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
    });
  });
function updateUserCoins(userId, newCoinBalance) {
  db.collection("users")
    .doc(userId)
    .update({
      coinBalance: newCoinBalance
    })
    .then(() => {
      console.log("Coin balance updated.");
    })
    .catch((error) => {
      console.error("Error updating coins: ", error.message);
    });
}
function getUserCoins(userId) {
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Coin balance: ", doc.data().coinBalance);
      } else {
        console.log("No such user!");
      }
    })
    .catch((error) => {
      console.error("Error fetching coins: ", error.message);
    });
}
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
function signUpUser(email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      console.log("User signed up:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}
function loginUser(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Logged in successfully
      console.log("User logged in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error logging in:", error.message);
    });
}
function updateUserCoins(userId, newCoinBalance) {
  db.collection("users")
    .doc(userId)
    .update({
      coinBalance: newCoinBalance
    })
    .then(() => {
      console.log("Coin balance updated.");
    })
    .catch((error) => {
      console.error("Error updating coins:", error.message);
    });
}
function getUserCoins(userId) {
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Coin balance:", doc.data().coinBalance);
      } else {
        console.log("No such user!");
      }
    })
    .catch((error) => {
      console.error("Error fetching coins:", error.message);
    });
}
function createTournament(tournamentName, entryFee, totalCoins) {
  db.collection("tournaments")
    .add({
      name: tournamentName,
      entryFee: entryFee,
      totalCoins: totalCoins,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Tournament created!");
    })
    .catch((error) => {
      console.error("Error creating tournament:", error.message);
    });
}
function fetchTournaments() {
  db.collection("tournaments")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name);
      });
    })
    .catch((error) => {
      console.error("Error fetching tournaments:", error.message);
    });
}
function displayTournaments() {
  const tournamentList = document.querySelector(".tournament-list");
  tournamentList.innerHTML = ""; // Clear existing list

  db.collection("tournaments")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tournament = doc.data();
        const tournamentDiv = document.createElement("div");
        tournamentDiv.classList.add("tournament");
        tournamentDiv.innerHTML = `
                <h3>${tournament.name}</h3>
                <p>Entry Fee: ${tournament.entryFee} Coins</p>
                <button class="join-btn">Join</button>
            `;
        tournamentList.appendChild(tournamentDiv);
      });
    })
    .catch((error) => {
      console.error("Error displaying tournaments:", error.message);
    });
}

// Load tournaments on page load
window.onload = displayTournaments;
document
  .querySelector(".tournament-list")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("join-btn")) {
      const entryFee = parseInt(
        e.target.previousElementSibling.innerText.split(" ")[2]
      );
      const userId = auth.currentUser.uid; // Ensure user is logged in

      getUserCoins(userId).then((userCoins) => {
        if (userCoins >= entryFee) {
          updateUserCoins(userId, userCoins - entryFee);
          alert(`You've joined the tournament!`);
        } else {
          alert("Not enough coins to join the tournament.");
        }
      });
    }
  });
db.collection("tournaments").onSnapshot((snapshot) => {
  const tournamentList = document.querySelector(".tournament-list");
  tournamentList.innerHTML = "";

  snapshot.forEach((doc) => {
    const tournament = doc.data();
    const tournamentDiv = document.createElement("div");
    tournamentDiv.classList.add("tournament");
    tournamentDiv.innerHTML = `
            <h3>${tournament.name}</h3>
            <p>Entry Fee: ${tournament.entryFee} Coins</p>
            <button class="join-btn">Join</button>
        `;
    tournamentList.appendChild(tournamentDiv);
  });
});
