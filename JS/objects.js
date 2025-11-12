// objects.js
const employer = {
  name: "TechNova Solutions",
  founded: 2015,
  location: {
    city: "Skopje",
    country: " Macedonia"
  },
  employees: [
    {
      id: 1,
      name: "Ana Petrova",
      position: "Frontend Developer",
      monthlySalaries: [1200, 1250, 1230, 1300, 1350, 1320, 1400, 1380, 1420, 1450, 1470, 1500],
      getAverageSalary() {
        var avg = 0.0;
        var total = 0;
        for (var i = 0; i < this.monthlySalaries.length; i++) {
          total += this.monthlySalaries[i];
        }
        avg = total / this.monthlySalaries.length;
        return avg.toFixed(2);
    }
    },
    {
      id: 2,
      name: "Marko Iliev",
      position: "Backend Developer",
      monthlySalaries: [1500, 1520, 1550, 1580, 1600, 1620, 1650, 1680, 1700, 1750, 1800, 1850],
      getAverageSalary() {
       var avg = 0.0;
        var total = 0;
        for (var i = 0; i < this.monthlySalaries.length; i++) {
          total += this.monthlySalaries[i];
        }
        avg = total / this.monthlySalaries.length;
        return avg.toFixed(2);
      }
    },
    {
      id: 3,
      name: "Elena Georgieva",
      position: "Project Manager",
      monthlySalaries: [2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550],
      getAverageSalary() {
        var avg = 0.0;
        var total = 0;
        for (var i = 0; i < this.monthlySalaries.length; i++) {
          total += this.monthlySalaries[i];
        }
        avg = total / this.monthlySalaries.length;
        return avg.toFixed(2);
      }
    }
  ],
  getCompanyAverageSalary() {
    var total = 0;
    var count = 0;

    for (var i = 0; i < this.employees.length; i++) {
    var emp = this.employees[i];
    total += parseFloat(emp.getAverageSalary());
    count++;
    }

    var avg = total / count;
    return avg.toFixed(2);
  },
  summary() {
    console.log(`Employer: ${this.name}`);
    console.log(`Location: ${this.location.city}, ${this.location.country}`);
    console.log(`Number of Employees: ${this.employees.length}`);
    console.log("Average Salaries per Employee:");
    this.employees.forEach(emp => {
      console.log(`   - ${emp.name} (${emp.position}): €${emp.getAverageSalary()}`);
    });
    console.log(`Company-wide Average Salary: €${this.getCompanyAverageSalary()}`);
  }
};

employer.summary();
