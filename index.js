function openOnCheckbox(checkbox, el) {
    if(checkbox.checked == true) {
        document.getElementById(el).style.display = 'block';
    } else {
        document.getElementById(el).style.display = 'none';
    }
}

document.getElementById('mflslider1').oninput = () => {
    document.getElementById('mflamount1').innerHTML = document.getElementById('mflslider1').value;
    document.getElementById('mflmulti1').innerHTML = 8 + (4 * (document.getElementById('mflslider1').value - 1));
}

document.getElementById('mflslider2').oninput = () => {
    document.getElementById('mflamount2').innerHTML = document.getElementById('mflslider2').value;
    document.getElementById('mflmulti2').innerHTML = 8 + (4 * (document.getElementById('mflslider2').value - 1));
}

document.getElementById('mflslider3').oninput = () => {
    document.getElementById('mflamount3').innerHTML = document.getElementById('mflslider3').value;
    document.getElementById('mflmulti3').innerHTML = 8 + (4 * (document.getElementById('mflslider3').value - 1));
}

document.getElementById('mflslider4').oninput = () => {
    document.getElementById('mflamount4').innerHTML = document.getElementById('mflslider4').value;
    document.getElementById('mflmulti4').innerHTML = 8 + (4 * (document.getElementById('mflslider4').value - 1));
}