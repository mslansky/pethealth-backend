'use strict';
const express = require('express');
const diaryService = require('./diaryService');
const diaryRouter = express.Router();

diaryRouter
  .route('/')
  .post((req, res, next) => {
    diaryService.insertDiary(req.app.get('db'), req.body)
      .then((diary) => {
        res.json(diary);
      })
      .catch((error) => {
        res.json(error);
      });
  })
  .route('/:diaryid')
  .get((req, res, next) => {
    diaryService.getOneDiary(req.app.get('db'))
      .then((diaries) => {
        res.json(diaries);
      });
  })
  .post((req, res, next) => {
    diaryService.updateDiary(req.app.get('db'), req.body)
      .then((diary) => {
        res.json(diary);
      })
      .catch((error) => {
        res.json(error);
      });
  })
  .delete((req, res, next) => {
    diaryService.deleteDiary(req.app.get('db'), req.param.diaryid)
      .then((diary) =>{
        res.json(diary);
      })
      .catch((error) => {
        res.json(error);
      });
  })
  .route('/pet/:petname')
  .get((req, res, next) => {
    diaryService.getAllDiaries(req.app.get('db'), req.param.petname)
      .then((diaries) => {
        res.json(diaries);
      });
  });
  

module.exports = diaryRouter;