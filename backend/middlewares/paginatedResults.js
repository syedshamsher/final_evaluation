function paginatedResults(model) {
    return async (req, res, next) => {
      const page = Number.parseInt(req.query.page);
      const limit = Number.parseInt(req.query.limit);
      let doctorId = req.query.id;
      let sort = req.query.sort;
      console.log( sort )
      let filteredPatients = await model.find({ "doctor_id": doctorId }).sort(sortingValue(sort))
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      function sortingValue( sort ) {
        if( sort === "" ) {
          return({})
        } else if ( sort === "asc" ) {
          return ({age: "asc"})
        } else if( sort === "desc" ) {
          return({age: "desc"})
        }
      }
      

      const results = {};

      results.totalPages = Math.ceil( filteredPatients.length / limit )
      
      if (endIndex < filteredPatients.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
  
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit,
        };
      }
  
      try {
        results.current = await model.find({"doctor_id": doctorId}).sort(sortingValue(sort)).limit(limit).skip(startIndex).exec();
        res.pagination = results;
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }




module.exports = paginatedResults