const { users } = require('../models');

const userController = {
   
    getAllUsers(req, res) {
        users.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    getUserById({ params }, res) {
        users.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

  
    createUser({ body }, res) {
        users.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },



    updateUser({ params, body }, res) {
        users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

   
    deleteUser({ params }, res) {
        users.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
            })
            .then(() => {
                res.json({ message: 'user has been deleted.' });
            })
            .catch(err => res.status(400).json(err));
    },

    
    addFriend({ params }, res) {
        users.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

   
    deleteFriend({ params }, res) {
        users.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

}

module.exports = userController;