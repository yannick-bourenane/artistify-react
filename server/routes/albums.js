/*------------------------------------------
// ALBUMS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const albumModel = require("../models/Album");
const uploader = require("./../config/cloudinary");

const getAverageRate = async idAlbum => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
  res.status(200).json({ msg: "@todo" });
};

router.get("/albums", (req, res, next) => {
  // let's determine the sort query either a number or an empty object
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object,
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  albumModel
    .find() // fetch all documents from albums collection
    .populate({
      // populate "joins" uses provided objectId references an object from an other collection
      path: "artist", // here the associated artist document will be fetched as well
      populate: {
        // one can nest population
        path: "style" // here the style document asssociated to the artist is feched as well
      }
    })
    .populate("label") // chaining population is also possible, here for label documents
    .sort(sortQ) // the provided sort query comes into action here
    .limit(limitQ) // same thing for the limit query
    .then(async albums => {
      // AVG : things are getting tricky here ! :)
      // the following map is async, updating each artist with an avg rate
      const albumsWithRatesAVG = await Promise.all(
        albums.map(async album => {
          const copy = album.toJSON();
          // copy.avg = await getAverageRate(album._id);
          copy.isFavorite =
            req.user && req.user.favorites.albums.includes(copy._id.toString());
          return copy;
        })
      );

      res.json({ albums: albumsWithRatesAVG });
    })
    .catch(next);
});

router.get("/albums/:id", (req, res, next) => {
  albumModel
    .findById(req.params.id)
    .populate("label")
    .populate("artist")
    .then(album => {
      const { title, releaseDate, artist, description, label, cover } = album;
      res
        .status(200)
        .json({ title, releaseDate, artist, description, label, cover });
    })
    .catch(next);
});

router.post("/albums", uploader.single("cover"), (req, res, next) => {
  const album = req.body;
  if (req.file) album.cover = req.file.secure_url;

  albumModel
    .create(album)
    .then(createdAlbum => {
      res.status(200).json({ msg: "Album successfully created" });
      console.log(createdAlbum);
    })
    .catch(dbErr => {
      res.status(500).json({ msg: "An error occured" });
      next(dbErr);
    });
});

router.patch("/albums/:id", uploader.single("cover"), (req, res, next) => {
  const album = req.body;
  if (req.file) album.cover = req.file.secure_url;

  albumModel
    .findByIdAndUpdate(req.params.id, album, { new: true })
    .then(editedAlbum => {
      res.status(200).json({ msg: "Album successfully created" });
      console.log(editedAlbum);
    })
    .catch(dbErr => {
      res.status(500).json({ msg: "An error occured" });
      next(dbErr);
    });
});

router.delete("/albums/:id", (req, res, next) => {
  albumModel
    .findByIdAndDelete(req.params.id)
    .then(deletedAlbum => console.log(deletedAlbum))
    .catch(next);
});

module.exports = router;
