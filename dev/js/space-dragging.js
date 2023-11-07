/* @flow */

/**
 * Dragging code for Space Dashboard
 */


function checkWindowSize($draggable, peopleNeoDragger, peopleInSpace, neoList) {
    if (window.outerWidth < 1024) {
        peopleNeoDragger.removeAttr('style');
        peopleInSpace.removeAttr('style');
        neoList.removeAttr('style');
        $draggable.draggabilly('disable');
    } else  {
        $draggable.draggabilly('enable');
    }
}


$(function() {

    // dragging divider for people in space and NEO list
    var $draggable,
        peopleNeoWrapper = $('.people-neo-wrapper'),
        peopleNeoDragger = $('.people-neo-dragger'),
        peopleInSpace = $('#people-in-space'),
        neoList = $('#neo-list'),
        peopleNeoHeight,
        offsetTopWrapper,
        percentFromTop;

    $draggable = $('.people-neo-dragger').draggabilly({
        axis: 'y',
        containment: '.people-neo-wrapper'
    });

    checkWindowSize($draggable, peopleNeoDragger, peopleInSpace, neoList);

    // set new height var of col section
    $draggable.on('dragStart', function(event, pointer) {
        peopleNeoHeight = peopleNeoWrapper.height();
    });

    // $draggable.on('dragMove', function(event, pointer, moveVector) {
    //     offsetTopWrapper = peopleNeoDragger.offset().top - peopleNeoWrapper.offset().top;
    //     percentFromTop = (offsetTopWrapper/peopleNeoHeight) * 100;
    //     percentFromTopPlus3pixels = ((offsetTopWrapper + 3)/peopleNeoHeight) * 100;

    //     peopleInSpace.css('bottom', (100 - percentFromTop) + '%');
    //     neoList.css('top', percentFromTopPlus3pixels + '%');
    // });

    $draggable.on('dragEnd', function(event, pointer) {
        offsetTopWrapper = peopleNeoDragger.offset().top - peopleNeoWrapper.offset().top;
        percentFromTop = (offsetTopWrapper/peopleNeoHeight) * 100;
        percentFromTopPlus3pixels = ((offsetTopWrapper + 3)/peopleNeoHeight) * 100;

        peopleInSpace.css('bottom', (100 - percentFromTop) + '%');
        neoList.css('top', percentFromTopPlus3pixels + '%');

        peopleNeoDragger.css('top', percentFromTop + '%');
    });

    window.onresize = function(event) {
        checkWindowSize($draggable, peopleNeoDragger, peopleInSpace, neoList);
    };

    // Reset heights with a double click
    peopleNeoDragger.dblclick(function() {
        peopleNeoDragger.removeAttr('style');
        peopleInSpace.removeAttr('style');
        neoList.removeAttr('style');
    });
});
