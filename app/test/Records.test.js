const {Record,mongoose} = require('../models/Records');
const DB_CONNECTION = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true'
mongoose.connect(DB_CONNECTION, { promiseLibrary: global.Promise })

jest.setTimeout(10000)
test('query result length must be bigger than 0 ', async () => {
  expect.assertions(1)
  try {
    let testResponse = await Record.aggregate([
      {
        $match: {
          createdAt: {
            $gt: new Date('2016-11-01'),
            $lt: new Date('2016-11-03')
          }
        }
      },
      {
        $project: {
          key: 1,
          _id: 0,
          createdAt: 1,
          totalCount: {
            $sum: '$counts'
          }
        }
      }, {
        $match: {
          totalCount: {
            $gt: 40,
            $lt: 60
          }
        }
      }
    ])
    expect(testResponse.lenght).not.toBe(0)
    mongoose.connection.close()
  } catch (e) {
    console.log(e)
  }
})