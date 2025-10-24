class Employee {
  constructor(name, age, annualSalary) {
    this.name = name;
    this.age = age;
    this.annualSalary = annualSalary;
  }
}

class PartTime extends Employee {
  constructor(name, age, annualSalary, hours, payRate, type) {
    super(name, age, annualSalary);
    this.hours = hours;
    this.payRate = payRate;
    this.type = type;
  }
  calculatePay() {}
}

class Manager extends Employee {
  constructor(name, age, annualSalary, payRate, type) {
    super(name, age, annualSalary);
    this.payRate = payRate;
    this.type = type;
  }
  calculatePay() {}
}

class Main {
  constructor() {}
}

() => {};
