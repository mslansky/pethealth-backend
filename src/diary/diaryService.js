'use strict';

const diaryService = {

  insertDiary(knex, newDiary) {
    return knex
      .insert(newDiary)
      .into('diaries')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getOneDiary (knex, id){
    return knex('diaries').where({id: id});
  },

  updateDiary (knex, diary){
    return knex('diaries').where({ id: diary.id })
      .update(diary)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },


  deleteDiary (knex, id) {
    return knex('diaries')
      .where({ id: id})
      .del();
  },

  getAllDiaries (knex, name) {
    return knex('diaries').where({name: name});
  },


};

module.exports = diaryService;