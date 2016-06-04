/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

$(document).ready(function() {
  var snapshotButton = document.querySelector('button#snapshot');
  var filterSelect = document.querySelector('select#filter');
  var video = window.video = document.querySelector('video');
  var canvas = window.canvas = document.querySelector('canvas');

  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight + 160;

  $(window).resize(function() {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight + 160;
  });

  snapshotButton.onclick = function() {
    var beardImage = document.querySelector('img');
    var beardVideo = document.querySelector('video');

    var beardCanvasWidth = beardVideo.clientWidth;
    var beardCanvasHeight = beardVideo.clientHeight;

    var beardImageWidth = beardImage.clientWidth;
    var beardImageHeight = beardImage.clientHeight;

    var beardXPosition = (beardCanvasWidth - beardImageWidth) / 2;
    var beardYPosition = (beardCanvasHeight - beardImageHeight) * 0.5 + 11;

    canvas.height = beardVideo.clientHeight;
    canvas.className = filterSelect.value;
    
    canvas.getContext('2d').drawImage(beardVideo, 0, 0, beardCanvasWidth, beardCanvasHeight);
    canvas.getContext('2d').drawImage(beardImage, beardXPosition, beardYPosition, beardImageWidth, beardImageHeight);
  };

  filterSelect.onchange = function() {
    video.className = filterSelect.value;
  };

  var constraints = {
    audio: false,
    video: true
  };

  function successCallback(stream) {
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  navigator.mediaDevices.getUserMedia(
    constraints
  ).then(
    successCallback,
    errorCallback
  );

});
