// Header container
fOnHover = function () {
    $("#trade-bitcoin-btn").hover(function () {
        $(this).css("background-color", "green")}, function () {
            $(this).css("background-color", "#ffa810")
        }
    );
}

fIsValid = function (field) {
    var letters = /^[A-Za-z]+$/;

    if (field.value.match(letters)) {
        return true;
    } else {
        return false;
    }
}

fBlurHandler = function (field) {
    var isValid = fIsValid(field);
    if (isValid) {
        field.parentNode.childNodes[3].innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'; // Add positive icon
        field.parentNode.childNodes[3].style.color = "green"; // Set green color
        field.parentNode.childNodes[3].style.backgroundColor = "#ccffcc"; // Set green BG color
    } else {
        field.parentNode.childNodes[3].innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'; // Add negative icon
        field.parentNode.childNodes[3].style.color = "red"; // Set red color
        field.parentNode.childNodes[3].style.backgroundColor = "#ffb3b3"; // Set red BG color
    }
}

fOnCheckTermsAndConditions = function () {
    $("#terms-and-conditions-checkbox").change(function () {
        if(this.checked) {
            // $("#terms-and-conditions-text").show();
            $("#terms-and-conditions-text").slideDown();
        } else {
            $("#terms-and-conditions-text").slideUp();
        }
    });
}

fOnSubmit = function () {
   $("#trade-bitcoin-btn").click(function () {
       var form = $(this).parents('form');

       $.ajax({
           type: 'GET',
           url: $(this).attr('action'),
           data: form.serialize(),
           dataType: 'json',
           success: function(response) {
               window.location.href = "https://www.test.com?param=true";
           }
       });
       return true;
   });
}

fOnNavigate = function () {
    $("#navArrowImg").click(function () {
        var y = $(window).scrollTop();
        $("html, body").animate({ scrollTop: y + $(window).height() }, 600);
    });
}

// Middle container (articles & bitcoin rate)
fGetRate = function () {
    $.ajax({
        async: true,
        type: "GET",
        url: "https://www.bitstamp.net/api/ticker/",
        success: function(result) {
            data = result.last;
            $("#dailyRate").html(data + " USD");
        }
    });
}

// Bottom container (accordion)
fAccordion = function () {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }
}

$(document).ready(function () {
    fOnHover();
    fOnCheckTermsAndConditions();
    fOnSubmit();
    fOnNavigate();
    fGetRate();
    fAccordion();
});