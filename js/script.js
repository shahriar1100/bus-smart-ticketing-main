
const seats = document.querySelectorAll('.seat');
const seatLeftEl = document.getElementById('seatLeft');
const seatListEl = document.getElementById('selectedSeatList');
const totalPriceEl = document.getElementById('totalPrice');
const nextBtn = document.getElementById('nextBtn');

const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');

// get genarel valu
let selectedSeats = [];
let seatLeft = 40;
const seatPrice = 550;


seats.forEach(seat => {
  seat.addEventListener('click', () => {
    const seatName = seat.innerText.trim();
    const isSelected = selectedSeats.includes(seatName);


    if (isSelected) {
      selectedSeats = selectedSeats.filter(item => item !== seatName);

      seat.classList.remove('bg-[#1DD100]');
      seat.classList.add('bg-[#F7F8F8]');

      seatLeft++;
    }

    else {
      if (selectedSeats.length >= 4) {
        alert('Maximum 4 seats allowed');
        return;
      }

      selectedSeats.push(seatName);

      seat.classList.remove('bg-[#F7F8F8]');
      seat.classList.add('bg-[#1DD100]');

      seatLeft--;
    }

    updateUI();
  });
});


// seat left update
function updateUI() {
  seatLeftEl.innerText = seatLeft;
  seatListEl.innerHTML = '';

  selectedSeats.forEach(seat => {
    const div = document.createElement('div');
    div.innerText = `${seat} - Economy - ${seatPrice}`;
    seatListEl.appendChild(div);
  });

  totalPriceEl.innerText = selectedSeats.length * seatPrice;
}

// next button enable part
function checkForm() {
  if (
    nameInput.value.trim() !== '' &&
    phoneInput.value.trim() !== '' &&
    emailInput.value.trim() !== ''
  ) {
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    nextBtn.disabled = true;
    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
}

nameInput.addEventListener('input', checkForm);
phoneInput.addEventListener('input', checkForm);
emailInput.addEventListener('input', checkForm);

// cuppon apply part js code
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');

let discountApplied = false;

applyCouponBtn.addEventListener('click', function () {
  const couponCode = couponInput.value.trim();
  const totalPrice = selectedSeats.length * seatPrice;

  if (discountApplied) {
    alert('Coupon already applied');
    return;
  }

  if (couponCode === 'NEW15' && selectedSeats.length === 4) {
    const discount = totalPrice * 0.15;
    const finalPrice = totalPrice - discount;

    totalPriceEl.innerText = Math.round(finalPrice);
    discountApplied = true;

    alert('15% discount applied successfully!');
  } else {
    alert('Coupon valid only for 4 seats (NEW15)');
  }
});


// Next button click and comes successfull modal 

const successModal = document.getElementById('successModal');

nextBtn.addEventListener('click', function () {
  successModal.classList.remove('hidden');
});

function closeSuccessModal() {
  successModal.classList.add('hidden');

  location.reload();
}
