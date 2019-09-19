const express = require('express');
const router = express.Router();

const DiaryController = require('../controllers/diaries');

router.get('/:date', DiaryController.getDiaryWithDate);

router.get('/', DiaryController.getDiary);

router.post('/', DiaryController.createNewDiaryPage);

router.delete('/:date', DiaryController.deleteDiaryPage);

module.exports = router;
