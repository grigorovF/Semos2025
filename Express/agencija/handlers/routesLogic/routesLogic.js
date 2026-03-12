const Route = require('../../pkg/tripSchema/routeSchema');

exports.addRoute = async(req, res) => {
    try{
        const {stops, pricePerSegment, maxPassengers, startDate, endDate} = req.body;

        const route = await Route.create({
            stops,
            pricePerSegment,
            maxPassengers,
            startDate,
            endDate,
        });
        res.status(201).json({
            message: "Route Created",
            route
        });
    }
    catch(err){
        res.status(500).json({ 
            error: err.message
        });
    }
}