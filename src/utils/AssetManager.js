import { Image } from "react-native";
import React from "react";

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
       {key: 'desertOre', name: 'Desert Ore', imgUrl: `ore/desertOre.png`}]},
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
