'use strict';
const express = require('express');
const router = express.Router();
const SongController = require('../controllers').Songs;

router.route('/')
  .get(SongController.getAll)
  .post(SongController.create)
  ;

router.route('/nameUrl')
  .post(SongController.getOneByNameUrl)
  ;

router.route('/relTest')
  .get(SongController.relTest)
  ;

router.route('/relTest2/:profile_id')
  .get(SongController.relTest2)
  ;

router.route('/getAllSongsForUser/:id')
  .get(SongController.getAllSongsForUser)
  ;

router.route('/getOwner/:profile_id')
  .get(SongController.getOwner)
  ;

router.route('/:id')
  .get(SongController.getOne)
  .put(SongController.update)
  .delete(SongController.deleteOne)
  ;

module.exports = router;
