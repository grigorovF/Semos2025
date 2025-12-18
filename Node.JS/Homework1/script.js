const studenti = [
  { ime: "Ivan", prezime: "Ivanov", indeks: "10001", prosek: 8.0, mestoNaZiveenje: "Skopje" },
  { ime: "Ana", prezime: "Andrevska", indeks: "10002", prosek: 9.1, mestoNaZiveenje: "Bitola" },
  { ime: "Marko", prezime: "Markov", indeks: "10003", prosek: 7.5, mestoNaZiveenje: "Tetovo" },
  { ime: "Ema", prezime: "Petrova", indeks: "10004", prosek: 8.8, mestoNaZiveenje: "Ohrid" },
  { ime: "Nikola", prezime: "Stojanov", indeks: "10005", prosek: 9.2, mestoNaZiveenje: "Prilep" },
  { ime: "Jovana", prezime: "Nikolovska", indeks: "10006", prosek: 7.9, mestoNaZiveenje: "Shtip" },
  { ime: "Danijel", prezime: "Pavlov", indeks: "10007", prosek: 8.6, mestoNaZiveenje: "Skopje" },
  { ime: "Teodora", prezime: "Gjorgievska", indeks: "10008", prosek: 9.0, mestoNaZiveenje: "Strumica" },
  { ime: "Rade", prezime: "Aleksandrov", indeks: "10009", prosek: 8.3, mestoNaZiveenje: "Kavadarci" },
  { ime: "Lena", prezime: "Kostova", indeks: "10010", prosek: 9.4, mestoNaZiveenje: "Gostivar" },
  { ime: "Bojan", prezime: "Jovanov", indeks: "10011", prosek: 8.1, mestoNaZiveenje: "Kichevo" },
  { ime: "Dasha", prezime: "Markovska", indeks: "10012", prosek: 9.3, mestoNaZiveenje: "Ohrid" },
  { ime: "Aleksandar", prezime: "Georgiev", indeks: "10013", prosek: 8.4, mestoNaZiveenje: "Prilep" },
  { ime: "Sara", prezime: "Mitrova", indeks: "10014", prosek: 6.5, mestoNaZiveenje: "Skopje" },
  { ime: "Tomche", prezime: "Janev", indeks: "10015", prosek: 9.5, mestoNaZiveenje: "Tetovo" },
  { ime: "Mila", prezime: "Savova", indeks: "10016", prosek: 8.9, mestoNaZiveenje: "Strumica" },
  { ime: "Filip", prezime: "Neshkov", indeks: "10017", prosek: 7.7, mestoNaZiveenje: "Veles" },
  { ime: "Nina", prezime: "Vasilevska", indeks: "10018", prosek: 9.0, mestoNaZiveenje: "Bitola" },
  { ime: "Kristina", prezime: "Simonovska", indeks: "10019", prosek: 6.2, mestoNaZiveenje: "Skopje" },
  { ime: "Martin", prezime: "Trajkov", indeks: "10020", prosek: 9.1, mestoNaZiveenje: "Kichevo" },
  { ime: "Luka", prezime: "Petkov", indeks: "10021", prosek: 8.3, mestoNaZiveenje: "Kumanovo" },
  { ime: "Maja", prezime: "Gjorchevska", indeks: "10022", prosek: 7.2, mestoNaZiveenje: "Prilep" },
  { ime: "Viktor", prezime: "Kostov", indeks: "10023", prosek: 9.0, mestoNaZiveenje: "Bitola" },
  { ime: "Sandra", prezime: "Petrovska", indeks: "10024", prosek: 8.5, mestoNaZiveenje: "Kavadarci" },
  { ime: "Dario", prezime: "Stefanov", indeks: "10025", prosek: 9.6, mestoNaZiveenje: "Gevgelija" },
  { ime: "Mihailo", prezime: "Andonov", indeks: "10026", prosek: 8.4, mestoNaZiveenje: "Veles" },
  { ime: "Vera", prezime: "Stojanova", indeks: "10027", prosek: 7.1, mestoNaZiveenje: "Shtip" },
  { ime: "Bojana", prezime: "Jovanovska", indeks: "10028", prosek: 8.2, mestoNaZiveenje: "Kichevo" },
  { ime: "Radoslav", prezime: "Petrovski", indeks: "10029", prosek: 7.8, mestoNaZiveenje: "Kumanovo" },
  { ime: "Katerina", prezime: "Nikoloska", indeks: "10030", prosek: 8.6, mestoNaZiveenje: "Prilep" },
  { ime: "Filip", prezime: "Stefanovski", indeks: "10031", prosek: 8.7, mestoNaZiveenje: "Gostivar" },
  { ime: "Jelena", prezime: "Risteska", indeks: "10032", prosek: 7.0, mestoNaZiveenje: "Ohrid" },
  { ime: "Goran", prezime: "Gjorchev", indeks: "10033", prosek: 8.3, mestoNaZiveenje: "Skopje" },
  { ime: "Kiril", prezime: "Nikoloski", indeks: "10034", prosek: 8.5, mestoNaZiveenje: "Strumica" },
  { ime: "Martina", prezime: "Mitroska", indeks: "10035", prosek: 9.0, mestoNaZiveenje: "Tetovo" },
  { ime: "Mihail", prezime: "Stefanov", indeks: "10036", prosek: 8.4, mestoNaZiveenje: "Veles" },
  { ime: "Teodora", prezime: "Petrovska", indeks: "10037", prosek: 9.2, mestoNaZiveenje: "Kavadarci" },
  { ime: "Oliver", prezime: "Vasilevski", indeks: "10038", prosek: 8.1, mestoNaZiveenje: "Skopje" },
  { ime: "Emilija", prezime: "Radoslavova", indeks: "10039", prosek: 9.4, mestoNaZiveenje: "Gostivar" },
  { ime: "Stefan", prezime: "Nikoloski", indeks: "10040", prosek: 8.8, mestoNaZiveenje: "Prilep" },
  { ime: "Simona", prezime: "Trpeska", indeks: "10041", prosek: 8.9, mestoNaZiveenje: "Strumica" },
  { ime: "Anastasija", prezime: "Nikolovska", indeks: "10042", prosek: 9.0, mestoNaZiveenje: "Bitola" },
  { ime: "Petar", prezime: "Pavlovski", indeks: "10043", prosek: 8.0, mestoNaZiveenje: "Shtip" },
  { ime: "Olivera", prezime: "Markovska", indeks: "10044", prosek: 8.5, mestoNaZiveenje: "Tetovo" },
  { ime: "Viktorija", prezime: "Gjorchevska", indeks: "10045", prosek: 9.3, mestoNaZiveenje: "Skopje" },
  { ime: "Karmen", prezime: "Stojanova", indeks: "10046", prosek: 8.4, mestoNaZiveenje: "Veles" },
  { ime: "Jovana", prezime: "Nikoloska", indeks: "10047", prosek: 7.5, mestoNaZiveenje: "Kavadarci" },
  { ime: "Filip", prezime: "Kovacevski", indeks: "10048", prosek: 9.0, mestoNaZiveenje: "Kumanovo" },
  { ime: "Tanja", prezime: "Dimitrovska", indeks: "10049", prosek: 7.4, mestoNaZiveenje: "Gevegelija" },
  { ime: "Vladimir", prezime: "Trajkovski", indeks: "10050", prosek: 9.7, mestoNaZiveenje: "Bitola" },
  { ime: "Teo", prezime: "Krstevski", indeks: "10051", prosek: 8.3, mestoNaZiveenje: "Tetovo" },
  { ime: "Bojana", prezime: "Trajkova", indeks: "10052", prosek: 8.7, mestoNaZiveenje: "Kumanovo" },
  { ime: "Marko", prezime: "Kovačevski", indeks: "10053", prosek: 7.9, mestoNaZiveenje: "Shtip" },
  { ime: "Biljana", prezime: "Stefanova", indeks: "10054", prosek: 9.4, mestoNaZiveenje: "Veles" },
  { ime: "Radmila", prezime: "Petrovska", indeks: "10055", prosek: 8.2, mestoNaZiveenje: "Prilep" },
  { ime: "Katerina", prezime: "Mihailova", indeks: "10056", prosek: 8.0, mestoNaZiveenje: "Gostivar" },
  { ime: "Dimitar", prezime: "Gjorgievski", indeks: "10057", prosek: 8.9, mestoNaZiveenje: "Ohrid" },
  { ime: "Stefanija", prezime: "Nikoloska", indeks: "10058", prosek: 9.1, mestoNaZiveenje: "Skopje" },
  { ime: "Aleksandar", prezime: "Nikolovski", indeks: "10059", prosek: 9.0, mestoNaZiveenje: "Strumica" },
  { ime: "Tanja", prezime: "Gjorchevska", indeks: "10060", prosek: 7.8, mestoNaZiveenje: "Tetovo" },
  { ime: "Sara", prezime: "Trajkovska", indeks: "10061", prosek: 8.5, mestoNaZiveenje: "Prilep" },
  { ime: "Mihail", prezime: "Kovacevski", indeks: "10062", prosek: 9.2, mestoNaZiveenje: "Skopje" },
  { ime: "Vera", prezime: "Petrovska", indeks: "10063", prosek: 9.3, mestoNaZiveenje: "Gostivar" },
  { ime: "Nina", prezime: "Vasiljeva", indeks: "10064", prosek: 8.1, mestoNaZiveenje: "Strumica" },
  { ime: "Marija", prezime: "Nikoloska", indeks: "10065", prosek: 7.0, mestoNaZiveenje: "Kumanovo" },
  { ime: "Lina", prezime: "Stefanova", indeks: "10066", prosek: 8.6, mestoNaZiveenje: "Skopje" },
  { ime: "Emilija", prezime: "Stefanovska", indeks: "10067", prosek: 7.4, mestoNaZiveenje: "Tetovo" },
  { ime: "Bojan", prezime: "Trpeski", indeks: "10068", prosek: 8.2, mestoNaZiveenje: "Kavadarci" },
  { ime: "Martina", prezime: "Dimitrovska", indeks: "10069", prosek: 9.1, mestoNaZiveenje: "Veles" },
  { ime: "Filip", prezime: "Petrov", indeks: "10070", prosek: 7.8, mestoNaZiveenje: "Strumica" },
  { ime: "Stefanija", prezime: "Kovacevska", indeks: "10071", prosek: 8.9, mestoNaZiveenje: "Kumanovo" },
  { ime: "Dimitar", prezime: "Mihajlov", indeks: "10072", prosek: 9.3, mestoNaZiveenje: "Gostivar" },
  { ime: "Vera", prezime: "Gjorgievska", indeks: "10073", prosek: 8.1, mestoNaZiveenje: "Prilep" },
  { ime: "Katerina", prezime: "Stefanova", indeks: "10074", prosek: 9.0, mestoNaZiveenje: "Veles" },
  { ime: "Radmila", prezime: "Trpeska", indeks: "10075", prosek: 7.6, mestoNaZiveenje: "Bitola" },
  { ime: "Luka", prezime: "Nikoloski", indeks: "10076", prosek: 8.7, mestoNaZiveenje: "Kavadarci" },
  { ime: "Jovana", prezime: "Pavlovska", indeks: "10077", prosek: 9.5, mestoNaZiveenje: "Tetovo" },
  { ime: "Filip", prezime: "Trajkovski", indeks: "10078", prosek: 8.4, mestoNaZiveenje: "Skopje" },
  { ime: "Aleksandra", prezime: "Gjorchevska", indeks: "10079", prosek: 7.8, mestoNaZiveenje: "Ohrid" },
  { ime: "Milena", prezime: "Stefanovska", indeks: "10080", prosek: 9.0, mestoNaZiveenje: "Strumica" },
  { ime: "Viktor", prezime: "Kovacevski", indeks: "10081", prosek: 9.4, mestoNaZiveenje: "Kumanovo" },
  { ime: "Radoslav", prezime: "Trajkovski", indeks: "10082", prosek: 8.6, mestoNaZiveenje: "Gostivar" },
  { ime: "Tanja", prezime: "Petrovska", indeks: "10083", prosek: 9.2, mestoNaZiveenje: "Prilep" },
  { ime: "Filip", prezime: "Jovanov", indeks: "10084", prosek: 7.5, mestoNaZiveenje: "Skopje" },
  { ime: "Nikola", prezime: "Petrovski", indeks: "10085", prosek: 8.0, mestoNaZiveenje: "Kavadarci" },
  { ime: "Jelena", prezime: "Stefanova", indeks: "10086", prosek: 9.1, mestoNaZiveenje: "Tetovo" },
  { ime: "Marija", prezime: "Trajkovska", indeks: "10087", prosek: 8.2, mestoNaZiveenje: "Veles" },
  { ime: "Radmila", prezime: "Pavlovska", indeks: "10088", prosek: 8.7, mestoNaZiveenje: "Bitola" },
  { ime: "Ana", prezime: "Markovska", indeks: "10089", prosek: 8.1, mestoNaZiveenje: "Skopje" },
  { ime: "Nikola", prezime: "Mihajlov", indeks: "10090", prosek: 8.9, mestoNaZiveenje: "Shtip" },
  { ime: "Sara", prezime: "Stojanova", indeks: "10091", prosek: 9.3, mestoNaZiveenje: "Prilep" },
  { ime: "Emilija", prezime: "Trpeska", indeks: "10092", prosek: 8.5, mestoNaZiveenje: "Kumanovo" },
  { ime: "Dimitrija", prezime: "Trajkov", indeks: "10093", prosek: 8.2, mestoNaZiveenje: "Tetovo" },
  { ime: "Teo", prezime: "Stefanovski", indeks: "10094", prosek: 8.0, mestoNaZiveenje: "Strumica" },
  { ime: "Lena", prezime: "Markovska", indeks: "10095", prosek: 9.4, mestoNaZiveenje: "Kavadarci" },
  { ime: "Filip", prezime: "Trajkoski", indeks: "10096", prosek: 7.3, mestoNaZiveenje: "Skopje" },
  { ime: "Kristina", prezime: "Jovanovska", indeks: "10097", prosek: 9.6, mestoNaZiveenje: "Veles" },
  { ime: "Jelena", prezime: "Nikoloska", indeks: "10098", prosek: 9.0, mestoNaZiveenje: "Gostivar" },
  { ime: "Aleksandar", prezime: "Trajkovski", indeks: "10099", prosek: 8.9, mestoNaZiveenje: "Bitola" },
  { ime: "Zoran", prezime: "Mitroski", indeks: "10100", prosek: 8.6, mestoNaZiveenje: "Skopje" }
];


//? 1. Сите студенти од Скопје чие име завршува на а и имаат просек над 7, подредени по име (растечки).


const filterStudenti = studenti.filter(
    studet => studet.mestoNaZiveenje.toLowerCase() === "skopje" &&  studet.prosek > 7)
    .sort((a, b) => a.ime.localeCompare(b.ime));


console.log(filterStudenti);


//? 2. Сите студенти кои имаат просек над 9 и не се од Скопје, подредени по просек опаѓачки.

const filterStudenti2 = studenti.filter(
    studet => studet.mestoNaZiveenje.toLowerCase() !== "skopje" &&  studet.prosek > 9)
    .sort((a, b) => b.prosek - a.prosek);

console.log(filterStudenti2);

//? 3. Првите 3 студенти кои имаат имиња од 5 карактери, подредени по просек.

const filterStudenti3 = studenti.filter(
    student => student.ime.length === 5)
    .sort((a, b) => b.prosek - a.prosek);   
console.log(filterStudenti3.slice(0, 3));


//? 4. Вкупниот просек на студентите кои се од Кунаново.
const filterStudenti4 = studenti.filter(
    student => student.mestoNaZiveenje == "Kumanovo");
    //console.log(filterStudenti4);
let sum = 0.0;
filterStudenti4.forEach(student => sum += student.prosek);
console.log("Вкупниот просек на студентите кои се од Кунаново е: " + sum);


//? 5. Просек на просеците од градовите Скопје и Охрид

const filterStudenti5 = studenti.filter(
    student => student.mestoNaZiveenje == "Skopje" || student.mestoNaZiveenje == "Ohrid");
let prosek = 0.0;
    filterStudenti5.forEach(student => prosek += student.prosek/filterStudenti5.length);

console.log("Просекот на студентите кои се од Скопје или Охрид е: " + prosek);

//? 6. Да се додаде уште еден студент со име Горан, просек 7.3 и град Делчево
studenti.push({ ime: "Goran", prezime: "Delchevski", indeks: "10101", prosek: 7.3, mestoNaZiveenje: "Delchevo" });
console.log(studenti[studenti.length - 1]);

//?  7. Да се избрише првиот студент во studenti
studenti.shift();
//console.log(studenti[0].ime + studenti[1].ime);


//? 8. Да се креира нов array каде што студентите од Охрид и Куманово каде што оценките со просек се за 1 поголем(Динамички)
const filterStudenti8 = studenti.filter(
    student => student.mestoNaZiveenje == "Ohrid" || student.mestoNaZiveenje == "Kumanovo");
    filterStudenti8.forEach(student => {
        student.prosek += 1.0;
    });
filterStudenti8.forEach(student => console.log(student.prosek));