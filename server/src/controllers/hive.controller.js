import { Hive } from '../models/hives.model.js';
import ApiResponse from '../utils/apiResponse.js';
import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { Parser } from 'json2csv';

const createHiveLog = AsyncHandler(async(req, res)=>{
    const {latitude, longitude, numColonies} = req.body;

    const hiveLog = await Hive.create({
      hiveId: `HIVE${Date.now()}`,
      datePlaced: new Date().toISOString().split('T')[0],
      location:{
        type: 'Point',
        coordinates: [latitude, longitude]
      },
      numColonies: numColonies,
    })

    const createdHive = await Hive.findById(hiveLog._id);
    if(!createdHive) throw new ApiError(500, "Something went wrong.");
    return res.json(new ApiResponse(201, createdHive, "Hive log has been added succesfully."))

})

const getHiveLog = AsyncHandler(async(req, res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const {startDate, endDate} = req.query;

  const query = {};

  if (startDate || endDate) {
    query.datePlaced = {};
    if (startDate) {
      query.datePlaced.$gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.datePlaced.$lte = end;
    }
  }

  const hiveLogData = await Hive.find(query).skip(limit* (page-1)).limit(limit);
  return res.json(new ApiResponse(201, hiveLogData, "Hive log data has been fetched succesfully."))

})

const getHiveLogCSV = AsyncHandler(async(req, res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const {startDate, endDate} = req.query;

  const query = {};

  if (startDate || endDate) {
    query.datePlaced = {};
    if (startDate) {
      query.datePlaced.$gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.datePlaced.$lte = end;
    }
  }

  const hiveLogData = await Hive.find(query).skip(limit* (page-1)).limit(limit);

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(hiveLogData);

  res.header('Content-Type', 'text/csv');
  res.attachment('crop-data.csv');
  return res.status(200).send(csv);

})

export {createHiveLog, getHiveLog, getHiveLogCSV};