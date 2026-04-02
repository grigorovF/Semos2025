const Counter = require('../pkg/schemas/counterSchema');

async function getNextSequence (programId, year){
    const counter = await Counter.findOneAndUpdate(
        { studyProgram: programId, year: year },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
    
      return counter.seq;
    }
    
module.exports = getNextSequence;