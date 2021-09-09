/* √ЋќЅјЋ№Ќџ≈  ќЌ—“јЌ“џ */
const MAX_FEEDBACK_CARDS_SHOWN = 2; // кол-во карточек на странице фидбек
const MS_ANIM = 400;                // секунд на анимацию

$(document).ready(function () {
    /* методы */
    const hideSpareFeedBackCards = (cards) => {
        if (cards.length > MAX_FEEDBACK_CARDS_SHOWN) {
            for (let i = MAX_FEEDBACK_CARDS_SHOWN; i < cards.length; i++) {
                $(cards[i]).hide();
            }
        }

    }
    const setArrowsActivity = () => {
        // если на экране уже последн€€ карточка, то гасим стрелку вниз
        // если нет, но она погашена - активируем
        if ($(feedBackCards[feedBackCards.length - 1]).is(':visible')) {
            $(feedbackDown).removeClass('active');
        } else if ($(feedbackDown).hasClass('active') !== true) {
            $(feedbackDown).addClass('active');
        }
        // если на экране уже перва€ карточка, то гасим стрелку вверх
        // если нет, но она погашена - активируем
        if ($(feedBackCards[0]).is(':visible')) {
            $(feedbackUp).removeClass('active');
        } else if ($(feedbackUp).hasClass('active') !== true) {
            $(feedbackUp).addClass('active');
        }
    }

    /* элементы */
    const videoPlay = $('#play-video'); // кнопка нажати€ на воспроизведение демо видео
    const cbx = $('.contactus-form__chbx'); // чекбокс subscribe to the newsletter
    const servCardDrop = $('.services-nav'); // выпадение текста вниз в Services
    servCardDrop.parent().find('.services-content').hide(); // по умолчанию скрыт весь выпадающий текст
    const feedbackUp = $('#feedback-up'); // кнопки вверх и вниз в отзывах
    const feedbackDown = $('#feedback-down');
    const feedBackCards = $('.feedback-card'); // все карты с отзывами
    hideSpareFeedBackCards(feedBackCards);
    const teamPhoto = $('.team-photo');


    /* слушатели */
    // нажатие на кнопку воспроизведение демо видео
    videoPlay.on('click', () => {
        // вместо того что есть подставл€ем видео с ютуба (.agenda-video  width: 600px; height: 320px;)
        const agendaVideo = $('.agenda-video');
        agendaVideo.addClass('op-1')
        agendaVideo.html(`<video width="600" height="320" autoplay controls="controls">
      <source
        src="vid/demovideo.mp4"
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      />
    </video>`);
    });
    // нажатие на выпадение текста вниз в Services
    servCardDrop.on('click', (e) => {
        const root = $(e.target).closest('.services-card');
        root.find('.services-content').fadeToggle(200);
    });
    // нажатие вверх и вниз на отзывах
    feedbackDown.on('click', (e) => {
        if ($(e.target).hasClass('active')) {
            const elemToDisappear = $('.feedback-cards').find('.feedback-card:visible:first'); // первый видимый элемент
            const elemToMove = $(elemToDisappear).next(); // элемент который идЄт ниже
            const elemToAppear = $(elemToMove).next();  // невидимый пока что элемент, который ещЄ ниже
            // анимируем
            elemToAppear.animate({
                height: "toggle"
            }, MS_ANIM);
            elemToDisappear.animate({
                height: "toggle",
                marginTop: "-=140",
                marginBottom: "+=70"
            }, MS_ANIM, () => {
                elemToAppear.show(MS_ANIM, setArrowsActivity);
            });
        }
    });

    feedbackUp.on('click', (e) => {
        if ($(e.target).hasClass('active')) {
            const elemToMove = $('.feedback-cards').find('.feedback-card:visible:first'); // первый видимый элемент
            const elemToDisappear = $(elemToMove).next(); // элемент который идЄт ниже
            const elemToAppear = $(elemToMove).prev();  // невидимый пока что элемент, который выше первого
            // анимируем
            elemToDisappear.animate({
                height: "toggle"
            }, MS_ANIM, () => {
                elemToAppear.show(MS_ANIM, setArrowsActivity);
            });
            elemToAppear.animate({
                marginTop: "+=140",
                marginBottom: "-=70",
                height: "toggle"
            }, MS_ANIM);
        }
    });
    // нажатие на чекбокс subscribe to the newsletter
    cbx.on('click', (e) => {
        if (e.target.tagName === "INPUT") { /* иначе будут слушать и лейбл, и инпут */
            cbx.toggleClass('checkbox_checked');
        }
    });
});