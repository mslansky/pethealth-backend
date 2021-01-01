'use strict';

function clean(obj) {
  //exclude all empty attributes
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}

const diaryService = {

  insertDiary(knex, newDiary) {
    const insertDiary = clean(newDiary); 

    return knex
      .insert(insertDiary)
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