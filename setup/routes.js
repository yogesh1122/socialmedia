const user = require("../routes/userRoutes")


module.exports= (app) =>
{
   app.use('/api',user) 
 
}