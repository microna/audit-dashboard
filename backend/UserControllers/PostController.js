
import PostModel from '../models/Post.js';

export const update = async (req, res) => {
   try {
      const postId = req.params.id; 
      PostModel.findOneAndUpdate(
         {
            _id: postId 
         },
         {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId 
         },
         (err, doc) => {
            if (err) {
               console.log(err);
               return res.status(500).json({
                  message: 'failed update this post'
               });
            }
            if (!doc) {
               return res.status(404).json({
                  message: 'Post not finded'
               });
            }

            res.json({
               success: true
            });
         }
      );
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed finded this one post'
      });
   }
};

export const remove = async (req, res) => {
   try {
      const postId = req.params.id; 

      PostModel.findOneAndDelete(
         {
            _id: postId 
         },
         (err, doc) => {

            if (err) {
               console.log(err);
               return res.status(500).json({
                  message: 'failed remove this post'
               });
            }

            if (!doc) {
               return res.status(404).json({
                  message: 'Post not finded'
               });
            }

            res.json({
               success: true
            });
         }
      );
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed finded this one post'
      });
   }
};

export const getOne = async (req, res) => {
   try {
      const postId = req.params.id; 

      PostModel.findOneAndUpdate(
         {
            _id: postId
         },
         {
            $inc: { viewsCount: 1 } 
         },
         {
            returnDocument: 'after'
         },
         (err, doc) => {
            if (err) {
               console.log(err);
               return res.status(500).json({
                  message: 'failed finded or update this one post'
               });
            }

            if (!doc) {
               return res.status(404).json({
                  message: 'Post not finded'
               });
            }
            res.json(doc); 
         }
      ).populate('user'); 
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed finded this one post'
      });
   }
};

export const getAll = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec(); 
      res.json(posts);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed find all posts',
         err
      });
   }
};

export const create = async (req, res) => {
   try {
      const doc = new PostModel({
         title: req.body.title, 
         text: req.body.text,
         imageUrl: req.body.imageUrl,
         tags: req.body.tags.split(','), 
         user: req.userId 
      });
      const post = await doc.save();

      res.json(post);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed create post',
         err
      });
   }
};

export const getLastTags = async (req, res) => {
   try {
      const posts = await PostModel.find()
         .limit() 
         .exec();

      const tags = posts
         .map((obj) => obj.tags)
         .flat()

         
      const fiveTags = [...new Set(tags)].filter((el) => el !== "")
         .slice(0, 5); 
      res.json(fiveTags); 
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed find tags',
         err
      });
   }
};

export const getAllPostsByTag = async (req, res) => {
   try {
    const tagName = req.params.name; 
    const postsByTag = await PostModel.find(
        {
            tags: tagName 
         },
    ).populate('user').exec();
   
      res.json(postsByTag); 
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed find posts by tags',
         err
      });
   }
};

export const postAllAndSortDate = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec();

      posts.sort((newDate, lastDate) => {
       
         return (
            Math.floor(new Date(lastDate.createdAt).getTime() / 1000) -
            Math.floor(new Date(newDate.createdAt).getTime() / 1000)
         );
      });

      res.json(posts);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed find all posts',
         err
      });
   }
};

export const postAllAndSortPopular = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec();

      posts.sort(
         (lowPopular, topPopulare) =>
            topPopulare.viewsCount - lowPopular.viewsCount
      );

      res.json(posts);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed find all posts',
         err
      });
   }
};


export const addComment = async (req, res) => {

    try {

     const postId = req.params.id; 

        PostModel.findOneAndUpdate(  

            {
                 _id:  postId
             },
              {
               $inc: { commentsCount: 1 }, 
               $push: {comments: {
                  
                  commentId: postId,
                  user: req.body.user,
                  comment: req.body.text,
                
          },
          
         } 
             },{new: true},
             (err, doc) => {
                if (err) {
                   console.log(err);
                   return res.status(500).json({
                      message: 'failed update this post'
                   });
                }
    
                if (!doc) {
                   return res.status(404).json({
                      message: 'Post not finded'
                   });
                }
       
                res.json({
                   success: true,
                   doc
                })
            })

    } catch(err) {
        console.log(err);
        res.status(500).json({
           message: 'failed added comment'
        });
    }
}



