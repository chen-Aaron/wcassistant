const getAllPerson = async (bot) => {
    try {
        const personList = await bot.Contact.findAll();
        return personList;
    } catch (e) {
        console.log('获取所有联系人失败,原因:', e)
    }
}

const findByName = async (bot, name) => {
    try {
        const person = await bot.Contact.find({
            alias: name
        })
        return person;

    } catch (e) {
        console.log('获取指定名称联系人失败，原因:', e);
    }
}

module.exports = {
    getAllPerson,
    findByName
};