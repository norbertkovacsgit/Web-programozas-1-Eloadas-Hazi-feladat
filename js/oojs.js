class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `${this.name}, ${this.age} éves`;
  }
}

class User extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  getRole() {
    return `Szerepkör: ${this.role}`;
  }

  render(index, removeCallback) {
    const container = document.createElement("div");
    container.className = "user-card";

    const nameEl = document.createElement("h3");
    nameEl.textContent = this.introduce();

    const roleEl = document.createElement("p");
    roleEl.textContent = this.getRole();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Törlés";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      removeCallback(index);
    };

    container.appendChild(nameEl);
    container.appendChild(roleEl);
    container.appendChild(deleteBtn);
    return container;
  }
}

class UserApp {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
    this.users = [];
    this.form = this.createForm();
    this.listContainer = document.createElement("div");
    this.listContainer.id = "user-list";
    this.root.appendChild(this.form);
    this.root.appendChild(this.listContainer);
    this.addUser("Anna", 24, "Admin");
    this.addUser("Béla", 30, "Fejlesztő");
    this.addUser("Csilla", 21, "Tesztelő");
  }

  createForm() {
    const form = document.createElement("form");
    form.className = "user-form";
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = form.querySelector("#username").value;
      const age = parseInt(form.querySelector("#age").value);
      const role = form.querySelector("#role").value;
      if (name && !isNaN(age) && role) {
        this.addUser(name, age, role);
        form.reset();
      }
    };

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Név";
    nameInput.id = "username";

    const ageInput = document.createElement("input");
    ageInput.type = "number";
    ageInput.placeholder = "Életkor";
    ageInput.id = "age";

    const roleInput = document.createElement("input");
    roleInput.type = "text";
    roleInput.placeholder = "Szerepkör";
    roleInput.id = "role";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Hozzáadás";
    submitBtn.type = "submit";

    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(roleInput);
    form.appendChild(submitBtn);

    return form;
  }

  addUser(name, age, role) {
    this.users.push(new User(name, age, role));
    this.render();
  }

  removeUser(index) {
    this.users.splice(index, 1);
    this.render();
  }

  render() {
    this.listContainer.innerHTML = "";
    this.users.forEach((user, index) => {
      const userEl = user.render(index, this.removeUser.bind(this));
      this.listContainer.appendChild(userEl);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new UserApp("app");
});
