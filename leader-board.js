$(function() {

  function perks_leader_output(time) {
    var URL = '';
    
    if(time == 'monthly' ) {
      URL = "https://asia-southeast1-metabay-db.cloudfunctions.net/monthly-points";
    } else if(time == 'annual') {
      URL = "https://asia-southeast1-metabay-db.cloudfunctions.net/annual-points"; 
    } else if(time == 'all-time') {
      URL = "https://asia-southeast1-metabay-db.cloudfunctions.net/all-time";
    } else {
      URL = "https://asia-southeast1-metabay-db.cloudfunctions.net/monthly-points";
    }

    var output1 = '';
    var output2 = '';
    var targetName = $('.leader-board-tab').attr('data-leader-name');
    
    fetch(URL)
    .then(response => response.json())
    .then(result => {
      if( result[targetName].length > 0 ) {
        $.each(result[targetName], function(personIndex, personInfo) {

          let rankingNumber   = parseInt(personIndex) + 1;
          let walletUser      = personInfo.wallet_user;
          let walletUserFirst = walletUser.split('').slice(0, 5);
          let walletUserLast  = walletUser.split('').slice(-5);
          let walletUserShort = walletUserFirst.join("") + '...' + walletUserLast.join("");

          let userCase      = personInfo.case;
          let userCaseImg   = '';

          if(userCase == 'up') {
            userCaseImg = "https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dcf0941bb0b71f28edec6d_Green-arrow.svg";
          } else if(userCase == 'down') {
            userCaseImg = "https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dcf52f04488e099847e4d6_Sub-Red.svg";
          } else if(userCase == 'equal') {
            userCaseImg = "https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dcf0941bb0b71f28edec6d_Green-arrow.svg";
          } else {
            userCaseImg = "https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dcf0941bb0b71f28edec6d_Green-arrow.svg";
          }

          if(rankingNumber == 1) {
            output1 += `
            <div class="perks-title-wrap first-title">
              <div class="perks-type-wrap">
                <div class="perks-number-wrap">
                  <p class="perks-number-content">${ rankingNumber }</p>
                </div>
                <div class="perks-name-wrap">
                  <img loading="lazy" src="${ userCaseImg }" alt="">
                  <p class="perks-name">${ walletUserShort }</p>
                </div>
              </div>
              <div class="perks-rate-wrap">
                <p class="perks-rate-content">${ personInfo.total_point }</p>
                <img loading="lazy" src="https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dceff054b20fc18d2cdeac_Coin.svg" alt="">
              </div>
            </div>`;            
          } else if(rankingNumber == 2) {
            output1 += `
            <div class="perks-title-wrap second-title">
              <div class="perks-type-wrap">
                <div class="perks-number-wrap">
                  <p class="perks-number-content">${ rankingNumber }</p>
                </div>
                <div class="perks-name-wrap">
                  <img loading="lazy" src="${ userCaseImg }" alt="">
                  <p class="perks-name">${ walletUserShort }</p>
                </div>
              </div>
              <div class="perks-rate-wrap">
                <p class="perks-rate-content">${ personInfo.total_point }</p>
                <img loading="lazy" src="https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dceff054b20fc18d2cdeac_Coin.svg" alt="">
              </div>
            </div>`; 
          } else if(rankingNumber == 3) {
            output1 += `
            <div class="perks-title-wrap third-title">
              <div class="perks-type-wrap">
                <div class="perks-number-wrap">
                  <p class="perks-number-content">${ rankingNumber }</p>
                </div>
                <div class="perks-name-wrap">
                  <img loading="lazy" src="${ userCaseImg }" alt="">
                  <p class="perks-name">${ walletUserShort }</p>
                </div>
              </div>
              <div class="perks-rate-wrap">
                <p class="perks-rate-content">${ personInfo.total_point }</p>
                <img loading="lazy" src="https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dceff054b20fc18d2cdeac_Coin.svg" alt="">
              </div>
            </div>`; 
          } else {
            output2 += `
            <div class="perks-title-wrap sub-content">
              <div class="perks-type-wrap">
                <div class="perks-number-wrap sub-content">
                  <p class="perks-number-content sub-content">${ rankingNumber }</p>
                </div>
                <div class="perks-name-wrap">
                  <img loading="lazy" src="${ userCaseImg }" alt="" />
                  <p class="perks-name sub-content">${ walletUserShort }</p>
                </div>
              </div>
              <div class="perks-rate-wrap">
                <p class="perks-rate-content">${ personInfo.total_point }</p>
                <img loading="lazy" src="https://uploads-ssl.webflow.com/62b29aa34123680c6480de24/63dceff054b20fc18d2cdeac_Coin.svg" alt="" />
              </div>
            </div>`;
          }

        });
    
        $( '.perks-title-flex.' + time ).html(output1);
        $( '.perks-leader-output.' + time ).html(output2);

      } else {

        $('#perks-leader-output').html('Data not found');

      }

    });
  }
  perks_leader_output('monthly');

  // Tab click fetch
  $('.leader-board-tab-link').on('click', function(e) {
    e.preventDefault();

    let $this = $(this);
    let $time = $this.attr('data-time');

    perks_leader_output($time);
  });
  
});
