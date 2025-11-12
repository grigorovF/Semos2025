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


//arrays

console.log("-----Arrays-----");

// USA country object with 10 cities
const country = {
  name: "United States of America",
  cities: [
    { name: "New York City", population: 8419600 },
    { name: "Los Angeles", population: 3980400 },
    { name: "Chicago", population: 2716000 },
    { name: "Houston", population: 2328000 },
    { name: "Phoenix", population: 1690000 },
    { name: "Philadelphia", population: 1584000 },
    { name: "San Antonio", population: 1547000 },
    { name: "San Diego", population: 1424000 },
    { name: "Dallas", population: 1343000 },
    { name: "San Jose", population: 1035000 }
  ]
};

console.log("Country object:", country);

let cities = [...country.cities]; 

for (let i = 0; i < cities.length - 1; i++) {
  for (let j = 0; j < cities.length - i - 1; j++) {
    if (cities[j].population < cities[j + 1].population) {
      let temp = cities[j];
      cities[j] = cities[j + 1];
      cities[j + 1] = temp;
    }
  }
}

const top3 = cities.slice(0, 3);

console.log("Top 3 most populated cities:");
top3.forEach((city, i) =>
  console.log(`${i + 1}. ${city.name} - ${city.population.toLocaleString()}`)
);

let totalPopulation = 0;
for (let i = 0; i < country.cities.length; i++) {
  totalPopulation += country.cities[i].population;
}

const avgPopulation = totalPopulation / country.cities.length;
console.log(`Average population: ${Math.round(avgPopulation).toLocaleString()}`);