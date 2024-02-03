const User = require("../models/User");


module.exports.changeName = async (req, res) => {
    const {email, name } = req.body;


    const user = req.user;

    try {
        const doc = await User.findOneAndUpdate(
            { email: email },  
            { name: name },
            { new: true }
        );
        console.log("1");

        doc.save();
        console.log("2");

        res.status(201).json(doc);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

module.exports.changePassword = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    if (!title || !category || !description || !date) {
        return req.status(400).json("Enter All Fields");
    }

    if (amount <= 0 || isNaN(amount)) {
        return req.status(400).json("Amount must be an positive integer");
    }

    const user = req.user;

    try {
        const user_id = user._id;
        console.log(user_id);
        const new_income = await Income.create({ title, amount, category, description, date, user: user_id });
        user.incomes.push(new_income._id);
        await user.save();

        res.status(201).json({ new_income, user });
    }
    catch (err) {

        res.status(500).json({ err });
    }
}
