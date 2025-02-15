function generateQR () {
  let parsedSeances = JSON.parse(localStorage.getItem('session'));

  let filmTitle = document.querySelector('.ticket__title');
  filmTitle.textContent = parsedSeances.filmName;

  let startSeance = document.querySelector('.ticket__start');
  let orderedDay = new Date(parsedSeances.timeStamp*1000);
  let orderedDate = orderedDay.toLocaleString().split(',')[0];

  startSeance.textContent = `${parsedSeances.seanceTime}, ${orderedDate}`;

  let infoHall = document.querySelector('.ticket__hall');
  infoHall.textContent = parsedSeances.hallName.split('Зал').join('');

  let ticketChair = document.querySelector('.ticket__chairs');
  let text ='';
  let type = '';

  for (let key in parsedSeances.selectedPlaces) {
    let row = parsedSeances.selectedPlaces[key].row;
    let place = parsedSeances.selectedPlaces[key].place;  
    type =  parsedSeances.selectedPlaces[key].type; 
    text += ` ${row}/${place},`;
  }

  ticketChair.textContent = text.slice(0, -1);

  let contentQr = `
  Фильм: "${parsedSeances.filmName}".
  Ряд/место: ${text.slice(0, -1)}.
  Зал: ${parsedSeances.hallName.split('Зал').join('')}.
  Начало сеанса: ${parsedSeances.seanceTime}.
  Дата сеанса: ${orderedDate}.

  Билет действителен строго на свой сеанс.
  `
  document.querySelector('.ticket__info-qr').outerHTML = '<div class="ticket__info-qr"></div>';

  let qrCode = QRCreator(contentQr, { image: "SVG" });
  document.querySelector(".ticket__info-qr").append(qrCode.result);

}

document.addEventListener('DOMContentLoaded', generateQR);