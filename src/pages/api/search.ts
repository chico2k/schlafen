import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../../sanity';

const groqQuery = `*[_type == "post" || _type == "product" || _type == "category"]
| score(
  [pt::text(body), title] match $searchQuery

  ||
  boost([pt::text(body), title] match $searchQuery + "*", 0.5)
)
| order(score desc) [0..4]
{
    _id,
    _type,
    title,
    "slug": slug.current,
}
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const query = req.query.q as string

    const result = await sanityClient.fetch(groqQuery, {
        searchQuery: query,
    });


    try {
        res.status(200).json({ result })
    } catch (error) {
        res.status(400).json({})
    }
}