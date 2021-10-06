const Dandelion = require('../../models/Dandelion');
const { resultResponse, basicResponse } = require('../../config/response');
<<<<<<< HEAD
const { checkNameType, checkPositionType, checkDescriptionType } = require('./checkDetailValidation/Dandelion');
=======
const { checkNameType, checkPositionType, checkDescriptionType, checkAlreadyExist } = require('./Validation/Dandelion');
const { getKoreanTime } = require('../provider/util');
>>>>>>> 8e1f791f9a91007a0ec6776be6a5ae07910fcacc

const dandelion = {
  create: async (req, res) => {
    const userId = req.decoded._id;
    const { name, location, description } = req.body;
    //validation check 필요
    // type check와 undefined 아닌지 체크 ✅,✅
    // name : 한글영어숫자 혼용 공백 포함 8자 이내. ✅
    // latitude, longitude : 실수 ✅,✅
    // description : string ✅,✅
    // 완성해주시고 git wiki까지 작성해주시면 감사하겠습니다 ㅎㅎ

    if (!name || !location.latitude || !location.longitude)
      return res.json(basicResponse('Request Body에 정보가 누락되었습니다.'));
    //description 없다면 description : ""로 보내줄 것.
<<<<<<< HEAD
    const nameMessage = checkNameType(name);
    if (nameMessage) return res.json(basicResponse(nameMessage));

    const positionMessage = checkPositionType(location.longitude, location.latitude);
    if (positionMessage) return res.json(basicResponse(positionMessage));

    const descriptionMessage = checkDescriptionType(description);
    if (descriptionMessage) return res.json(basicResponse(descriptionMessage));

=======
    const nameMessage = await checkNameType(name);
    if (nameMessage) return res.json(basicResponse(nameMessage));

    const positionMessage = await checkPositionType(location.longitude, location.latitude);
    if (positionMessage) return res.json(basicResponse(positionMessage));

    const descriptionMessage = await checkDescriptionType(description);
    if (descriptionMessage) return res.json(basicResponse(descriptionMessage));

    const ExistPositionMessage = await checkAlreadyExist(location.longitude, location.latitude);
    if (ExistPositionMessage) return res.json(basicResponse(ExistPositionMessage));

    //한국 시간 해결 안됨..
>>>>>>> 8e1f791f9a91007a0ec6776be6a5ae07910fcacc
    const newDandelion = new Dandelion({
      name,
      _creator: userId,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      description,
      level: 1,
<<<<<<< HEAD
      createdAt: Date.now(),
=======
      createdAt: await getKoreanTime(),
>>>>>>> 8e1f791f9a91007a0ec6776be6a5ae07910fcacc
    });
    newDandelion
      .save()
      .then((result) => res.json(resultResponse('민들레 생성에 성공했습니다.', true, { data: result })))
      .catch((err) => {
        console.log(err);
        return res.json(basicResponse('민들레 생성 중 에러가 발생하였습니다.'));
      });
  },
  get: async (req, res) => {
    const { centerPosition, maxDistance } = req.body;

    if (!centerPosition || !maxDistance) return res.json(basicResponse('Request Body에 정보가 누락되었습니다.'));

    if (!centerPosition.latitude || !centerPosition.longitude)
      return res.json(basicResponse('uppderLeftPosition의 위치 정보가 누락되었습니다.'));

<<<<<<< HEAD
    const positionMessage = checkPositionType(centerPosition.longitude, centerPosition.latitude);
    if (positionMessage) return res.json(basicResponse(positionMessage));
=======
    const positionMessage = await checkPositionType(centerPosition.longitude, centerPosition.latitude);
    if (positionMessage) return res.json(basicResponse('해당 위치에 이미 민들레가 존재합니다.'));
>>>>>>> 8e1f791f9a91007a0ec6776be6a5ae07910fcacc

    Dandelion.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [centerPosition.longitude, centerPosition.latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    })
      .select('_id location level name')
      .limit(100)
      .then((result) => {
        let response = [];
        for (let i = 0; i < result.length; i++) {
          let resObj = {};
          resObj.name = result[i].name;
          resObj.level = result[i].level;
          resObj._id = result[i]._id;
          resObj.location = {};
          resObj.location.longitude = result[i].location.coordinates[0];
          resObj.location.latitude = result[i].location.coordinates[1];
<<<<<<< HEAD
          resObj.ovelap = false;
          response.push(resObj);
=======
          response.push(resObj);
          resObj = null;
>>>>>>> 8e1f791f9a91007a0ec6776be6a5ae07910fcacc
        }

        return res.json(resultResponse('민들레 불러오기에 성공했습니다.', true, { data: response }));
      })
      .catch((err) => {
        console.log(err);
        return res.json(basicResponse('민들레 불러오기 중 에러가 발생하였습니다.'));
      });
  },
};

module.exports = dandelion;
