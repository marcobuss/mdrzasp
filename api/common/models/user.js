var options = {
    relations: {
        entry: {
            model: Entry,
            type: hasMany,
            foreignKey: userId
        }
    }
};