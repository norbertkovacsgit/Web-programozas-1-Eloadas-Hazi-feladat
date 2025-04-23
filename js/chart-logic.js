
const ctx = document.getElementById('lineChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Adat1", "Adat2", "Adat3", "Adat4", "Adat5"],
    datasets: [{
      label: "Kiválasztott sor adatai",
      data: [],
      borderColor: "#3498db",
      backgroundColor: "rgba(52, 152, 219, 0.2)",
      borderWidth: 2,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: "#3498db"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#eee" }},
      x: { grid: { color: "#eee" }}
    }
  }
});

const tableRows = document.querySelectorAll("#dataTable tbody tr");
tableRows.forEach(row => {
  row.addEventListener("click", () => {
    const cells = row.querySelectorAll("td");
    const values = Array.from(cells).slice(1).map(cell => Number(cell.textContent));
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].label = cells[0].textContent + " adatai";
    chart.update();
  });
});
