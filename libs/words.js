var wordList = [
  // Borrowed from xkcd password generator which borrowed it from wherever
"Sofa",
"Eko",
"Buku",
"Guru",
"Bilik",
"Foto",
"Murid",
"Guru",
"Meja",
"Bola",
"Taman",
"Darjah",
"Kantin",
"Padang",
"Pokok",
"Pena",
"Botol",
"Kicau",
"Gunting",
"Tingkap",
"Mata",
"Dagu",
"Dahi",
"Mulut",
"Leher",
"Tangan",
"Hidung",
"Rambut",
"Badan",
"Mandi",
"Sihat",
"Cergas",
"Bangun",
"Bersih",
"Sabun",
"Berus",
"Baju",
"Pantai",
"Lembut",
"Harum",
"Ibu",
"Cucu",
"Adik",
"Ayah",
"Abang",
"Kakak",
"Datuk",
"Nenek",
"Tidur",
"Makan",
"Bunga",
"Cantik",
"Jemput",
"Nyanyi",
"Kedai",
"Masak",
"Gurau",
"Baca",
"Beli",
"Muzik",
"Epal",
"Orang",
"Kawan",
"Rakan",
"Sayang",
"Gerai",
"Dewan",
"Limau",
"Lantai",
"Pandai",
"Hijau",
"Julai",
"Tinggi",
"Aiskrim",
"Koyak",
"Bantu",
"Campak",
"Nampak",
"Pijak",
"Jatuh",
"Gemar",
"Gambar",
"Pentas",
"Kelas",
"Cuci",
"Arnab",
"Lobak",
"Lompat",
"Haiwan",
"Kolam",
"Kubis",
"Mangkuk",
"Gitar",
"Patung",
"Loceng",
"Congkak",
"Lukis",
"Tangga",
"Skuter",
"Roda",
"Peta",
"Topi",
"Budak",
"Sapu",
"Jinak",
"Tikar",
"Pagar",
"Tolak",
"Pegang",
"Pergi",
"Merak",
"Monyet",
"Kandang",
"Gayut",
"Rumput",
"Brosur",
"Sandwic",
"Potong",
"Belai",
"Ambil",
"Api",
"Ini",
"Itu",
"suis",
"robot",
"pagi",
"malam",
"petang",
"lewat",
"lambat",
"ikrar",
"poster",
"rehat",
"tulis",
"henti",
"minum",
"cari",
"jangan",
"tiang",
"pinggang",
"Esok",
"Alat",
"Kaloi",
"Bulat",
"Pisau",
"Tupai",
"Kerbau",
"Bising",
"Mahal",
"Bujur",
"Pundi",
"Merdu",
"Sembuh",
"Amat",
"Sungguh",
"Kuning",
"Siap",
"Gosok",
"Ubat",
"Koboi",
"Atas",
"Bawah",
"Dalam",
"Luar",
"Kerja",
"Aktif",
"Sorak",
"Lawan",
"Rajin",
"Kotak",
"Rugi",
"Nanti",
"Cermin",
"Senyap",
"Sakit",
"Surat",
"Pantun",
"Pungut",
"Program",
"Sampah",
"Cawan",
"Gelas",
"Garpu",
"Dapur",
"Estet",
"Pinggan",
"Kusyen",
"Tamu",
"Langsir",
"Ruang",
"Sayur",
"Kuih",
"Mesin",
"Hadir",
"Majlis",
"Datang",
"Buat",
"Pindah",
"Kain",
"Goreng",
"Nota",
"Rumah",
"Jiran",
"Sama",
"Jalan",
"Naik",
"Tidak",
"Ajak",
"Bila",
"Kunci",
"Besar",
"Jumpa",
"Pulang",
"Mangga",
"Tinggal",
"Tali",
"pensel",
"tingkat",
"izin",
"lambai",


];

function words(options) {
  function word() {
    //window.console.log(wordList.length);
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one word
  if (typeof (options) === 'undefined') {
    return word();
  }

  // Just a number = return that many words
  if (typeof (options) === 'number') {
    options = {
      exactly: options
    };
  }

  // options supported: exactly, min, max, join, uppercase, difficulty

  var difficulty = options.difficulty || "bronze";
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  for (var i = 0;
    (i < total); i++) {
    var _word = word();

    if(difficulty === "bronze") {
      while(String(_word).length <= reg.wordLengthBase) {
        _word = words();
      }
    }
    else if(difficulty === "silver") {

      while(String(_word).length <= reg.wordLengthBase+2) {
        _word = words();
      }
    }
    else if(difficulty === "gold") {
      while(String(_word).length <= reg.wordLengthBase+4) {
        _word = words();
      }
    }

    if(options.upperCase === true){
      results.push(String(_word).toUpperCase());
    }
    else{
      results.push(_word);
    }
  }
  if (options.join) {
    results = results.join(options.join);
  }
  return results;

}

//module.exports = words;
// Export the word list as it is often useful
words.wordList = wordList;