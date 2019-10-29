location_ = 'assets/deseuri/';
// metal- paper- glass- organic- refuse- plastic- tetrapack-
const assets = {
  aluminum: 20, // metal
  coffeecup: 6, // paper
  glass: 18, // glass
  organics: 23, //organic
  paper: 17, //paper
  plastic: 15, // plastic
  plasticbag: 1, // plastic
  refuse: 32, // refuse
  ruinedpaper: 20, //refuse 
  styrofoam: 5, // refuse
  tetrapack: 11, // tetrapack 
  tin: 19 //metal
};
randomTextures = [];

waste_site = 2500;
//collection_area1 = 720;

boatTexture = PIXI.Texture.from('assets/boat800.png');
const boat = new PIXI.Sprite(boatTexture);
boat.x = 600;
textures = {};

for (material in assets) {
  textures[material] = [];
  for (i = 1; i <= assets[material]; i++) {
    textures[material].push(PIXI.Texture.from(location_ + material + i + '.svg'));
    randomTextures.push(PIXI.Texture.from(location_ + material + i + '.svg'));
  }
}

categories = Object.entries(assets);

const app = new PIXI.Application
({
  backgroundColor: 0x113d4c,
  height: 800,
  autoResize: true,
  resolution: devicePixelRatio 
});

document.querySelector('#frame').appendChild(app.view);

//document.body.appendChild(app.view);

app.stage.addChild(boat);

const graphics = new PIXI.Graphics();

const defaultIcon = "url('assets/parsm.png'),auto";
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;

const style = new PIXI.TextStyle({
  fill: ['#ffffff']
});

const style_score = new PIXI.TextStyle({
  fill: "red",
  padding: 3,
  stroke: "aqua",
  strokeThickness: 3
});

const rect = new PIXI.Graphics()

graphics.beginFill(0x326fa8, 0.3);
graphics.drawRect(720, 50, 200, 100);
graphics.endFill();

app.stage.addChild(rect);

window.addEventListener('resize', resize);

// Resize function window
function resize() {

	// Get the p
	const parent = app.view.parentNode;
   
	// Resize the renderer
	app.renderer.resize(parent.clientWidth, parent.clientHeight);
  
  // You can use the 'screen' property as the renderer visible
  // area, this is more useful than view.width/height because
  // it handles resolution
  rect.position.set(app.screen.width, app.screen.height);
}

resize();

const scoreText = new PIXI.Text('0', style_score);
scoreText.x = 980;
scoreText.y = 15;
const refuseText = new PIXI.Text('refuse', style);
refuseText.x = 720;
refuseText.y = 100;

const paperText = new PIXI.Text('paper', style);
paperText.x = 720;
paperText.y = 200;

const plasticText = new PIXI.Text('plastic', style);
plasticText.x = 720;
plasticText.y = 300;

const organicText = new PIXI.Text('organic', style);
organicText.x = 720;
organicText.y = 400;

const glassText = new PIXI.Text('glass', style);
glassText.x = 720;
glassText.y = 500;

const tetrapackText = new PIXI.Text('tetrapack', style);
tetrapackText.x = 720;
tetrapackText.y = 600;

const metalText = new PIXI.Text('metal', style);
metalText.x = 720;
metalText.y = 700;

graphics.beginFill(0x41d0e0, 0.3);
graphics.drawRect(720, 150, 200, 100);
graphics.endFill();

graphics.beginFill(0x326fa8, 0.3);
graphics.drawRect(720, 250, 200, 100);
graphics.endFill();

graphics.beginFill(0x41d0e0, 0.3);
graphics.drawRect(720, 350, 200, 100);
graphics.endFill();

graphics.beginFill(0x326fa8, 0.3);
graphics.drawRect(720, 450, 200, 100);
graphics.endFill();

graphics.beginFill(0x41d0e0, 0.3);
graphics.drawRect(720, 550, 200, 100);
graphics.endFill();

graphics.beginFill(0x326fa8, 0.3);
graphics.drawRect(720, 650, 200, 100);
graphics.endFill();

// Scale mode for pixelation
arr = [];
Dragging = false;
for (let i = 0; i < 30; i++) {
  arr.push(createBunny(
    Math.floor(Math.random() * (app.screen.width - 450)),
    Math.floor(Math.random() * app.screen.height),
  ));
}

function createBunny(x, y) {
  // create our little bunny friend..
  var category = categories[Math.floor(Math.random() * categories.length)][0];

  var texturesOfCategory = textures[category];
  const bunny = new PIXI.Sprite(texturesOfCategory[Math.floor(Math.random() * texturesOfCategory.length)]);
  bunny.category = category;
  //bunny.category = categoriy;
  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  bunny.buttonMode = true;

  // center the bunny's anchor point
  bunny.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  //bunny.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  bunny
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  // For mouse-only events
  // .on('mousedown', onDragStart)
  // .on('mouseup', onDragEnd)
  // .on('mouseupoutside', onDragEnd)
  // .on('mousemove', onDragMove);

  // For touch-only events
  // .on('touchstart', onDragStart)
  // .on('touchend', onDragEnd)
  // .on('touchendoutside', onDragEnd)
  // .on('touchmove', onDragMove);

  // move the sprite to its designated position
  bunny.x = x;
  bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);
  return bunny;
}

app.stage.addChild(graphics);
app.stage.addChild(scoreText);
app.stage.addChild(refuseText);
app.stage.addChild(paperText);
app.stage.addChild(plasticText);
app.stage.addChild(organicText);
app.stage.addChild(glassText);
app.stage.addChild(tetrapackText);
app.stage.addChild(metalText);

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
  Dragging = true;
}


function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
  Dragging = false;
  //const newPosition = this.data.getLocalPosition(this.parent);
  //refuse
  if (this.x >= 720 && this.x < 900 && this.y >= 50 && this.y < 150) {
    if (['refuse', 'styrofoam', 'ruinedpaper'].includes(this.category))
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //paper
  if (this.x >= 720 && this.x < 900 && this.y >= 150 && this.y < 250) {
    if (
      ['paper', 'coffecup'].includes(this.category)
    )
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //plastic
  if (this.x >= 720 && this.x < 900 && this.y >= 250 && this.y < 350) {
    if (['plastic', 'plasticbag'].includes(this.category)
    )
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //organics
  if (this.x >= 720 && this.x < 900 && this.y >= 350 && this.y < 450) {
    if (['organics'].includes(this.category))
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //glass
  if (this.x >= 720 && this.x < 900 && this.y >= 450 && this.y < 550) {
    if (['glass'].includes(this.category))
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //tetrapack
  if (this.x >= 720 && this.x < 900 && this.y >= 550 && this.y < 650) {
    if (['tetrapack'].includes(this.category))
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //metal
  if (this.x >= 720 && this.x < 900 && this.y >= 650 && this.y < 750) {
    if (['aluminum', 'tin'].includes(this.category))
      scoreText.text = (parseInt(scoreText.text) + 1).toString();
    else
      scoreText.text = (parseInt(scoreText.text) - 1).toString();
    this.x = 'waste_site';
  }
  //console.log(graphics.containsPoint(newPosition.x, newPosition.y));
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}
