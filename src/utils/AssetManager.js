import React from "react";

export function getOCMPrintRollers(){
  return [
    {key: 'blank_print', name: 'BLANK'},
    {key: 'bamboo', name: 'Bamboo'},
    {key: 'brushed', name: 'Brushed'},
    {key: 'delta', name: 'Delta'},
    {key: 'grande', name: 'Grande'},
    {key: 'hairline', name: 'Hairline'},
    {key: 'k5_print', name: 'K5'},
    {key: 'kovabrushed', name: 'Kova Brushed'},
    {key: 'maple_print', name: 'Maple'},
    {key: 'morton', name: 'Morton'},
    {key: 'oak_print', name: 'Oak'},
    {key: 'rift', name: 'Rift'},
    {key: 'sandobi1', name: 'Sandobi 1'},
    {key: 'sandobi2', name: 'Sandobi 2'},
    {key: 'spangle', name: 'Spangle'},
    {key: 'terrazzo_a', name: 'Terrazzo A'},
    {key: 'terrazzo_b', name: 'Terrazzo B'},
  ]
}

export const bamboo = require('../assets/printRollers/bamboo_1_w_trans.png');
export const brushed = require('../assets/printRollers/brushed_1_w_trans.png');
export const delta = require('../assets/printRollers/delta_1_w_trans.png');
export const grande = require('../assets/printRollers/grande_1_w_trans.png');
export const hairline = require('../assets/printRollers/hairline_1_90_w_trans.png');
export const k5_print = require('../assets/printRollers/k5_1_w_trans.png');
export const kovabrushed = require('../assets/printRollers/kovabrushed_1_90_w_trans.png');
export const maple_print = require('../assets/printRollers/maple_1_90_w_trans.png');
export const metallicPaint = require('../assets/printRollers/metallicPaint.png');
export const morton = require('../assets/printRollers/morton_1_w_trans.png');
export const oak_print = require('../assets/printRollers/oak_1_90_w_trans.png');
export const rift = require('../assets/printRollers/rift_1_90_w_trans.png');
export const sandobi1 = require('../assets/printRollers/sandobi_full_1_w_trans.png');
export const sandobi2 = require('../assets/printRollers/sandobi_full_2_w_trans.png');
export const spangle = require('../assets/printRollers/spangle_1_w_trans.png');
export const terrazzo_a = require('../assets/printRollers/terrazzo_a_1_w_trans.png');
export const terrazzo_b = require('../assets/printRollers/terrazzo_b_1_w_trans.png');
export const blank_print = require('../assets/printRollers/blank.png');



export function getOCMFinishes(){
 return [
   {title: 'Brazen',
     data: [   {key: 'antiqueGold', name: 'Antique Gold', imgUrl: `brazen/antiqueGold.png`},
       {key: 'classicCrown', name: 'Classic Crown', imgUrl: `brazen/classicCrown.png`},
       {key: 'gildedCrest', name: 'Gilded Crest', imgUrl: `brazen/gildedCrest.png`},
       {key: 'goldenGlow', name: 'Golden Glow', imgUrl: `brazen/goldenGlow.png`},
       {key: 'goldNugget', name: 'Gold Nugget', imgUrl: `brazen/goldNugget.png`}]},
   {title: 'K5',
     data: [   {key: 'classicRust', name: 'Classic Rust', imgUrl: `k5/classicRust.png`},
      {key: 'copper', name: 'Copper', imgUrl: `k5/copper.png`},
      {key: 'fusion', name: 'Fusion', imgUrl: `k5/fusion.png`},
      {key: 'galvanized', name: 'Galvanized', imgUrl: `k5/galvanized.png`},
      {key: 'penny', name: 'Penny', imgUrl: `k5/penny.png`},
      {key: 'zinc', name: 'Zinc', imgUrl: `k5/zinc.png`}]},
   {title: 'Midnight',
     data: [   {key: 'midnightCarbide', name: 'Midnight Carbide', imgUrl: `midnight/midnightCarbide.png`},
       {key: 'midnightChrome', name: 'Midnight Chrome', imgUrl: `midnight/midnightChrome.png`},
       {key: 'midnightCoal', name: 'Midnight Coal', imgUrl: `midnight/midnightCoal.png`},
       {key: 'midnightHour', name: 'Midnight Hour', imgUrl: `midnight/midnightHour.png`},
       {key: 'midnightIron', name: 'Midnight Iron', imgUrl: `midnight/midnightIron.png`},
       {key: 'midnightTarnish', name: 'Midnight Tarnish', imgUrl: `midnight/midnightTarnish.png`}]},
   {title: 'Ore',
     data: [   {key: 'blackOre', name: 'Black Ore', imgUrl: `ore/blackOre.png`},
       {key: 'chromiumOre', name: 'Chromium Ore', imgUrl: `ore/chromiumOre.png`},
       {key: 'cobaltOre', name: 'Cobalt Ore', imgUrl: `ore/cobaltOre.png`},
       {key: 'copperOre', name: 'Copper Ore', imgUrl: `ore/copperOre.png`},
       {key: 'copperOre', name: 'Desert Ore', imgUrl: `ore/desertOre.png`}]},
   {title: 'Timbermet',
     data: [   {key: 'cherrywood', name: 'Cherry Wood', imgUrl: `timbermet/cherrywood.png`},
       {key: 'maple', name: 'Maple', imgUrl: `timbermet/maple.png`},
       {key: 'oak', name: 'Oak', imgUrl: `timbermet/oak.png`}]},
   { title: 'Other',
     data: [   {key: 'darkAgedMetal', name: 'Dark Aged Metal', imgUrl: `darkAgedMetal.png`},
      {key: 'luxuriousMetal', name: 'Luxurious Metal', imgUrl: `luxuriousMetal.png`},
      {key: 'ore', name: 'Ore', imgUrl: `ore.png`},
      {key: 'rustic', name: 'Rustic', imgUrl: `rustic.png`},
      {key: 'wood', name: 'Wood', imgUrl: `wood.png`}]}
 ];
}

// This SUCKS. React-Native will not let you create dynamic require strings, so all the image
// assets have to be built and mapped here.
export const antiqueGold = require('../assets/texture/brazen/antiqueGold.png');
export const classicCrown = require('../assets/texture/brazen/classicCrown.png');
export const gildedCrest = require('../assets/texture/brazen/gildedCrest.png');
export const goldenGlow = require('../assets/texture/brazen/goldenGlow.png');
export const goldNugget = require('../assets/texture/brazen/goldNugget.png');
export const classicRust = require('../assets/texture/k5/classicRust.png');
export const copper = require('../assets/texture/k5/copper.png');
export const fusion = require('../assets/texture/k5/fusion.png');
export const galvanized = require('../assets/texture/k5/galvanized.png');
export const penny = require('../assets/texture/k5/penny.png');
export const zinc = require('../assets/texture/k5/zinc.png');
export const midnightCarbide = require('../assets/texture/midnight/midnightCarbide.png');
export const midnightChrome = require('../assets/texture/midnight/midnightChrome.png');
export const midnightCoal = require('../assets/texture/midnight/midnightCoal.png');
export const midnightHour = require('../assets/texture/midnight/midnightHour.png');
export const midnightIron = require('../assets/texture/midnight/midnightIron.png');
export const midnightTarnish = require('../assets/texture/midnight/midnightTarnish.png');
export const blackOre = require('../assets/texture/ore/blackOre.png');
export const chromiumOre = require('../assets/texture/ore/chromiumOre.png');
export const cobaltOre = require('../assets/texture/ore/cobaltOre.png');
export const copperOre = require('../assets/texture/ore/copperOre.png');
export const desertOre = require('../assets/texture/ore/desertOre.png');
export const cherrywood = require('../assets/texture/timbermet/cherrywood.png');
export const maple = require('../assets/texture/timbermet/maple.png');
export const oak = require('../assets/texture/timbermet/oak.png');
export const darkAgedMetal = require('../assets/texture/darkAgedMetal.png');
export const luxuriousMetal = require('../assets/texture/luxuriousMetal.png');
export const ore = require('../assets/texture/ore.png');
export const rustic = require('../assets/texture/rustic.png');
export const wood = require('../assets/texture/wood.png');

export const staticImageUrlMap = {
  'antiqueGold': antiqueGold,
  'classicCrown': classicCrown,
  'gildedCrest': gildedCrest,
  'goldenGlow': goldenGlow,
  'goldNugget': goldNugget,
  'classicRust': classicRust,
  'copper': copper,
  'fusion': fusion,
  'galvanized': galvanized,
  'penny': penny,
  'zinc': zinc,
  'midnightCarbide': midnightCarbide,
  'midnightChrome': midnightChrome,
  'midnightCoal': midnightCoal,
  'midnightHour': midnightHour,
  'midnightIron': midnightIron,
  'midnightTarnish': midnightTarnish,
  'blackOre': blackOre,
  'chromiumOre': chromiumOre,
  'cobaltOre': cobaltOre,
  'copperOre': copperOre,
  'desertOre': desertOre,
  'cherrywood': cherrywood,
  'maple': maple,
  'oak': oak,
  'darkAgedMetal': darkAgedMetal,
  'luxuriousMetal': luxuriousMetal,
  'ore': ore,
  'rustic': rustic,
  'wood': wood,

  'BLANK': blank_print,
  'bamboo': bamboo,
  'brushed': brushed,
  'delta': delta,
  'grande': grande,
  'hairline': hairline,
  'k5_print': k5_print,
  'kovabrushed': kovabrushed,
  'maple_print': maple_print,
  'metallicPaint': metallicPaint,
  'morton': morton,
  'oak_print': oak_print,
  'rift': rift,
  'sandobi1': sandobi1,
  'sandobi2': sandobi2,
  'spangle': spangle,
  'terrazzo_a': terrazzo_a,
  'terrazzo_b': terrazzo_b,
}
