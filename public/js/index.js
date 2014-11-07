$(document).ready(function () {
    $window.on('click', '.more', function () {
        $('.file:last').after('<input type="file" class="file" name="file' + $('.file').length + 1 + '"/>');
    });    
});