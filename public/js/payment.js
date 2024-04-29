document.addEventListener('DOMContentLoaded', function() {
    // JavaScript code here
    var myLink = document.querySelector('a[href="#"]');
    myLink.addEventListener('click', function(e) {
        e.preventDefault();
    });
});
