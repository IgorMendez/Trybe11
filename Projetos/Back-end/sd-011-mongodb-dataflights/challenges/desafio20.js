db.voos.findOne({ rtk: { $not: { $exists: true } } }, { vooId: 1, _id: 0 });
