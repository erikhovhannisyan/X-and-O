let count = 0;
let start = 0;
let h1 = document.getElementById("hashiv_1");
let tiv_1 = document.getElementById('tiv_1');
let tiv_2 = document.getElementById('tiv_2')
let h2 = document.getElementById("hashiv_2");
let player_1 = document.getElementById("player_1");
let player_2 = document.getElementById("player_2");
let qayl = document.getElementById("name");
let tableDiv = document.getElementById("table");
let p_1 = 0;
let p_2 = 0;

knopka.onclick = function () {
    qayl.style.display = 'block';
    h1.style.display = 'block';
    h2.style.display = 'block';

    if (start == 0) {
        knopka.innerHTML = 'Play Again';
        if (player_1.value == '') {
            player_1.value = 'Player X';
        }
        if (player_2.value == '') {
            player_2.value = 'Player O';
        }
        qayl.innerHTML = player_1.value + " `s Turn ";
        game();
        start++;
    } else {
        ret();
    }
}

function game() {
    let table = document.createElement('table');
    table.style.top = '300px'
    table.style.left = '36%'
    for (i = 0; i < 3; i++) {
        let tr = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            let td = document.createElement('td');
            td.setAttribute('class', 'td');
            td.style.width = '150px';
            td.style.fontSize = '0px';
            td.style.backgroundSize = 'cover';
            td.style.height = '150px';
            td.style.border = 'solid 3px black';
            td.style.textAlign = 'center'
            td.onclick = function () {
                if (td.innerHTML == '') {
                    if (count % 2 == 0) {
                        td.innerHTML = "X";
                        td.style.backgroundImage = "url('./x.webp')"
                        qayl.innerHTML = player_2.value + '`s Turn ';
                    } else {
                        td.innerHTML = "O";
                        td.style.backgroundImage = "url('./o.png')"
                        qayl.innerHTML = player_1.value + '`s Turn ';
                    }
                    count++;
                    win();
                }
            }
            tr.append(td)
        }
        table.append(tr);
    }
    tableDiv.append(table);
}

function ret() {
    let td = document.getElementsByClassName('td');
    for (let i = 0; i < td.length; i++) {
        td[i].innerHTML = '';
        td[i].style.backgroundImage = 'none';
        qayl.innerHTML = player_1.value + '`s Turn ';
    }
    count = 0;
}

function clearClick() {
    let td = document.getElementsByClassName('td');
    for (let i = 0; i < td.length; i++) {
        td[i].onclick = null;
    }
}

function win() {
    let n = false;
    const comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let win = document.getElementById('win')
    let td = document.getElementsByClassName('td');
    for (let i = 0; i < comb.length; i++) {
        if (td[comb[i][0]].innerHTML == 'X' && td[comb[i][1]].innerHTML == 'X' && td[comb[i][2]].innerHTML == 'X') {
            n = true;
            clearClick();
            setTimeout(() => {
                win.style.display = 'block';
                p_1++;
                tiv_1.innerHTML = p_1 + '';
                win.innerHTML = player_1.value + ' Win';
                setTimeout(() => {
                    ret();
                    win.style.display = 'none';
                    tableDiv.innerHTML = '';
                    game();
                }, 2000);
            }, 500);
        }
        if (td[comb[i][0]].innerHTML == 'O' && td[comb[i][1]].innerHTML == 'O' && td[comb[i][2]].innerHTML == 'O') {
            n = true;
            clearClick();
            setTimeout(() => {
                win.style.display = 'block';
                p_2++;
                tiv_2.innerHTML = p_2 + '';
                win.innerHTML = player_2.value + ' win';
                setTimeout(() => {
                    ret();
                    win.style.display = 'none';
                    tableDiv.innerHTML = '';
                    game();
                }, 2000);
            }, 500);
        }
    }
    if (n == false && count == 9) {
        setTimeout(() => {
            clearClick();
            win.style.display = 'block'
            win.innerHTML = 'It`s a Draw';
            setTimeout(() => {
                ret();
                win.style.display = 'none';
                tableDiv.innerHTML = '';
                game();
            }, 2000);
        }, 500);
    }
}