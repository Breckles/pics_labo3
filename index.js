// Code for random color generation obtained from:
// https://css-tricks.com/snippets/javascript/random-hex-color/

const gridContainer = document.getElementById('gridContainer');
const gridSizeInputSlider = document.getElementById('gridSizeInput');
const gridSizeDisplay = document.getElementById('gridSizeDisplay');
const colorInputContainer = document.getElementById('colorInputContainer');
const colorInputPicker = document.getElementById('colorInput');
const colorPaletteContainer = document.getElementById('colorPaletteContainer');
const colorPaletteSwatches = document.getElementById('colorPaletteSwatches');
const resetPaletteButton = document.getElementById('resetPaletteButton');
const marioModeToggleButton = document.getElementById('marioModeButton');

let mode = 'normal';
let gridSize = 16;
let colorPalette = []; // strings representing hexadecimal color values (eg. '#ffffff')

///////////////// Updaters

const updateGrid = () => {
  // prepare new grid
  const grid = document.createElement('div');
  grid.classList.add('grid');

  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  const numCells = gridSize ** 2;

  for (let i = 0; i < numCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid__cell');
    cell.addEventListener('pointerenter', onCellHoverHandler);
    grid.appendChild(cell);
  }

  // replace contents of grid container with new grid
  gridContainer.replaceChildren(grid);
};

const updateColorPaletteSwatches = () => {
  if (colorPalette.length === 0) {
    colorPaletteSwatches.innerHTML =
      'Aucune couleurs choisi.<br>Elles seront aléatoires.';
    resetPaletteButton.classList.remove('visible');
    return;
  }

  const swatchesTemplate = document.createElement('template');

  for (const color of colorPalette) {
    const swatch = document.createElement('div');
    swatch.classList.add('swatch');
    swatch.style.backgroundColor = color;
    swatchesTemplate.content.appendChild(swatch);
  }

  colorPaletteSwatches.replaceChildren(swatchesTemplate.content);

  resetPaletteButton.classList.add('visible');
};

//////////////// Handlers

// Update grid size display as the user interacts with the slider
const onMoveSliderHandler = (event) => {
  const displayedGridSize = event.target.value;
  gridSizeDisplay.innerHTML = `${displayedGridSize} x ${displayedGridSize}`;
};

// Update grid when the user has entered a new value using the slider
const onChangeGridSizeHandler = (event) => {
  const newGridSize = +event.target.value;
  gridSize = newGridSize;
  updateGrid();
};

const onPickColorHandler = (event) => {
  const color = event.target.value;
  colorPalette.push(color);
  updateColorPaletteSwatches();
};

const onResetPaletteHandler = (event) => {
  colorPalette = [];
  updateColorPaletteSwatches();
};

const normalModeCellHoverHandler = (event) => {
  const color = getColor();
  event.target.style.backgroundColor = color;
};
// Attached to individual grid__cells in updateGrid()
let onCellHoverHandler = normalModeCellHoverHandler;

// Attach event handlers
gridSizeInputSlider.addEventListener('input', onMoveSliderHandler);
gridSizeInputSlider.addEventListener('change', onChangeGridSizeHandler);
colorInputPicker.addEventListener('change', onPickColorHandler);
resetPaletteButton.addEventListener('click', onResetPaletteHandler);

////////////////// Utils

const generateRandomHexColor = () => {
  const randomHexValue = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomHexValue}`;
};

const pickRandomPaletteColor = () => {
  const index = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[index];
};

const getColor = () => {
  if (colorPalette.length > 0) {
    return pickRandomPaletteColor();
  }

  return generateRandomHexColor();
};

///////////////// Main

// Initialize grid
updateGrid();

/////////////////////// Mario Mode /////////////////////////
const images = [
  'block_brick_lava.png',
  'block_brick.png',
  'block_bridge_donut.png',
  'block_bridge_lava.png',
  'block_cloud.png',
  'block_eyes_angry.png',
  'block_eyes.png',
  'block_ground.png',
  'block_ice.png',
  'block_music_note.png',
  'block_pow.png',
  'block_question.png',
  'block_ramp.png',
  'block_solid.png',
  'block_star.png',
];
const marioModeCellHoverHandler = (event) => {
  const image = images[Math.floor(Math.random() * images.length)];
  event.target.style.backgroundImage = `url(./images/${image})`;
};

const toggleMarioMode = () => {
  if (mode === 'normal') {
    mode = 'mario';
    colorPalette = images;
    onCellHoverHandler = marioModeCellHoverHandler;
    colorInputContainer.style.display = 'none';
    colorPaletteContainer.style.display = 'none';
    marioModeToggleButton.innerHTML = 'Désactiver la mode Mario';
  } else {
    mode = 'normal';
    colorPalette = [];
    onCellHoverHandler = normalModeCellHoverHandler;
    colorInputContainer.style.display = 'flex';
    colorPaletteContainer.style.display = 'flex';
    marioModeToggleButton.innerHTML = 'Activer la mode Mario';
    updateColorPaletteSwatches();
  }
  updateGrid();
};

marioModeToggleButton.addEventListener('click', toggleMarioMode);
