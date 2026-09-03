// Static GitHub Pages dashboard controller.
// The future production path is: notebook or Python script -> JSON -> this Plotly view.

const gradeColours = {
  A: "#5e8d5a",
  B: "#78a95c",
  C: "#e8b84a",
  D: "#d98d4f",
  F: "#d86c5b",
};

const siteDetails = {
  "Competition Lake": {
    description:
      "Main rowing course monitoring location with routine microbial, algal, and physico-chemical sampling.",
    grade: "B",
    watch: "Enterococci after rainfall",
  },
  "Warm Up Lake": {
    description:
      "Secondary recreation and training area where algal biomass and dissolved oxygen are tracked for event readiness.",
    grade: "B",
    watch: "Chlorophyll-a in warm weather",
  },
  "Final Basin": {
    description:
      "Downstream basin location used to understand water movement, mixing, and cumulative water quality signals.",
    grade: "C",
    watch: "Lower morning oxygen",
  },
};

const plotLayout = (yTitle, thresholdLabel) => ({
  margin: { t: 20, r: 18, b: 48, l: 58 },
  paper_bgcolor: "#ffffff",
  plot_bgcolor: "#fbfaf6",
  font: { family: "Arial, Helvetica, sans-serif", color: "#17313b" },
  hovermode: "x unified",
  xaxis: {
    showgrid: false,
    tickfont: { size: 11 },
  },
  yaxis: {
    title: yTitle,
    zeroline: false,
    gridcolor: "#e7ece5",
  },
  legend: {
    orientation: "h",
    x: 0,
    y: 1.12,
  },
  shapes: [],
  annotations: [
    {
      text: thresholdLabel,
      xref: "paper",
      yref: "paper",
      x: 1,
      y: 1.04,
      xanchor: "right",
      showarrow: false,
      font: { size: 11, color: "#5d7076" },
    },
  ],
});

function rollingAverage(values, windowSize = 4) {
  // Simple trailing rolling average for placeholder weekly data.
  return values.map((_, index) => {
    const start = Math.max(0, index - windowSize + 1);
    const slice = values.slice(start, index + 1);
    return Number((slice.reduce((sum, value) => sum + value, 0) / slice.length).toFixed(2));
  });
}

function thresholdShape(dates, value) {
  return {
    type: "line",
    x0: dates[0],
    x1: dates[dates.length - 1],
    y0: value,
    y1: value,
    line: { color: "#d86c5b", width: 2, dash: "dot" },
  };
}

function drawTrendChart(containerId, dates, values, metric) {
  const rolling = rollingAverage(values);
  const layout = plotLayout(metric.yTitle, metric.thresholdLabel);
  layout.shapes = [thresholdShape(dates, metric.threshold)];

  Plotly.newPlot(
    containerId,
    [
      {
        x: dates,
        y: values,
        type: "scatter",
        mode: "lines+markers",
        name: "Weekly sample",
        line: { color: metric.colour, width: 2 },
        marker: { size: 7 },
      },
      {
        x: dates,
        y: rolling,
        type: "scatter",
        mode: "lines",
        name: "4-week average",
        line: { color: "#17313b", width: 3 },
      },
    ],
    layout,
    { responsive: true, displayModeBar: false }
  );
}

function drawEnterococciChart(siteData) {
  const colours = siteData.enterococci.map((value) =>
    value <= 40 ? "#5e8d5a" : value <= 200 ? "#e8b84a" : "#d86c5b"
  );
  const layout = plotLayout("Enterococci CFU/100 mL", "Demo threshold: 200 CFU/100 mL");
  layout.shapes = [thresholdShape(siteData.dates, 200)];

  Plotly.newPlot(
    "enterococciChart",
    [
      {
        x: siteData.dates,
        y: siteData.enterococci,
        type: "bar",
        name: "Weekly sample",
        marker: { color: colours },
      },
    ],
    layout,
    { responsive: true, displayModeBar: false }
  );
}

function updateSiteDetail(siteName) {
  const detail = siteDetails[siteName];
  document.querySelectorAll(".site-marker").forEach((marker) => {
    marker.classList.toggle("active", marker.dataset.site === siteName);
  });
  document.querySelector("#selectedSiteName").textContent = siteName;
  document.querySelector("#selectedSiteDescription").textContent = detail.description;
  document.querySelector("#selectedSiteGrade").textContent = detail.grade;
  document.querySelector("#selectedSiteGrade").style.color = gradeColours[detail.grade];
  document.querySelector("#selectedSiteWatch").textContent = detail.watch;
}

function renderDashboard(data, siteName) {
  const siteData = data.sites[siteName];
  drawTrendChart("chlorophyllChart", siteData.dates, siteData.chlorophyll_a, {
    yTitle: "Chlorophyll-a ug/L",
    threshold: data.thresholds.chlorophyll_a,
    thresholdLabel: "Demo threshold: 10 ug/L",
    colour: "#3d9db3",
  });
  drawTrendChart("oxygenChart", siteData.dates, siteData.dissolved_oxygen, {
    yTitle: "Dissolved oxygen mg/L",
    threshold: data.thresholds.dissolved_oxygen,
    thresholdLabel: "Demo minimum: 6 mg/L",
    colour: "#5e8d5a",
  });
  drawEnterococciChart(siteData);
  updateSiteDetail(siteName);
}

async function init() {
  const response = await fetch("data/sample_water_quality.json");
  const data = await response.json();
  const siteSelect = document.querySelector("#siteSelect");

  Object.keys(data.sites).forEach((siteName) => {
    const option = document.createElement("option");
    option.value = siteName;
    option.textContent = siteName;
    siteSelect.appendChild(option);
  });

  siteSelect.addEventListener("change", (event) => renderDashboard(data, event.target.value));
  document.querySelectorAll(".site-marker").forEach((marker) => {
    marker.addEventListener("click", () => {
      siteSelect.value = marker.dataset.site;
      renderDashboard(data, marker.dataset.site);
    });
  });

  renderDashboard(data, "Competition Lake");
}

window.addEventListener("DOMContentLoaded", init);
