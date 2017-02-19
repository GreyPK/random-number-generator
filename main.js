// Генерируем выборку с равномерным распределением
function generateSample(sampleSize, basicRandom) {

    document.getElementById('randomView').innerHTML = 'Генерируем набор базовых случайных величин' + '<br \/>';
    document.getElementById('randomView').innerHTML += 'Первые 50 чисел выборки:' + '<br \/>'; 
    for (var i = 0; i < sampleSize; i++) {
        basicRandom = (1 / Math.PI) * Math.atan(1 / Math.tan(Math.PI * basicRandom / 0.01)) + 0.5;
        randomArray.push(basicRandom);          
        if(i<50){
            document.getElementById('randomView').innerHTML += randomArray[i].toFixed(5) + '; ';
        }
    }
    document.getElementById('randomView').innerHTML += '<br \/>' + 'Гистограмма базовых случайных величин:' + '<br \/>';
    createGistogram(0, 1, randomArray, uniformGistoArray);
    document.getElementById('randomView').innerHTML += '<br \/>';
}
// Создаем гистограмму
function createGistogram(minInterval, maxInterval, argArray, gistoArray) {
    // Сортируем массив по возрастанию
    argArray.sort(function(a, b) {
        return a - b;
    });
    //Создаем массив для интервала карманов
    var delta = (maxInterval - minInterval)/10;
    pocketsArray = [];
    pocketsArray[0] = minInterval;
    for (var i = 1; i < 11; i++) {
      pocketsArray[i] = pocketsArray[i-1] + delta; 
    }

    for (var i = 0; i < 10; i++) {
        gistoArray[i] = 0;
    }

    var i = 0;
    var j = 0;
    do {        
        if (argArray[j] >= pocketsArray[i] && argArray[j] < pocketsArray[i+1]) {
            gistoArray[i]++;
            j++;

        }
        else {
            i++;
        }
    }while(i < pocketsArray.length);

    var tableText = '<table> <col width="170" valign="top"> <tr> <td> Карман </td> <td> Частота </td> </tr> </td>';
    // document.getElementById('randomView').innerHTML += 'Карман Частота Теор.Значение' + '<br \/>';
    for (var i = 0; i < 10; i++) {
      tableText += '<tr> <td>[' + pocketsArray[i].toFixed(3) + '; ' + pocketsArray[i+1].toFixed(3) + ') </td><td> ' + gistoArray[i] + '</td></tr>';
    }
    tableText += '</table>';
    document.getElementById('randomView').innerHTML += tableText;
}

// Создаем выборку через обратную функцию показательного распределения
function inverseFunction() {
    document.getElementById('randomView').innerHTML += 'Генерируем выборку через обратную функцию показательного распределения' + '<br \/>';
    document.getElementById('randomView').innerHTML += 'Первые 50 чисел выборки:' + '<br \/>'; 
	for (var i = 0; i < randomArray.length; i++) {
		inverseArray.push(-Math.log(1.5 - randomArray[i]));
        if(i<50){
            document.getElementById('randomView').innerHTML += inverseArray[i].toFixed(5) + '; ';
        }
	}    
    document.getElementById('randomView').innerHTML += '<br \/>' +'Гистограмма обратной функции показательного закона распределения:' + '<br \/>';
    createGistogram(-0.41, 0.7, inverseArray, inverceGistoArray);
    document.getElementById('randomView').innerHTML += '<br \/>';
}

//Функция плотности распределения показательного закона
function exponentialFunction() {
    document.getElementById('randomView').innerHTML += 'Генерируем выборку через функцию плотности показательного распределения' + '<br \/>';
    document.getElementById('randomView').innerHTML += 'Первые 50 чисел выборки:' + '<br \/>'; 
    
    for (var i = 0; i < randomArray.length; i++) {
        exponentialArray.push(Math.exp(-randomArray[i]));
        if(i<50){
            document.getElementById('randomView').innerHTML += exponentialArray[i].toFixed(5) + '; ';
        }
    }
    document.getElementById('randomView').innerHTML += '<br \/>' + 'Гистограмма плотности теоретической выборки показательного закона распределения:' + '<br \/>';
    createGistogram(0.3678, 1, exponentialArray, exponentialGistoArray);
    document.getElementById('randomView').innerHTML += '<br \/>';
}

//Функция расчета расхождения фактический с теоретической выборкой
function differenceFunc()  {
    document.getElementById('randomView').innerHTML += 'Расхождение на каждом интервале от теоретической и практической выборки показательного закона распределения:' + '<br \/>';
    for (var i = 0; i < 10; i++) {
        document.getElementById('randomView').innerHTML += 'На ' + (i+1) + ' интервале: ' + (exponentialGistoArray[i] - inverceGistoArray[i]) + '<br \/>';
    }
}


function randomGenerator() {
    var sampleSize = document.getElementById("sampleSize").value
    var basicRandom = document.getElementById("basicRandom").value

    if (isNaN(sampleSize) || sampleSize == '')
        document.getElementById('randomView').innerHTML = 'Введите размер выборки!';
    else {
        if ((isNaN(basicRandom) || basicRandom == '') || (basicRandom <= 0 && basicRandom >= 1)) basicRandom = Math.random();

        randomArray = [];
        //Массив для хранения частоты гистограммы
        uniformGistoArray = [];

        inverseArray = [];
        //Массив для хранения частоты гистограммы
        inverceGistoArray = [];

        exponentialArray = [];
        //Массив для хранения частоты гистограммы
        exponentialGistoArray = [];

        generateSample(sampleSize, basicRandom);
        inverseFunction();
        exponentialFunction();
        differenceFunc();
    }
    
}

function clearRandomView() {
    document.getElementById('randomView').innerHTML = '';    
}