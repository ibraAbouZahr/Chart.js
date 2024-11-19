import Chart from "chart.js/auto";
import { getAquisitionsByYear } from "./api";

(async function () {
  const data = await getAquisitionsByYear();

  const chartAreaBorder = {
    id: "chartAreaBorder",

    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;

      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    plugins: [chartAreaBorder],
    options: {
      plugins: {
        chartAreaBorder: {
          borderColor: "black",
          borderWidth: 5,
          borderDash: [6, 5],
          borderDashOffset: 6,
        },
      },
      animation: true,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
})();
