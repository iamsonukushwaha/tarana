function sharefile1()
{
    var copyText = document.getElementById("link1").innerHTML;
    window.open("https://api.whatsapp.com/send/?text="+copyText,'_blank');
}

function sharefile3()
{
    var copyText3 = document.getElementById("link1").innerHTML;
    window.open("https://twitter.com/intent/tweet?text="+copyText3,'_blank');
}

function sharefile4()
{
    var copyText = document.getElementById("link1").innerHTML;
    window.open("https://facebook.com/sharer/sharer.php?u="+copyText,'_blank');
}

function sharefile5()
{
    var copyText = document.getElementById("link1").innerHTML;
    window.open("https://telegram.org/send?text="+copyText,'_blank');
}