/* ���������� ��������� */
const MAX_FEEDBACK_CARDS_SHOWN = 2; // ���-�� �������� �� �������� ������
const MS_ANIM = 400;                // ������ �� ��������

$(document).ready(function () {
    /* ������ */
    const hideSpareFeedBackCards = (cards) => {
        if (cards.length > MAX_FEEDBACK_CARDS_SHOWN) {
            for (let i = MAX_FEEDBACK_CARDS_SHOWN; i < cards.length; i++) {
                $(cards[i]).hide();
            }
        }

    }
    const setArrowsActivity = () => {
        // ���� �� ������ ��� ��������� ��������, �� ����� ������� ����
        // ���� ���, �� ��� �������� - ����������
        if ($(feedBackCards[feedBackCards.length - 1]).is(':visible')) {
            $(feedbackDown).removeClass('active');
        } else if ($(feedbackDown).hasClass('active') !== true) {
            $(feedbackDown).addClass('active');
        }
        // ���� �� ������ ��� ������ ��������, �� ����� ������� �����
        // ���� ���, �� ��� �������� - ����������
        if ($(feedBackCards[0]).is(':visible')) {
            $(feedbackUp).removeClass('active');
        } else if ($(feedbackUp).hasClass('active') !== true) {
            $(feedbackUp).addClass('active');
        }
    }

    /* �������� */
    const videoPlay = $('#play-video'); // ������ ������� �� ��������������� ���� �����
    const cbx = $('.contactus-form__chbx'); // ������� subscribe to the newsletter
    const servCardDrop = $('.services-nav'); // ��������� ������ ���� � Services
    servCardDrop.parent().find('.services-content').hide(); // �� ��������� ����� ���� ���������� �����
    const feedbackUp = $('#feedback-up'); // ������ ����� � ���� � �������
    const feedbackDown = $('#feedback-down');
    const feedBackCards = $('.feedback-card'); // ��� ����� � ��������
    hideSpareFeedBackCards(feedBackCards);
    const teamPhoto = $('.team-photo');


    /* ��������� */
    // ������� �� ������ ��������������� ���� �����
    videoPlay.on('click', () => {
        // ������ ���� ��� ���� ����������� ����� � ����� (.agenda-video  width: 600px; height: 320px;)
        const agendaVideo = $('.agenda-video');
        agendaVideo.addClass('op-1')
        agendaVideo.html(`<video width="600" height="320" autoplay controls="controls">
      <source
        src="vid/demovideo.mp4"
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      />
    </video>`);
    });
    // ������� �� ��������� ������ ���� � Services
    servCardDrop.on('click', (e) => {
        const root = $(e.target).closest('.services-card');
        root.find('.services-content').fadeToggle(200);
    });
    // ������� ����� � ���� �� �������
    feedbackDown.on('click', (e) => {
        if ($(e.target).hasClass('active')) {
            const elemToDisappear = $('.feedback-cards').find('.feedback-card:visible:first'); // ������ ������� �������
            const elemToMove = $(elemToDisappear).next(); // ������� ������� ��� ����
            const elemToAppear = $(elemToMove).next();  // ��������� ���� ��� �������, ������� ��� ����
            // ���������
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
            const elemToMove = $('.feedback-cards').find('.feedback-card:visible:first'); // ������ ������� �������
            const elemToDisappear = $(elemToMove).next(); // ������� ������� ��� ����
            const elemToAppear = $(elemToMove).prev();  // ��������� ���� ��� �������, ������� ���� �������
            // ���������
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
    // ������� �� ������� subscribe to the newsletter
    cbx.on('click', (e) => {
        if (e.target.tagName === "INPUT") { /* ����� ����� ������� � �����, � ����� */
            cbx.toggleClass('checkbox_checked');
        }
    });
});