/* Materials */
import _ from 'lodash';

const IMG_MAT_ALUMINIUM = require('../../assets/material/aluminium.png');
const IMG_MAT_STEEL = require('../../assets/material/steel.png');
const IMG_MAT_RHEINZINK = require('../../assets/material/rheinzink.png');

/* Color Types */
const IMG_COLORTYPE_STANDARD = require('../../assets/colortype/standard.png');
const IMG_COLORTYPE_METALLIC = require('../../assets/colortype/metallic.png');
const IMG_COLORTYPE_METALLIC_SMALL = require('../../assets/colortype/background_metallic_small.jpg');
const IMG_COLORTYPE_CUSTOM = require('../../assets/colortype/custom.png');

/* Textures */
const IMG_TXR_WOOD = require('../../assets/texture/wood.png');
const IMG_TXR_LUX = require('../../assets/texture/luxuriousMetal.png');
const IMG_TXR_ORE = require('../../assets/texture/ore.png');
const IMG_TXR_RUSTIC = require('../../assets/texture/rustic.png');
const IMG_TXR_METAL = require('../../assets/texture/darkAgedMetal.png');

/* Sub-textures */
const IMG_SBTXR_ANTIQUE_GOLD = require('../../assets/texture/brazen/antiqueGold.png');
const IMG_SBTXR_CLASSIC_CROWN = require('../../assets/texture/brazen/classicCrown.png');
const IMG_SBTXR_GILDED_CREST = require('../../assets/texture/brazen/gildedCrest.png');
const IMG_SBTXR_GOLDEN_GLOW = require('../../assets/texture/brazen/goldenGlow.png');
const IMG_SBTXR_GOLD_NUGGET = require('../../assets/texture/brazen/goldNugget.png');

const IMG_SBTXR_CLASSIC_RUST = require('../../assets/texture/k5/classicRust.png');
const IMG_SBTXR_COPPER = require('../../assets/texture/k5/copper.png');
const IMG_SBTXR_FUSION = require('../../assets/texture/k5/fusion.png');
const IMG_SBTXR_GALVANIZED = require('../../assets/texture/k5/galvanized.png');
const IMG_SBTXR_PENNY = require('../../assets/texture/k5/penny.png');
const IMG_SBTXR_ZINC = require('../../assets/texture/k5/zinc.png');

const IMG_SBTXR_CARBIDE = require('../../assets/texture/midnight/midnightCarbide.png');
const IMG_SBTXR_CHROME = require('../../assets/texture/midnight/midnightChrome.png');
const IMG_SBTXR_COAL = require('../../assets/texture/midnight/midnightCoal.png');
const IMG_SBTXR_HOUR = require('../../assets/texture/midnight/midnightHour.png');
const IMG_SBTXR_TARNISH = require('../../assets/texture/midnight/midnightTarnish.png');
const IMG_SBTXR_IRON = require('../../assets/texture/midnight/midnightIron.png');

const IMG_SBTXR_BLACK = require('../../assets/texture/ore/blackOre.png');
const IMG_SBTXR_CHROMIUM = require('../../assets/texture/ore/chromiumOre.png');
const IMG_SBTXR_COBALT = require('../../assets/texture/ore/cobaltOre.png');
const IMG_SBTXR_COPPER_ORE = require('../../assets/texture/ore/copperOre.png');
const IMG_SBTXR_DESERT = require('../../assets/texture/ore/desertOre.png');

const IMG_SBTXR_CHERRYWOOD = require('../../assets/texture/timbermet/cherrywood.png');
const IMG_SBTXR_MAPLE = require('../../assets/texture/timbermet/maple.png');
const IMG_SBTXR_OAK = require('../../assets/texture/timbermet/oak.png');

/* Standard Colors */
const IMG_COLOR_BACKGROUND_METALLIC = require('../../assets/ocmColors/background_metallic_small.jpg');
const IMG_COLOR_AGED_BRONZE = require('../../assets/ocmColors/agedBronze.png');
const IMG_COLOR_BRICK_RED = require('../../assets/ocmColors/brickRed.png');
const IMG_COLOR_COLONIAL_RED = require('../../assets/ocmColors/colonialRed.png');
const IMG_COLOR_DARK_BRONZE = require('../../assets/ocmColors/darkBronze.png');
const IMG_COLOR_EVERGREEN = require('../../assets/ocmColors/evergreen.png');
const IMG_COLOR_FOREST_GREEN = require('../../assets/ocmColors/forestGreen.png');
const IMG_COLOR_MATTE_BLACK = require('../../assets/ocmColors/matteBlack.png');

const IMG_COLOR_METALLIC_BRASS = require('../../assets/ocmColors/metallic-brass.png');
const IMG_COLOR_METALLIC_BRIGHT_COPPER = require('../../assets/ocmColors/metallic-bright-copper.png');
const IMG_COLOR_METALLIC_CHAMPAGNE = require('../../assets/ocmColors/metallic-champagne.png');
const IMG_COLOR_METALLIC_DARK_BLUE_METALLIC = require('../../assets/ocmColors/metallic-dark-blue-metallic.png');
const IMG_COLOR_METALLIC_DARK_PEWTER = require('../../assets/ocmColors/metallic-dark-pewter.png');
const IMG_COLOR_METALLIC_EMERALD_GREEN_METALLIC = require('../../assets/ocmColors/metallic-emerald-green-metallic.png');
const IMG_COLOR_METALLIC_GOLD = require('../../assets/ocmColors/metallic-gold.png');
const IMG_COLOR_METALLIC_LIGHT_BLUE_METALLIC = require('../../assets/ocmColors/metallic-light-blue-metallic.png');
const IMG_COLOR_METALLIC_PEWTER = require('../../assets/ocmColors/metallic-pewter.png');
const IMG_COLOR_METALLIC_PINK_METALLIC = require('../../assets/ocmColors/metallic-pink-metallic.png');
const IMG_COLOR_METALLIC_RED_COPPER = require('../../assets/ocmColors/metallic-red-copper.png');
const IMG_COLOR_METALLIC_SILVER = require('../../assets/ocmColors/metallic-silver.png');

const IMG_COLOR_OLD_TOWN_GRAY = require('../../assets/ocmColors/oldTownGray.png');
const IMG_COLOR_PATINA_GREEN = require('../../assets/ocmColors/patinaGreen.png');
const IMG_COLOR_RAWHIDE = require('../../assets/ocmColors/rawhide.png');
const IMG_COLOR_REDWOOD = require('../../assets/ocmColors/redwood.png');
const IMG_COLOR_REGAL_BLUE = require('../../assets/ocmColors/regalBlue.png');
const IMG_COLOR_REGAL_WHITE = require('../../assets/ocmColors/regalWhite.png');
const IMG_COLOR_SANDSTONE = require('../../assets/ocmColors/sandstone.png');
const IMG_COLOR_SLATE_BLUE = require('../../assets/ocmColors/slateBlue.png');
const IMG_COLOR_SLATE_GRAY = require('../../assets/ocmColors/slateGray.png');
const IMG_COLOR_SNOWDRIFT_WHITE = require('../../assets/ocmColors/snowdriftWhite.png');
const IMG_COLOR_SURREY_BEIGE = require('../../assets/ocmColors/surreyBeige.png');
const IMG_COLOR_CUSTOM = require('../../assets/ocmColors/custom.png');

/* Print Rollers */
const IMG_ROLLER_SANDOBI = require('../../assets/printRollers/sandobi.jpg');
const IMG_ROLLER_OAK = require('../../assets/printRollers/oak.jpg');
const IMG_ROLLER_BRUSHED = require('../../assets/printRollers/brushed.png');
const IMG_ROLLER_KBRUSHED = require('../../assets/printRollers/kovabrushed.png');
const IMG_ROLLER_SPANGLE = require('../../assets/printRollers/spangle.jpg');
const IMG_ROLLER_GRANDE = require('../../assets/printRollers/grande.png');
const IMG_ROLLER_K5 = require('../../assets/printRollers/k5.png');
const IMG_ROLLER_DELTA = require('../../assets/printRollers/delta.png');
const IMG_ROLLER_MORTON = require('../../assets/printRollers/morton.png');
const IMG_ROLLER_BAMBOO = require('../../assets/printRollers/bamboo.png');
const IMG_ROLLER_RIFT = require('../../assets/printRollers/rift.png');
const IMG_ROLLER_MAPLE = require('../../assets/printRollers/maple.png');
const IMG_ROLLER_TERRAZZO1 = require('../../assets/printRollers/terrazzo_a.psd');
const IMG_ROLLER_TERRAZZO2 = require('../../assets/printRollers/terrazzo_b.jpg');
const IMG_ROLLER_HAIRLINE = require('../../assets/printRollers/hairline.png');

const IMG_NOT_FOUND = require('../../assets/not-found.png');

const getImageByNameAndType = (name, type) => {
  if (type === 'subtexture') {
    switch (name) {
      case 'Black Ore (Matte)':
        return IMG_SBTXR_BLACK;
      case 'Chromium Ore (Matte)':
        return IMG_SBTXR_CHROMIUM;
      case 'Cobalt Ore (Matte)':
        return IMG_SBTXR_COBALT;
      case 'Copper Ore (Matte)':
        return IMG_SBTXR_COPPER_ORE;
      case 'Desert Ore (Glossy)':
        return IMG_SBTXR_DESERT;

      case 'oak':
        return IMG_SBTXR_OAK;
      case 'cherrywood':
        return IMG_SBTXR_CHERRYWOOD;
      case 'maple':
        return IMG_SBTXR_MAPLE;

      case 'standard rust':
        return IMG_SBTXR_CLASSIC_RUST;
      case 'copper':
        return IMG_SBTXR_COPPER;
      case 'penny':
        return IMG_SBTXR_PENNY;
      case 'zinc':
        return IMG_SBTXR_ZINC;
      case 'fusion':
        return IMG_SBTXR_FUSION;
      case 'galvanized':
        return IMG_SBTXR_GALVANIZED;

      case 'antique gold':
        return IMG_SBTXR_ANTIQUE_GOLD;
      case 'gilded crest':
        return IMG_SBTXR_GILDED_CREST;
      case 'classic crown':
        return IMG_SBTXR_CLASSIC_CROWN;
      case 'golden glow':
        return IMG_SBTXR_GOLDEN_GLOW;
      case 'gold nugget':
        return IMG_SBTXR_GOLD_NUGGET;

      case 'midnight hour':
        return IMG_SBTXR_HOUR;
      case 'chrome':
        return IMG_SBTXR_CHROME;
      case 'carbide':
        return IMG_SBTXR_CARBIDE;
      case 'coal':
        return IMG_SBTXR_COAL;
      case 'tarnish':
        return IMG_SBTXR_TARNISH;
      case 'iron':
        return IMG_SBTXR_IRON;
    }
  } else if (type === 'material') {
    switch (name) {
      case 'aluminium':
        return IMG_MAT_ALUMINIUM;
      case 'steel':
        return IMG_MAT_STEEL;
      case 'rheinzink':
        return IMG_MAT_RHEINZINK;
    }
  } else if (type === 'printRoller') {
    switch (name) {
      case 'sandobi':
        return IMG_ROLLER_SANDOBI;
      case 'oak':
        return IMG_ROLLER_OAK;
      case 'brushed':
        return IMG_ROLLER_BRUSHED;
      case 'kbrushed':
        return IMG_ROLLER_KBRUSHED;
      case 'spangle':
        return IMG_ROLLER_SPANGLE;
      case 'grande':
        return IMG_ROLLER_GRANDE;
      case 'k5':
        return IMG_ROLLER_K5;
      case 'delta':
        return IMG_ROLLER_DELTA;
      case 'morton':
        return IMG_ROLLER_MORTON;
      case 'bamboo':
        return IMG_ROLLER_BAMBOO;
      case 'rift':
        return IMG_ROLLER_RIFT;
      case 'maple':
        return IMG_ROLLER_MAPLE;
      case 'terrazzo1':
        return IMG_ROLLER_TERRAZZO1;
      case 'terrazzo2':
        return IMG_ROLLER_TERRAZZO2;
      case 'hairline':
        return IMG_ROLLER_HAIRLINE;
    }
  } else if (type === 'colorType') {
    switch (name) {
      case 'standard':
        return IMG_COLORTYPE_STANDARD;
      case 'metallic':
        return IMG_COLORTYPE_METALLIC_SMALL;
      case 'custom':
        return IMG_COLORTYPE_CUSTOM;
    }
  } else if (type === 'texture') {
    switch (name) {
      case 'wood':
      case 'TimberMet':
        return IMG_TXR_WOOD;
      case 'luxuriousMetal':
      case 'BRAZEN':
        return IMG_TXR_LUX;
      case 'ore':
      case 'ORE':
        return IMG_TXR_ORE;
      case 'rustic':
      case 'K5':
        return IMG_TXR_RUSTIC;
      case 'darkAgedMetal':
      case 'MIDNIGHT':
        return IMG_TXR_METAL;
    }
  } else if (type === 'standardColor') {
    switch (name) {
      case 'metallic':
        return IMG_COLOR_BACKGROUND_METALLIC;
      case 'agedBronze':
        return IMG_COLOR_AGED_BRONZE;
      case 'brickRed':
        return IMG_COLOR_BRICK_RED;
      case 'colonialRed':
        return IMG_COLOR_COLONIAL_RED;
      case 'copperPenny':
        return IMG_COLOR_COPPER_PENNY;
      case 'darkBronze':
        return IMG_COLOR_DARK_BRONZE;
      case 'evergreen':
        return IMG_COLOR_EVERGREEN;
      case 'forestGreen':
        return IMG_COLOR_FOREST_GREEN;
      case 'matteBlack':
        return IMG_COLOR_MATTE_BLACK;

      case 'metallicBrass':
        return IMG_COLOR_METALLIC_BRASS;
      case 'metallicBrightCopper':
        return IMG_COLOR_METALLIC_BRIGHT_COPPER;
      case 'metallicChampagne':
        return IMG_COLOR_METALLIC_CHAMPAGNE;
      case 'metallicDarkBlueMetallic':
        return IMG_COLOR_METALLIC_DARK_BLUE_METALLIC;
      case 'metallicDarkPewter':
        return IMG_COLOR_METALLIC_DARK_PEWTER;
      case 'metallicEmeraldGreenMetallic':
        return IMG_COLOR_METALLIC_EMERALD_GREEN_METALLIC;
      case 'metallicGold':
        return IMG_COLOR_METALLIC_GOLD;
      case 'metallicLightBlueMetallic':
        return IMG_COLOR_METALLIC_LIGHT_BLUE_METALLIC;
      case 'metallicPewter':
        return IMG_COLOR_METALLIC_PEWTER;
      case 'metallicPinkMetallic':
        return IMG_COLOR_METALLIC_PINK_METALLIC;
      case 'metallicRedCopper':
        return IMG_COLOR_METALLIC_RED_COPPER;
      case 'metallicSilver':
        return IMG_COLOR_METALLIC_SILVER;

      case 'oldTownGray':
        return IMG_COLOR_OLD_TOWN_GRAY;
      case 'patinaGreen':
        return IMG_COLOR_PATINA_GREEN;
      case 'rawhide':
        return IMG_COLOR_RAWHIDE;
      case 'redwood':
        return IMG_COLOR_REDWOOD;
      case 'regalBlue':
        return IMG_COLOR_REGAL_BLUE;
      case 'regalWhite':
        return IMG_COLOR_REGAL_WHITE;
      case 'sandstone':
        return IMG_COLOR_SANDSTONE;
      case 'slateBlue':
        return IMG_COLOR_SLATE_BLUE;
      case 'slateGray':
        return IMG_COLOR_SLATE_GRAY;
      case 'snowdriftWhite':
        return IMG_COLOR_SNOWDRIFT_WHITE;
      case 'surreyBeige':
        return IMG_COLOR_SURREY_BEIGE;
      case 'custom':
        return IMG_COLOR_CUSTOM;
    }
  }

  return IMG_NOT_FOUND;
};

const PANTONE = [
  {
    value: 'Brass: 2328 C',
    hex: '#786748',
  },
  {
    value: 'Bright Copper: 7586 C',
    hex: '#9E5330',
  },
  {
    value: 'Champagne: 403 C',
    hex: '#8C857B',
  },
  {
    value: 'Dark Blue Metallic: 7545 C',
    hex: '#425563',
  },
  {
    value: 'Dark Pewter: 2336 C',
    hex: '#4E4B48',
  },
  {
    value: 'Emerald Green Metallic: 624 C',
    hex: '#789F90',
  },
  {
    value: 'Gold: 7504 C',
    hex: '#94795D',
  },
  {
    value: 'Light Blue Metallic: 2176 C',
    hex: '#A6B8C1',
  },
  {
    value: 'Pewter: Cool Gray 9 C',
    hex: '#75787B',
  },
  {
    value: 'Pink Metallic: 7615 C',
    hex: '#866761',
  },
  {
    value: 'Red Copper:  7610 C',
    hex: '#683431',
  },
  {
    value: 'Silver: Cool Gray 3 C',
    hex: '#C8C9C4',
  },
  {
    value: '2179 C',
    hex: '#527A8A',
  },
  {
    value: '411 C',
    hex: '#5E514D',
  },
  {
    value: '412 C',
    hex: '#382F2D',
  },
  {
    value: '5803 C',
    hex: '#C3C6A8',
  },
  {
    value: '7588 C',
    hex: '#7E4C36',
  },
];

const getHexFromPantone = pantoneName => {
  const pantone = _.find(PANTONE, s => {
    return s.value === pantoneName;
  });
  return pantone ? pantone.hex : '';
};

const getPantoneFromHex = hex => {
  const pantone = _.find(PANTONE, s => {
    return s.hex === hex;
  });
  return pantone ? pantone.value : '';
};

module.exports = {
  getImageByNameAndType,
  getHexFromPantone,
  getPantoneFromHex,
  PANTONE,
};
