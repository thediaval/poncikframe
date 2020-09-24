let pg;
let pictureSize = 1000;

let frame;
let userProfilePicture = {
  x: 0,
  y: 0,
  picture: null,
  dragging: false
};

let offsetX;
let offsetY;

let ratio;

function setup() {
  let cnv = createCanvas(340, 340);
  cnv.parent('canvasContainer');
  cnv.mousePressed(canvasPressed);
  cnv.mouseReleased(canvasReleased);

  pg = createGraphics(pictureSize, pictureSize);

  let fileInput = createFileInput(handleFileInput);
  fileInput.parent(document.getElementById('fileInputContainer'));

  frame = createImg('frames/follower.png', 'Frame');
  frame.hide();

  ratio = pictureSize / width;
}

function canvasPressed() {
  userProfilePicture.dragging = true;

  offsetX = userProfilePicture.x - (mouseX * ratio);
  offsetY = userProfilePicture.y - (mouseY * ratio);
}

function canvasReleased() {
  userProfilePicture.dragging = false;
}

function draw() {
  clear();
  pg.background('#F3F3F3');

  if(userProfilePicture.dragging) {
    userProfilePicture.x = (mouseX * ratio) + offsetX;
    userProfilePicture.y = (mouseY * ratio) + offsetY;
  }
  
  if (userProfilePicture.picture) {
    let heightRatio = userProfilePicture.picture.height / userProfilePicture.picture.width;
    let newHeight = pictureSize * heightRatio;
    
    pg.image(userProfilePicture.picture, userProfilePicture.x, userProfilePicture.y, pictureSize, newHeight);
  }
  pg.image(frame, 0, 0, pictureSize, pictureSize);

  image(pg, 0, 0, width, height);
}

function changeFrame(status) {
  frame = createImg(status ? 'frames/subscriber.png' : 'frames/follower.png', 'Frame');
  frame.hide();

  document.documentElement.style.setProperty('--theme', status ? '#ff970e' : '#00B3DC');
  document.documentElement.style.setProperty('--theme-hover', status ? '#ff9f20' : '#1EC8EE');
}

function handleFileInput(file) {
  userProfilePicture.picture = file.type === 'image' ? createImg(file.data, '') : null;
  userProfilePicture.picture.hide();
}

function saveEditedPicture() {
  pg.save('poncikbruiser.png');
}