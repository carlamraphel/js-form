// On-click button for half-day
function toggleTimeOfDaySection(button) {
  var targetSectionId = button.dataset.target;
  var targetSection = document.getElementById(targetSectionId);
  var oneDateInput = document.getElementById('oneDate');

  // Show "Select time of day" section only if "Half-day" button is clicked
  if (button.value === 'Half-day') {
    targetSection.classList.remove('hidden');
    oneDateInput.classList.remove('hidden');
    document.getElementById('dateSection').classList.add('hidden');
  } else {
    targetSection.classList.add('hidden');
    oneDateInput.classList.add('hidden');
  }
}

// On-click button for whole-day
function toggleDateSection(button) {
  var targetSectionId = button.dataset.target;
  var targetSection = document.getElementById(targetSectionId);
    
  // Show "Select time of day" section only if "Whole-day" button is clicked
  if (button.value === 'Whole-day') {
    targetSection.classList.remove('hidden');
    document.getElementById('timeOfDaySection').classList.add('hidden');
  } else {
    targetSection.classList.add('hidden');
  }
}

document.querySelector('.leaveForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Reveals leave time button contents
  var leaveTimeButtons = document.querySelectorAll('.leaveTimeButton');
  var timeOfDaySection = document.getElementById('timeOfDaySection');
  var dateSection = document.getElementById('dateSection');
  
  leaveTimeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var targetSectionId = button.dataset.target;
      var targetSection = document.getElementById(targetSectionId);
      
      // Show "Select time of day" only if "Half-day" button is clicked
      if (button.value === 'Half-day') {
        timeOfDaySection.classList.remove('hidden');
      } else {
        timeOfDaySection.classList.add('hidden');
      }
      
      targetSection.classList.toggle('hidden');

      // Show "Start date and End date" only if "Whole-day" button is clicked
      if (button.value === 'Whole-day') {
        dateSection.classList.remove('hidden');
      } else {
        dateSection.classList.add('hidden');
      }
      
      targetSection.classList.toggle('hidden');
    });
  });

  // Single check-box selection only for reason for leave
  var checkboxesReason = document.querySelectorAll('.reason');

  function validateReason() {
    var checkedCount = 0;
  
    for (var i = 0; i < checkboxesReason.length; i++) {
      if (checkboxesReason[i].checked) {
        checkedCount++;
      }
    }
  
    if (checkedCount === 0) {
      alert('Please select a reason for leave.');
      return false;
    } else if (checkedCount > 1) {
      alert('Please select only one reason for leave.');
      return false;
    }
  
    return true;
  }
  
  if (!validateReason()) {
    return;
  }

  var startDate = new Date(document.querySelector('.startDate').value);
  var endDate = new Date(document.querySelector('.endDate').value);

  var oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  var totalDays = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1; // Including both start and end dates

  var remainingBalance = parseFloat(document.querySelector('.leaveBalance').innerHTML);

  // Check if the total days exceed the remaining balance
  if (totalDays <= remainingBalance) {
    // Subtract weekends from the total days
    var weekends = 0;
    for (var i = 0; i < totalDays; i++) {
      var day = new Date(startDate);
      day.setDate(startDate.getDate() + i);

      if (day.getDay() === 0 || day.getDay() === 6) {
        weekends++;
      }
    }

    var leaveDays = totalDays - weekends;

    // Update remaining leave balance
    remainingBalance -= leaveDays;
    document.querySelector('.leaveBalance').innerHTML = remainingBalance;

    // Display success message
    alert('Leave request approved for ' + leaveDays + ' days.');
    document.querySelector('.leaveForm').reset();

    // Show the leave balance after a successful reduction
    document.querySelector('h3').style.display = 'block'; 
  } else {
    alert('Insufficient leave balance.');
  }
});
