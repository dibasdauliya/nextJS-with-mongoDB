const nc = require('next-connect')
const { default: Product } = require('../../../models/Products')

const { connect, disconnect } = require('../../../utils/db')

const search = nc()

search.get(async (req, res) => {
  try {
    await connect()

    let result = await Product.aggregate([
      {
        $search: {
          index: 'titl_desc',
          text: {
            query: `${req.query.term}`,
            path: ['title', 'description'],
            fuzzy: {
              maxEdits: 2
            }
          },
          highlight: {
            path: ['title', 'description']
          }
        }
      },
      {
        $addFields: {
          highlights: {
            $meta: 'searchHighlights'
          }
        }
      }
    ])

    // let result = await Product.aggregate([
    //   {
    //     $search: {
    //       index: 'autocomplete_title_desc',
    //       compound: {
    //         should: [
    //           {
    //             autocomplete: {
    //               query: `${req.query.term}`,
    //               path: 'title',
    //               fuzzy: {
    //                 maxEdits: 2
    //               }
    //             },

    //             highlight: {
    //               path: 'title'
    //             }
    //           },
    //           {
    //             autocomplete: {
    //               query: `${req.query.term}`,
    //               path: 'description',
    //               fuzzy: {
    //                 maxEdits: 2
    //               }
    //             },
    //             highlight: {
    //               path: 'description'
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   },
    //   {
    //     $addFields: {
    //       highlights: {
    //         $meta: 'searchHighlights'
    //       }
    //     }
    //   }
    // ])
    await disconnect()
    res.send(result)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
  //   res.send({ message: 'seeded successfully' })
})

export default search
