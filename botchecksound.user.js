// ==UserScript==
// @name         Botcheck Sound
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Play a sound when the botcheck comes up. Also plays sound when running out of mana.
// @author       Kateus, Dangazzm, & Daniel Fanjul Alcutén
// @match        http://amar.bornofsnails.net/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function playBotcheckSound()
{
    var customAudio = new Audio("http://amar.brooksmcmillin.com/sound.mp3");
    customAudio.play();
}

Utils.onStartActionOriginal = Utils.onStartAction;

Utils.onStartAction = function(data)
{
    console.log(data);
    Utils.onStartActionOriginal(data);
    
    if(data["botcheck"]){
        playBotcheckSound();
		 document.title = "botcheck"
    } else if (data.custom){
        playBotcheckSound();
		 document.title = "botcheck"
    } else if (data.message && data.message.indexOf("You need mana to continue.") > -1){
        playBotcheckSound();
		document.title = "Out Of Mana"
    } else if (data.message && data.message.indexOf("You reached your action limit.") > -1){
        playBotcheckSound();
		 document.title = "Action Limit"
    }
}

// Combat botchecks
Combat.getBotcheckOriginal = Combat.getBotcheck;

Combat.getBotcheck = function()
{
    Combat.getBotcheckOriginal();
    playBotcheckSound();
	document.title = "Botcheck"
}

console.log("Botcheck Sound Loaded.");
