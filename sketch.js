let input;
let img;

let isSubInput;

let frame;

let canvas;

function setup() {
  canvas = createCanvas(1000, 1000);
  
  userProfilePicture = createFileInput(handleFile);
  userProfilePicture.elt.id = "userProfilePicture";

  isSubInput = createCheckbox("Takipçiyim", false);
  isSubInput.changed(checkboxCheckedEvent);

  frame = createImg('frames/follower.png', 'Frame');
  frame.hide();

  let downloadButton = createButton('İndir');
  downloadButton.mousePressed(Download);

  let mainContainer = document.getElementById('main');
  let controlContainer = document.getElementById('controls');

  canvas.parent(mainContainer);
  frame.parent(mainContainer);
  userProfilePicture.parent(controlContainer);
  isSubInput.parent(controlContainer);
  downloadButton.parent(controlContainer);

  // userProfilePicture.position(50, 50);
  // isSubInput.position(50, 100);
  // downloadButton.position(50, 150);
}

function Download() {
  save(canvas, isSubInput.checked() ? 'poncikbruiser_sub.png' : 'poncikbruiser_follower.png');
}

function checkboxCheckedEvent() {
  frame.remove();
  frame = createImg(isSubInput.checked() ? 'frames/subscriber.png' : 'frames/follower.png', 'Frame');
  let label = document.getElementsByTagName('label')[1];
  label.innerHTML = isSubInput.checked() ? 'Aboneyim' : 'Takipçiyim';
  frame.hide();
}

function draw() {    
  clear();

  if (img) {
    image(img, 115, 115, 770, 770);
  }
  image(frame, 0, 0, width, height);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}