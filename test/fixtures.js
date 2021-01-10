'use strict';
function createPetDiaries (){
  return [
    {
      'id': 1,
      'name': 'Oliver',
      'diarydate': '2020-12-04',
      'medication': 'Trifexis',
      'weight': '11 pounds',
      'diet': '1/2 cup kibble in the morning, 1 can of wet food at dinner',
      'allergies': 'allergic to eggs',
      'body': 'needs a nail trim soon',
      'other': 'seems to be a little lethargic'
    },
    {
      'id': 29,
      'name': 'Oliver',
      'diarydate': '2021',
      'medication': null,
      'weight': null,
      'diet': null,
      'allergies': null,
      'body': null,
      'other': null
    },
    {
      'id': 30,
      'name': 'Oliver',
      'diarydate': '2021-01-12',
      'medication': null,
      'weight': null,
      'diet': null,
      'allergies': null,
      'body': null,
      'other': null
    }
  ];
}

function createProfiles(){
  return [
    {
      'id': 100,
      'name': 'Madison'
    },
    {
      'id': 103,
      'name': 'Maeby'
    },
    {
      'id': 105,
      'name': 'Bento'
    },
    {
      'id': 108,
      'name': 'Tofu'
    }
  ];
}

module.exports = {
  createPetDiaries,
  createProfiles
};