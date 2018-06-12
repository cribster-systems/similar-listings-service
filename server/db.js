const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://34.207.143.40:27017/similarlistingsalt');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('we are connected to similarlistings!');
});

let listingSchema = mongoose.Schema({
  locationId: {type: Number, index: true, unique: true},
  imageUrl: String,
  description: String,
  title: String,
  price: Number,
  num_reviews: Number,
  avg_rating: Number,
  keywords: [String],
  bedrooms: Number,
  similarListings: [Number]
});

const Listing = mongoose.model('Listing', listingSchema);

const save = (listingObj, callback) => {
  Listing.findOneAndUpdate({locationId: listingObj.locationId}, listingObj, {upsert: true, new: true}, (err, listing) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, listing);
    }
  })
};

const getSimilarListings = (id, callback) => {
  let query = {};
  query['locationId'] = id;
  Listing.findOne(query, 'similarListings')
  .then((listing) => {
    let ids = listing.similarListings;
    return Listing.find({ locationId: {$in: ids} })
  })
  .then((listings) => {
    callback(null, listings);
  })
  .catch((err) => callback(err, null));
}

module.exports.save = save;
module.exports.getSimilarListings = getSimilarListings;
module.exports.Listing = Listing;
module.exports.db = db;