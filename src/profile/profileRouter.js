'use strict';
const express = require('express');
const { featurePolicy } = require('helmet');
const profileService = require('./profileService');
const profileRouter = express.Router();


profileRouter
  .route('/')
  .get((req, res, next) => {
    profileService.getAllProfiles(req.app.get('db'))
      .then((profiles) => {
        res.json(profiles);
      });
  })
  .post((req, res, next) => {
    console.log(req.body);
    profileService.insertProfile(req.app.get('db'), req.body)
      .then((profile) => {
        res.json(profile);
      })
      .catch((error) => {
        res.json(error);
      });
      
profileRouter
      .route('/:profilesid')
      .delete((req, res, next) => {
        profileService.deleteProfile(req.app.get('db'), req.params.profilesid)
          .then((profile) =>{
            res.json(profile);
          })
          .catch((error) => {
            res.json(error);
          });
  });
 


module.exports = profileRouter;