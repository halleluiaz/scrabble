/*
File: js/script.js
GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
Halleluia Zeyohannes, UMass Lowell Computer Science, 
halleluia_zeyohannes@student.uml.edu
Copyright (c) 2022 by Halleluia Zeyohannes. All rights reserved. May be freely
copied or excerpted for educational purposes with credit to the author.
updated by HZ on 21 Dec 2022 at 2PM

Purpose:
*/
"use strict";

// globals to be accessed
var ScrabbleTiles = [] ;        // associative array adapted from Prof. Jesse Heines with letter ditribution
ScrabbleTiles["A"] = { "value" : 1,  "original_distribution" : 9,  "number_remaining" : 9,  "image" : "../img/tiles/Scrabble_Tile_A.jpg"  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_B.jpg"  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_C.jpg"  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original_distribution" : 4,  "number_remaining" : 4,  "image" : "../img/tiles/Scrabble_Tile_D.jpg"  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original_distribution" : 12, "number_remaining" : 12, "image" : "../img/tiles/Scrabble_Tile_E.jpg"} ;
ScrabbleTiles["F"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_F.jpg"  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original_distribution" : 3,  "number_remaining" : 3,  "image" : "../img/tiles/Scrabble_Tile_G.jpg"  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_H.jpg"  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original_distribution" : 9,  "number_remaining" : 9,  "image" : "../img/tiles/Scrabble_Tile_I.jpg"  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original_distribution" : 1,  "number_remaining" : 1,  "image" : "../img/tiles/Scrabble_Tile_J.jpg"  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original_distribution" : 1,  "number_remaining" : 1,  "image" : "../img/tiles/Scrabble_Tile_K.jpg"  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original_distribution" : 4,  "number_remaining" : 4,  "image" : "../img/tiles/Scrabble_Tile_L.jpg"  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_M.jpg"  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original_distribution" : 6,  "number_remaining" : 6,  "image" : "../img/tiles/Scrabble_Tile_N.jpg"  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original_distribution" : 8,  "number_remaining" : 8,  "image" : "../img/tiles/Scrabble_Tile_O.jpg"  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_P.jpg"  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original_distribution" : 1,  "number_remaining" : 1,  "image" : "../img/tiles/Scrabble_Tile_Q.jpg"  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original_distribution" : 6,  "number_remaining" : 6,  "image" : "../img/tiles/Scrabble_Tile_R.jpg"  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original_distribution" : 4,  "number_remaining" : 4,  "image" : "../img/tiles/Scrabble_Tile_S.jpg"  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original_distribution" : 6,  "number_remaining" : 6,  "image" : "../img/tiles/Scrabble_Tile_T.jpg"  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original_distribution" : 4,  "number_remaining" : 4,  "image" : "../img/tiles/Scrabble_Tile_U.jpg"  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_V.jpg"  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_W.jpg"  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original_distribution" : 1,  "number_remaining" : 1,  "image" : "../img/tiles/Scrabble_Tile_X.jpg"  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_Y.jpg"  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original_distribution" : 1,  "number_remaining" : 1,  "image" : "../img/tiles/Scrabble_Tile_Z.jpg"  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original_distribution" : 2,  "number_remaining" : 2,  "image" : "../img/tiles/Scrabble_Tile_Blank.jpg"  } ;

var stats = {                   // keep track of overall game score and how many tiles are left
    score: 0,
    tiles_left: 100
}

var current_word = {           // keep track of letters placed, the sum of their value, if the
    word: "",                  // word exists in dictionary, and if tiles are placed in multiplier slots 
    value: 0,
    valid: false,
    first_double: false,
    second_double: false,
    final_value: 0
}

// var hand = [];

// random_tiles() generates 7 random tiles from the "bag" and makes them draggable. They can only be dropped
// in an accepting droppable target otherwise they bounce back to where they were.
function random_tiles() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var num = -1;
    var letter = '';

    for(var i = 1; i <= 7; i++)
    {
        var img_id = "letter" + i;
        num = Math.floor(Math.random() * 27);       // random number from 0-26
        letter = alphabet.charAt(num);
        console.log("letter: " + letter + ", " + ScrabbleTiles[letter].number_remaining + " tiles left");
        while(ScrabbleTiles[letter].number_remaining == 0){     // ensure that the tiles drawn from bag are available
            num = Math.floor(Math.random() * 27);
            letter = alphabet.charAt(num);
        }
        document.getElementById(img_id).setAttribute("value", letter);
        document.getElementById(img_id).src = ScrabbleTiles[letter].image;
        ScrabbleTiles[letter].number_remaining--;
        console.log(ScrabbleTiles[letter].number_remaining + " tiles left");
        $(img_id).draggable({
            revert: "invalid"
        });
    }
}

// droppable_slots() creates the droppable targets(board slots and rack) for the tiles
function droppable_slots() {
    $(".droppable").droppable({
        accept: "img#draggable",
        drop: function( event, ui) {
            // EDIT HERE
        }
    })
}

// updates the display above the board for the word based on what the user has placed on it
function update_word() {

}

function submit_word(){
    console.log("to implement");
}

function clear_board() {
    console.log("to implement");
}

// restart game by reloading the page
function restart_game() {
    location.reload();
}