import { Crop } from '../models/crops.model.js';
import ApiResponse from '../utils/apiResponse.js';
import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { Parser } from 'json2csv';


const createCropCalendarEntry = AsyncHandler(async(req, res)=>{
    const {name, floweringStart, floweringEnd, latitude, longitude, recommendedHiveDensity} = req.body;

    if(!name || !floweringEnd || !floweringStart || !latitude || !longitude || !recommendedHiveDensity) {
      throw new ApiError(400, "name, floweringStart, floweringEnd, latitude, longitude, recommendedHiveDensity is required.");
    }

    const newCrop = await Crop.create({
      name: name,
      floweringStart: floweringStart,
      floweringEnd: floweringEnd,
      location:{
        type: 'Point',
        coordinates: [latitude, longitude]
      },
      recommendedHiveDensity: recommendedHiveDensity
    })

    const createdNewCrop = await Crop.findById(newCrop._id);
    if(!createdNewCrop) throw new ApiError(500, "Something went wrong.");
    return res.json(new ApiResponse(201, createdNewCrop, "New crop calendar entry has been added."));
})

const getNearByCrop = AsyncHandler(async(req, res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  let { latitude, longitude, radiusInKm, date } = req.query;
  if(!date) date = new Date();
  const radiusInRadians = (radiusInKm || 100) / 6378.1; // Earth radius in km
  const cropData = await Crop.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: (radiusInKm || 100) * 1000 // meters
      }
    },
    floweringStart: { $lte: new Date(date) },
    floweringEnd: { $gte: new Date(date) }
  })
  .skip(limit * (page-1)).limit(limit);

  return res.json(new ApiResponse(201, cropData, "Crop log data has been fetched succesfully."))

})

const getNearByCropCSV = AsyncHandler(async(req, res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  let { latitude, longitude, radiusInKm, date } = req.query;
  if(!date) date = new Date();
  const radiusInRadians = (radiusInKm || 100) / 6378.1; // Earth radius in km
  const cropData = await Crop.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: (radiusInKm || 100) * 1000 // meters
      }
    },
    floweringStart: { $lte: new Date(date) },
    floweringEnd: { $gte: new Date(date) }
  })
  .skip(limit * (page-1)).limit(limit);


  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(cropData);

  res.header('Content-Type', 'text/csv');
  res.attachment('crop-data.csv');
  return res.status(200).send(csv);

})

export {createCropCalendarEntry, getNearByCrop, getNearByCropCSV};