'use strict';

const profileService = {
  getAllProfiles(knex) {
    return knex.select('*').from('profiles');
  },

  insertProfile (knex, newProfile) {
    return knex
      .insert(newProfile)
      .into('profiles')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
};

module.exports = profileService;