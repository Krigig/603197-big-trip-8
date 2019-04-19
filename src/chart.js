import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {getDiffTime} from './utils.js';

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;

const getMoneyChart = (label, dataStatictic) => {
  const moneyCtx = document.querySelector(`.statistic__money`);
  moneyCtx.height = BAR_HEIGHT * 20;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: label,
      datasets: [{
        data: dataStatictic,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};

const getTransportChart = (label, dataStatictic) => {
  const transportCtx = document.querySelector(`.statistic__transport`);
  transportCtx.height = BAR_HEIGHT * 6;

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: label,
      datasets: [{
        data: dataStatictic,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};

const getTimeSpendChart = (label, dataStatictic) => {
  const timeSpendCtx = document.querySelector(`.statistic__time-spend`);
  timeSpendCtx.height = BAR_HEIGHT * 6;

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: label,
      datasets: [{
        data: dataStatictic,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};

const getChart = (data) => {
  const statisticContainer = document.querySelector(`.statistic`);
  statisticContainer.innerHTML = `<div class="statistic__item statistic__item--money">
  <canvas class="statistic__money" width="900"></canvas>
</div>

<div class="statistic__item statistic__item--transport">
  <canvas class="statistic__transport" width="900"></canvas>
</div>

<div class="statistic__item statistic__item--time-spend">
  <canvas class="statistic__time-spend" width="900"></canvas>
</div>`;

  const moneyArray = data.map((it) => {
    if (it.offers.length !== 0) {
      return +it.price + it.offers.reduce((acc, item) => acc + +[item.accepted ? item.price : 0], 0);
    } else {
      return +it.price;
    }
  });

  const moneyLabel = data.map((it) => it.icon + ` ` + it.type.toUpperCase());
  getMoneyChart(moneyLabel, moneyArray);

  const transportStaticticData = data.map((it) => it.icon + ` ` + it.type.toUpperCase()).reduce((acc, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});

  const transportLabel = Object.keys(transportStaticticData);
  const transportData = Object.values(transportStaticticData);

  getTransportChart(transportLabel, transportData);

  const timeSpentStaticticData = data.map((it) => ({name: it.icon + ` ` + it.type.toUpperCase(), time: getDiffTime(it.date, it.dateEnd)}))
    .reduce((acc, item) => {
      if (acc[item.name]) {
        acc[item.name] += item.time;
      } else {
        acc[item.name] = item.time;
      }
      return acc;
    }, {});
  const timeSpendLabel = Object.keys(timeSpentStaticticData);
  const timeSpendData = Object.values(timeSpentStaticticData).map((it) => Math.floor(it / 60));
  getTimeSpendChart(timeSpendLabel, timeSpendData);
};

export {getChart};
