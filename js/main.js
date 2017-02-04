// ne radi uzimanje itema (proveri sudare)
// da se mrdaju dok se bore

var scena;
var heroj;
var ork;
var zmaj;
var kutija;

class Karakter extends Sprite {
  constructor(ime, slika, shir, vis) {
    super(scena, slika, shir, vis)
    this.ime = ime;
    this.preciznost = 60; // procenat šanse da pogodi protivnika
    this.udarac = 2; // broj šestostrane kocke za udarac
    this.eskivaza = 10; // oduzima od protivnikove šanse za udarac
    this.oklop = 1; // oduzima od protivnikovog demage
    this.zdravlje = 60; // koliko demage može podneti
  }

  pokaziStatistike() {
    let status = "<strong><span id='ime'>" + this.ime + "</span></strong> <br />"
    status += "preciznost: " + this.preciznost + "<br />";
    status += "udarac: " + this.udarac + "<br />";
    status += "eskivaža: " + this.eskivaza + "<br />";
    status += "oklop: " + this.oklop + "<br />";
    status += "zdravlje: " + "<span id='zdravlje'>" + this.zdravlje + "</span>";
    return status;
  }

  borba(protivnik) {
    let preciznost = (this.preciznost - protivnik.eskivaza) / 100;
    if (Math.random() < preciznost) {
      //alert("Hit!");
      let udarac = 0;
      for (i = 0; i < this.udarac; i++) {
        udarac += parseInt(Math.random() * 6);
      }

      udarac -= protivnik.oklop;
      protivnik.zdravlje -= udarac;

      if (protivnik.zdravlje <= 0) {
        alert(protivnik.ime + " je mrtav!")
        document.location.href = "";
      }
    }
  }
}

class Heroj extends Karakter {
  constructor() {
    super("Heroj", "slike/hero.png", 64, 64)
    this.setPosition(225, 150);
    this.loadAnimation(512, 256, 64, 64);
    this.generateAnimationCycles();
    this.renameCycles(new Array("gore", "levo", "dole", "desno"));
    this.setAnimationSpeed(500);
    this.pauza();
  }

  pauza() {
    this.setSpeed(0);
    this.setCurrentCycle("dole");
    this.pauseAnimation();
  }

  proveriTipke() {
    if (keysDown[K_LEFT]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(270);
      this.setCurrentCycle("levo");
    }
    if (keysDown[K_RIGHT]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(90);
      this.setCurrentCycle("desno");
    }
    if (keysDown[K_UP]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(0);
      this.setCurrentCycle("gore");
    }
    if (keysDown[K_DOWN]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(180);
      this.setCurrentCycle("dole");
    }
    if (keysDown[K_PGUP]) {
      this.pauza();
    }
  }

  proveriSudare() {
    if (this.collidesWith(ork)) {
      //vraća potez i staje
      this.x -= this.dx;
      this.y -= this.dy;
      this.pauza();
      borbaHerojOrk();
      document.getElementById("orkStatus").style.display = "block";
      ork.setSpeed(0);
      ork.playAnimation();
      ork.setMoveAngle(180);
      ork.setCurrentCycle("dole");
    }
    if (this.collidesWith(zmaj)) {
      this.x -= this.dx;
      this.y -= this.dy;
      this.pauza();
      borbaHerojZmaj();
      document.getElementById("zmajStatus").style.display = "block";
      zmaj.setSpeed(0);
      zmaj.playAnimation();
      zmaj.setMoveAngle(180);
      zmaj.setCurrentCycle("dole");
    }
    if (this.collidesWith(kutija)) {
      kutija.image.src = "slike/zlatnik.png";
      heroj.udarac += 1; //iz nepoznatog razloga ne radi
      heroj.zdravlje++;
    }
  }
}

class Ork extends Karakter {
  constructor() {
    super("Ork", "slike/ork-animirani.png", 47.25, 48)
    this.setSpeed(0);
    this.setPosition(300, 200);
    this.setPosition(100, 250);
    this.loadAnimation(378, 192, 47.25, 48);
    this.generateAnimationCycles();
    this.renameCycles(new Array("gore", "levo", "dole", "desno"));
    this.setAnimationSpeed(500);
    //ork je izdržljiviji od defaulta ali sa slabijim oružjem
    this.preciznost = 50; // perc likelihood of hitting opponent
    this.udarac = 1; // udarac (d6) done on a sucessful hit
    this.eskivaza = 5; // subtract from opponent's preciznost
    this.oklop = 1 // subtract from opponent's udarac
    this.zdravlje = 80; // amount of udarac I can sustain
  }

  pauza() {
    this.setSpeed(0);
    this.setCurrentCycle("dole");
    this.pauseAnimation();
  }

  proveriTipke() {
    if (keysDown[K_J]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(270);
      this.setCurrentCycle("levo");
    }
    if (keysDown[K_L]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(90);
      this.setCurrentCycle("desno");
    }
    if (keysDown[K_I]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(0);
      this.setCurrentCycle("gore");
    }
    if (keysDown[K_K]) {
      this.setSpeed(2);
      this.playAnimation();
      this.setMoveAngle(180);
      this.setCurrentCycle("dole");
    }
    if (keysDown[K_U]) {
      this.pauza();
    }
  }
}

class Zmaj extends Karakter {
  constructor() {
    super("Zmaj", "slike/bahamut.png", 96, 96)
    this.loadAnimation(384, 384, 96, 96);
    this.generateAnimationCycles();
    this.renameCycles(new Array("dole", "levo", "desno", "gore"));
    this.setAnimationSpeed(500);
    this.preciznost = 33;
    this.udarac = 3;
    this.eskivaza = 3;
    this.oklop = 2
    this.zdravlje = 100;
    this.setPosition(400, 30);
    this.setSpeed(0);
    this.pauseAnimation();
  }

  pauza() {
    this.setSpeed(0);
    this.setCurrentCycle("dole");
    this.pauseAnimation();
  }

  proveriTipke() {
    if (keysDown[K_A]) {
      this.setSpeed(1);
      this.playAnimation();
      this.setMoveAngle(270);
      this.setCurrentCycle("levo");
    }
    if (keysDown[K_D]) {
      this.setSpeed(1);
      this.playAnimation();
      this.setMoveAngle(90);
      this.setCurrentCycle("desno");
    }
    if (keysDown[K_W]) {
      this.setSpeed(1);
      this.playAnimation();
      this.setMoveAngle(0);
      this.setCurrentCycle("gore");
    }
    if (keysDown[K_S]) {
      this.setSpeed(1);
      this.playAnimation();
      this.setMoveAngle(180);
      this.setCurrentCycle("dole");
    }
    if (keysDown[K_SPACE]) {
      this.pauza();
    }
  }

  proveriSudare() {
    if (this.collidesWith(ork)) {
      //vraća potez i staje
      this.x -= this.dx;
      this.y -= this.dy;
      this.pauza();
      borbaOrkZmaj();
      document.getElementById("zmajStatus").style.display = "block";
      document.getElementById("orkStatus").style.display = "block";
    }
  }
}

function borbaHerojOrk() {
  heroj.borba(ork);
  ork.borba(heroj);
  herojStatus.innerHTML = heroj.pokaziStatistike();
  orkStatus.innerHTML = ork.pokaziStatistike();
}

function borbaHerojZmaj() {
  heroj.borba(zmaj);
  zmaj.borba(heroj);
  herojStatus.innerHTML = heroj.pokaziStatistike();
  zmajStatus.innerHTML = zmaj.pokaziStatistike();
}

function borbaOrkZmaj() {
  ork.borba(zmaj);
  zmaj.borba(ork);
  orkStatus.innerHTML = ork.pokaziStatistike();
  zmajStatus.innerHTML = zmaj.pokaziStatistike();
}

function patrolirajLevoDesno(vojnik) {
  if (vojnik.x >= 600) {
    vojnik.setSpeed(2);
    vojnik.playAnimation()
    vojnik.setMoveAngle(270);
    vojnik.setCurrentCycle("levo");
  }
  if (vojnik.x <= 150) {
    vojnik.setSpeed(2);
    vojnik.playAnimation()
    vojnik.setMoveAngle(90);
    vojnik.setCurrentCycle("desno");
  }
}

function patrolirajGoreDole(vojnik) {
  if (vojnik.y <= 30) {
    vojnik.setSpeed(2);
    vojnik.playAnimation()
    vojnik.setMoveAngle(180);
    vojnik.setCurrentCycle("dole");
  }
  if (vojnik.y >= 160) {
    vojnik.setSpeed(2);
    vojnik.playAnimation()
    vojnik.setMoveAngle(0);
    vojnik.setCurrentCycle("gore");
  }
}

function postaviScenu() {
  scena = new Scene();
  pozadina = new Sprite(scena, "slike/pozadina-tamnica.jpg", 800, 600);
  pozadina.setSpeed(0, 0);
  pozadina.setPosition(400, 300);
  kutija = new Sprite(scena, "slike/kutija.png", 25, 25);
  kutija.setSpeed(0, 0);
  kutija.setPosition(Math.random() * 800, Math.random() * 600);
  heroj = new Heroj();
  ork = new Ork();
  zmaj = new Zmaj();

  herojStatus = document.getElementById("herojStatus");
  herojStatus.innerHTML = heroj.pokaziStatistike();
  orkStatus = document.getElementById("orkStatus");
  orkStatus.innerHTML = ork.pokaziStatistike();
  zmajStatus = document.getElementById("zmajStatus");
  zmajStatus.innerHTML = zmaj.pokaziStatistike();
  scena.start();
}

function update() {
  scena.clear();
  pozadina.update();
  heroj.proveriTipke();
  heroj.proveriSudare();
  heroj.update();
  patrolirajLevoDesno(ork);
  ork.proveriTipke();
  ork.update();
  patrolirajGoreDole(zmaj);
  zmaj.proveriTipke();
  zmaj.proveriSudare();
  zmaj.update();
  kutija.update();
}
