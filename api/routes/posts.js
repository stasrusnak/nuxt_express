const mongodb = require("mongodb");
const { Router } = require('express')
const router = Router()
const  connectUrl = process.env.MONGO_CONNECT;


// Get Posts
router.get("/posts", async (req, res) => {
  const posts = await loadPostsCollection();
  let count  = await posts.countDocuments()
  // res.send(await posts.find().sort({PTS:-1}) .toArray());
  if(count !==0){
   let base=[]
   let postsbase
   let rank = 0;
    postsbase = await posts.find().sort({"PTS": -1 }).toArray()
    postsbase.forEach(doc => {
        rank++;
        doc.rank = rank;
        delete doc._id;
        base.push(doc);
      })
    res.send(base);
  }else {
    res.status(201).send([]);
  }

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
    connectUrl+'?authSource=admin',
    {
      useUnifiedTopology:true,
      useNewUrlParser: true
    }
  )

  return client.db("WC3_STATS").collection("users");
}

module.exports = router;
