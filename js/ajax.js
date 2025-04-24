const endpoint = "http://gamf.nhely.hu/ajax2/";

function getInputValue(id) {
  return document.getElementById(id).value.trim();
}

function showStatus(message, isError = false) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = isError ? "status error" : "status";
}

function createData() {
  const name = getInputValue("name");
  const height = getInputValue("height");
  const weight = getInputValue("weight");
  const code = getInputValue("code");

  if (!name || !height || !weight || !code || name.length > 30) {
    showStatus("Hibás adat! Minden mező kötelező, max 30 karakter!", true);
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ op: "create", name, height, weight, code })
  })
  .then(res => res.text())
  .then(res => showStatus("Sikeres hozzáadás!"))
  .catch(() => showStatus("Hiba történt a hozzáadás során.", true));
}

function readData() {
  const code = getInputValue("code");

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ op: "read", code })
  })
  .then(res => res.json())
  .then(data => {
    const list = data.list || [];
    let html = "<h3>Adatok</h3>";
    let total = 0, max = 0;

    list.forEach(item => {
      html += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</p>`;
      const h = parseFloat(item.height);
      total += h;
      if (h > max) max = h;
    });

    document.getElementById("output").innerHTML = html;
    document.getElementById("statistics").innerHTML =
      `<strong>Magasság összeg:</strong> ${total}<br>
       <strong>Átlag:</strong> ${(total / list.length).toFixed(2)}<br>
       <strong>Legnagyobb:</strong> ${max}`;
  });
}

function getDataForId() {
  const id = getInputValue("id");
  const code = getInputValue("code");

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ op: "read", code })
  })
  .then(res => res.json())
  .then(data => {
    const item = data.list.find(e => e.id === id);
    if (item) {
      document.getElementById("name").value = item.name;
      document.getElementById("height").value = item.height;
      document.getElementById("weight").value = item.weight;
      showStatus("Adatok betöltve.");
    } else {
      showStatus("Nem található ilyen ID.", true);
    }
  });
}

function updateData() {
  const id = getInputValue("id");
  const name = getInputValue("name");
  const height = getInputValue("height");
  const weight = getInputValue("weight");
  const code = getInputValue("code");

  if (!id || !name || !height || !weight || !code || name.length > 30) {
    showStatus("Hibás adat! Minden mező kötelező, max 30 karakter!", true);
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ op: "update", id, name, height, weight, code })
  })
  .then(res => res.text())
  .then(res => showStatus("Sikeres módosítás!"))
  .catch(() => showStatus("Hiba történt a módosítás során.", true));
}

function deleteData() {
  const id = getInputValue("id");
  const code = getInputValue("code");

  if (!id || !code) {
    showStatus("Az ID és a code megadása kötelező!", true);
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ op: "delete", id, code })
  })
  .then(res => res.text())
  .then(res => showStatus("Sikeres törlés!"))
  .catch(() => showStatus("Hiba történt a törlés során.", true));
}
