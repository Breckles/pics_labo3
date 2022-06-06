// Code for random color generation obtained from:
// https://css-tricks.com/snippets/javascript/random-hex-color/

const gridContainer = document.getElementById('gridContainer');
const gridSizeInputSlider = document.getElementById('gridSizeInput');
const gridSizeDisplay = document.getElementById('gridSizeDisplay');
const colorInputPicker = document.getElementById('colorInput');
const colorPaletteContainer = document.getElementById('colorPaletteContainer');
const resetPaletteButton = document.getElementById('resetPaletteButton');

let gridSize = 16;
let colorPalette = []; // strings representing hexadecimal color values (eg. '#ffffff')

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

const onMoveSliderHandler = (event) => {
  const displayedGridSize = event.target.value;
  gridSizeDisplay.innerHTML = `${displayedGridSize} x ${displayedGridSize}`;
};

const onChangeGridSizeHandler = (event) => {
  const newGridSize = +event.target.value;

  gridSize = newGridSize;
  updateGrid();
};

const updateColorPaletteSwatches = () => {
  if (colorPalette.length === 0) {
    colorPaletteContainer.innerHTML =
      'Aucune couleurs choisi. Elles seront aléatoires.';
    return;
  }

  const swatches = document.createElement('div');
  swatches.classList.add('swatches');

  for (const color of colorPalette) {
    const swatch = document.createElement('div');
    swatch.classList.add('swatches__swatch');
    swatch.style.backgroundColor = color;
    swatches.appendChild(swatch);
  }

  colorPaletteContainer.replaceChildren(swatches);
};

const onPickColorHandler = (event) => {
  const color = event.target.value;
  colorPalette.push(color);
  updateColorPaletteSwatches();
  resetPaletteButton.style.visibility = 'visible';
};

const generateRandomHexColor = () => {
  const randomHexValue = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomHexValue}`;
};

const pickRandomPaletteColor = () => {
  const index = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[index];
};

const getColor = () => {
  // return colorPalette ? pickRandomPaletteColor() : generateRandomHexColor();
  if (colorPalette.length > 0) {
    return pickRandomPaletteColor();
  }

  return generateRandomHexColor();
};

const onCellHoverHandler = (event) => {
  const color = getColor();
  event.target.style.backgroundColor = color;
};

const onResetPaletteHandler = (event) => {
  colorPalette = [];
  updateColorPaletteSwatches();
  resetPaletteButton.style.visibility = 'hidden';
};

// Attach event handlers
gridSizeInputSlider.addEventListener('input', onMoveSliderHandler);
gridSizeInputSlider.addEventListener('change', onChangeGridSizeHandler);
colorInputPicker.addEventListener('change', onPickColorHandler);
resetPaletteButton.addEventListener('click', onResetPaletteHandler);

updateGrid();
