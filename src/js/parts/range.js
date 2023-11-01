import dhx from 'dhx-suite'

const ranges = document.querySelectorAll('.range');
if (ranges.length) {
    ranges.forEach(item => range(item))
}

function range(range) {
    if (!range) return;

    const rangeElem = range.querySelector('.range-slider');
    const min = +range.dataset.min ? +range.dataset.min : 0;
    const max = +range.dataset.max ? +range.dataset.max : 0;
    const step = +range.dataset.step ? +range.dataset.step : 1;
    const inputMin = range.querySelector('.range-min');
    const inputMax = range.querySelector('.range-max');

    const sliderRange = new dhx.Slider(range.querySelector('.range-slider'), {
        min: min,
        max: max,
        step: step,
        range: true,
        value: [min, max]
    });


    sliderRange.events.on('change', function () {
        inputMin.textContent = sliderRange.getValue()[0]
        inputMax.textContent = sliderRange.getValue()[1]
    });


    return sliderRange;
}