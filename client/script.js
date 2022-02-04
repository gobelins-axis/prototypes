const buttonRed = document.querySelector('.js-red');
const buttonBlue = document.querySelector('.js-blue');

buttonRed.addEventListener('click', () => {
    postColor('red');
});

buttonBlue.addEventListener('click', () => {
    postColor('blue');
});

function postColor(color) {
    fetch('http://localhost:6842/go', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color }),
    }).then((res) => {
        // console.log('Request complete! response:', res);
    });
}