const model = require("../model/index");
const { Op } = require("sequelize");
const controller = {};
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, tutorials, totalPages, currentPage };
  };
//read
controller.getAll = async function (req, res) {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const userData = await model.user.findAll({ limit:limit, offset:offset });
        console.log(userData)
        if (userData.length > 0) {
            res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
//create
controller.createNew = async function (req, res) {
    try {
        //   check data has already been created
        const checkData = await model.user.findAll({
        where: {
                phone: req.body.phone,
            },
        });
    if (checkData.length > 0) {
        res.status(500).json({ message: "phone number already in use" });
    } else {
        await model.user
            .create({
                phone: req.body.phone,
                name: req.body.name,
                job:req.body.job,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                name_contact_1: req.body.name_contact_1,
                phone_1: req.body.phone_1,
                relationship_1:req.body.relationship_1,
                name_contact_2:req.body.name_contact_1,
                phone_2: req.body.phone_2,
                relationship_2: req.body.relationship_2,
        })
        .then((result) => {
            res.status(201).json({
            message: "user successful created",data: {
                phone: req.body.phone,
                name: req.body.name,
                job:req.body.job,
                email: req.body.email,
                },
            });
        });
    }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
controller.getUsername = async function (req, res) {
    try {
        console.log(req.params.phone_no)
        var userData = await model.user.findAll({
        where: { phone: { [Op.like]: `%${req.body.phone}%` } },
        });
        if (userData.length > 0) {
            res
            .status(200)
            .json({ message: "Connection successful", data: userData });
        } else {
        res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
//update
controller.editAt = async function (req, res) {
    try {
        await model.user
            .findAll({ phone: { phone: req.body.old_phone } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.user.update(
                       {
                        phone: req.body.phone,
                        name: req.body.name,
                        job:req.body.job,
                        email: req.body.email,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        name_contact_1: req.body.name_contact_1,
                        phone_1: req.body.phone_1,
                        relationship_1:req.body.relationship_1,
                        name_contact_2:req.body.name_contact_1,
                        phone_2: req.body.phone_2,
                        relationship_2: req.body.relationship_2,
                        },
                        { where: { phone: req.body.old_phone } }
                    );
                    res.status(200).json({
                        message: "update successful",
                        data: {
                        id: req.body.id,
                        username: req.body.username,
                        password: req.body.password,
                        token: req.body.username + req.body.password,
                        },
                    });
                } else {
                    res.status(500).json({ message: "update failed" });
                }
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
//delete
controller.deleteUser = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { phone: req.body.phone } })
            .then(async (result) => {
        if (result.length > 0) {
            await model.user.destroy({ where: { phone: req.body.phone } });
            res.status(200).json({ message: "delete user successfully" });
        } else {
            res.status(404).json({ message: "user not found" });
            }
        });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
module.exports = controller;