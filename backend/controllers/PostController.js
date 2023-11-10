import PostModel from '../models/Post.js'


export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5);
        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'can not get tags'
        })
    }
}



export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'can not get posts'
        })
    }
}



export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).populate('user');

        if (!doc) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to get the post'
        });
    }
};



export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndDelete({ _id: postId });

        if (!doc) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to delete the post'
        });
    }
};


export const create = async (req, res) => {
    try {
        const doc = await new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });


        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'can not create post'
        })
    }
}


export const update = async(req, res) => {
    try{
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,   
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.body.user,
            tags: req.body.tags,
        },
        );
        res.json({
            success: true,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'can not update post'
        })
    }
}