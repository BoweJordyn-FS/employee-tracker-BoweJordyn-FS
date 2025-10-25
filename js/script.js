class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}

class PartTime extends Employee {
  constructor(name, age, hours, payRate) {
    super(name, age);
    this.hours = hours;
    this.payRate = payRate;
    this.type = "Part-Time";
    //calculate salary
    this.calculatePay();
  }
  calculatePay() {
    //part time salary based on hours per week times 52
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.type = "Full-Time";
    this.calculatePay();
  }
  calculatePay() {
    //full time salary 40 hours minus 1000
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}

class Main {
  constructor() {
    this.employees = [];

    //Preset Employees
    this.employees.push(new PartTime("Mary", 28, 12, 20));
    this.employees.push(new PartTime("Jack", 20, 15, 25));
    this.employees.push(new Manager("Carl", 38, 25));

    this.displayEmployees();
    this.mainMenu();
  }
  // display employee table in the console
  displayEmployees() {
    console.clear();
    console.log("Bob's Burger Joint");
    console.log("ID\tName\tSalary\tHrs\tPay\tFT/PT");

    //loop through each employee and log their data
    this.employees.forEach((emp, i) => {
      let hours = emp.hours || "40+";
      console.log(
        `${i + 1}\t${emp.name}\t${emp.annualSalary}\t${hours}\t${
          emp.payRate
        }\t${emp.type}`
      );
    });
  }

  addEmployee() {
    const input = prompt("Enter name, age, payRate, hours (comma separated):");
    if (!input) return;

    const [name, ageString, payRateString, hoursString] = input.split(",");
    const age = parseInt(ageString);
    const payRate = parseFloat(payRateString);
    const hours = parseInt(hoursString);

    //if hours are 40+ add manager otherwise add part-time
    if (hours >= 40) {
      this.employees.push(new Manager(name, age, payRate));
    } else {
      this.employees.push(new PartTime(name, age, payRate, hours));
    }

    this.displayEmployees();
  }

  removeEmployee() {
    const input = prompt("Enter employee ID or Name to remove:");
    if (!input) return;

    if (isNaN(input)) {
      //remove by name but not case sensitive
      const name = input.trim().toLowerCase();
      this.employees = this.employees.filter(
        (emp) => emp.name.toLowerCase() !== name
      );
    } else {
      //remove by id
      const index = parseInt(input) - 1;
      if (index >= 0 && index < this.employees.length) {
        this.employees.splice(index, 1);
      }
    }

    this.displayEmployees();
  }

  editEmployee() {
    const idStr = prompt("Enter the employee ID to edit payRate:");
    const id = parseInt(idStr) - 1;

    if (id < 0 || id >= this.employees.length) return;

    const newPay = parseFloat(prompt("Enter new payRate:"));
    if (isNaN(newPay)) return;

    const emp = this.employees[id];
    emp.payRate = newPay;
    //recalulate salary
    emp.calculatePay();

    this.displayEmployees();
  }

  mainMenu() {
    const menu = `
Choose an option:
1 - Add Employee
2 - Remove Employee
3 - Edit Employee
4 - Display Employees
5 - Exit`;

    const choice = prompt(menu);

    if (choice === "1") {
      this.addEmployee();
    } else if (choice === "2") {
      this.removeEmployee();
    } else if (choice === "3") {
      this.editEmployee();
    } else if (choice === "4") {
      this.displayEmployees();
    } else if (choice === "5") {
      alert("Have a good day!");
      return this.mainMenu();
    } else {
      //invald input error
      alert("Please choose one of the options in the Main Menu");
      return this.mainMenu(); //repeat menu
    }
  }
}

(() => {
  new Main();
})();
