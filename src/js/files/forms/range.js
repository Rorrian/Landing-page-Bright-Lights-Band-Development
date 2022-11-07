// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
    //Общий контейнер всех спойлеров
    const rangeItems = document.querySelectorAll("[data-range]");
    if (rangeItems.length) {
        rangeItems.forEach(rangeItem => {
            //Инпуты с начальными и конечными значениями range
            const fromValue = rangeItem.querySelector("[data-range-from]");
            const toValue = rangeItem.querySelector("[data-range-to]");
            const inputs = [fromValue, toValue];

            //Контейнер(div) в котором будет создаваться range - noUiSlider
            const item = rangeItem.querySelector("[data-range-item]");

            //Создание элемента noUiSlider
            //Кусок взят из тела ф-и "if (priceSlider)" ниже
            noUiSlider.create(item, {
                start: [Number(fromValue.value), Number(toValue.value)], // [0,200000]
                connect: true,
                step: 1,
                tooltips: [true, true], //Подсказки со значениями над ползунками
                range: {
                    'min': [Number(fromValue.dataset.rangeFrom)],
                    'max': [Number(toValue.dataset.rangeTo)]
                },
            });

            //Связывание range и input'ов
            item.noUiSlider.on("update", function (values, handle) {
                //values - значение ползунков, handle - сами ползунки: 0 - первый, 1 - второй
                //у нас есть массив inputs, в кот. 0й эл-т это первый инпут, кот зависит от первого ползунка и второй соответственно

                //При изменении слайдера(взаимодействии с ползунками),
                // мы соответственно устанавливаем значение 1го инпута как значением первого ползунка
                inputs[handle].value = Number(values[handle]);

                //При перемещении ползунка также нужно изменять tooltips
                const arrTooltips = document.querySelectorAll('.noUi-tooltip');
                arrTooltips[handle].innerHTML = '$' + Number(values[handle]);
            });

            //Наоборот: связывание input'ов и range
            const setRangeSlider = (i, value) => {
                //i - индекс инпута(+ползунка кот. нужно менять), value - его новое значение

                //Массив значений обоих ползунков: 1й эл-т - 1 ползунок, 2 аналогично
                let arr = [null, null];
                arr[i] = value;

                //Передаем массив с значениями: индекс ползунка/инпута и его новое знаечние
                // для изменения значений ползунков при вводе данных в инпуты
                item.noUiSlider.set(arr);
            };
            //На каждый инпут навешиваем событие при вводе - изменение значения ползунка
            inputs.forEach((el, index)=>{
                el.addEventListener("change", (e)=>{
                    //Устанавливаем значение для index-го ползунка значение текущего инпута - currentTarget
                    setRangeSlider(index, e.currentTarget.value);
                })
            })
        });
    }
}

rangeInit();
