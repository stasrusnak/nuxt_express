
const mongodb = require("mongodb");
const { Router } = require('express')
const router = Router()
 const  connectUrl = process.env.API_TOKEN;

 console.log(connectUrl)

// Get Posts
router.get("/posts", async (req, res) => {
  const posts = await loadPostsCollection();
  // res.send(await posts.find().sort({PTS:-1}) .toArray());
  res.send(await posts.aggregate([
    {
      $setWindowFields: {
        sortBy: {PTS: -1},
        output: {rank: {$rank: {}}}
      }
    },
  ]).toArray());

});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    user: req.body.user,
    rating: req.body.rating,
    title: req.body.title,
    text: req.body.text,
    likes: req.body.likes,
    createdAt: new Date(),
  });
  res.status(201).send();
});


// Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

// Update Post (Likes)
router.put("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.updateOne(
    {_id: new mongodb.ObjectID(req.params.id)},
    {$set: {likes: req.body.newLikes}}
  );
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    connectUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );


  return client.db("WC3_STATS").collection("users");
}

module.exports = router;
