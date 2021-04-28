

    jQuery(document).ready(function($){
      $('#calcSum').attr("oninput","calc()");
      $('#calcTime').attr("oninput","calc()");
    });





 function calc() {
      if ($('#calcSum').val() > 100) {
        maxPriceCredit = $('#calcSum').val() * 8000;
      } else {
        maxPriceCredit = $('#calcSum').val() * 9000;
      }

      if ($('#calcSum').val() > 100) {
        finalPrice = ($('#calcSum').val() - $('#calcSum').val() % 100) / 100;
        finalPrice = finalPrice + ' млн.';
        if ($('#calcSum').val() % 100 != 0) {
          finalPrice = finalPrice + '<br>' + ($('#calcSum').val() % 100 * 10) + ' тыс. р.';
        } 

      } else {
        finalPrice = $('#calcSum').val() + '0 тыс. р.';
      }

      if ($('#calcTime').val() > 12) {
        stavka = 1.015;

        valTimeY = ($('#calcTime').val() - $('#calcTime').val() % 12) / 12;
        valTimeM = $('#calcTime').val() - valTimeY * 12;
        if (valTimeY < 5) {
          finalTime = valTimeY + ' года'; 
        } else {
          finalTime = valTimeY + ' лет';  
        }       
        if (valTimeY == 1) {
          finalTime = valTimeY + ' год';  
        } 
        if (valTimeM != 0) {
          finalTime = finalTime + '<br>' + valTimeM + ' мес.';
        }



      } else {
        stavka = 1.023;
        finalTime = $('#calcTime').val() + ' мес.';
      }

      $('#rangeSum').html(finalPrice);
      $('#rangeTime').html(finalTime);


      maxSum = (maxPriceCredit - maxPriceCredit % 1000000) / 1000000 + ' млн.';
      if (maxPriceCredit % 1000000 != 0) {
        maxSum = maxSum + ' ' +(maxPriceCredit % 1000000 / 1000) + ' тыс.';
      };

      $('#maxSum').html(maxSum + ' р.');
      $('#monthPay').html(Math.floor(maxPriceCredit * stavka / $('#calcTime').val() / 1000 * 0.85) + ' тыс. р.');

      $('#calcSum').css('background-size', (Math.floor( $('#calcSum').val() / 15 ) -1) + '% 8px')
      $('#calcTime').css('background-size', (Math.floor( $('#calcTime').val() / 1.2 ) -1) + '% 8px')
    }

calc();

