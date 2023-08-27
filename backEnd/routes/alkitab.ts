import express, { Request, Response } from 'express';
const router = express.Router();

import alKitab from '../models/alKitab';


router.get(`/`, async (req: Request, res: Response) => {
  try {

    let query = {};
    let queryCondition = false;

    const pageSize = 20;
    const page = parseInt(req.query.page as string) || 1;
    const totalItems = await alKitab.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);

    let sort = {};
    const sortOptions = req.query.sortOptions as string || '';
    if (sortOptions) {
      let sortOpt = sortOptions.split('_');
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };

    }

    let categoryCondition = {};
    const categoryName = req.query.categoryName as string || '';
    if (categoryName) {
      queryCondition = true;
      const searchTerms = categoryName.split(/\s+/).map(term => {
        return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      });
      const regexPattern = new RegExp(searchTerms.join('|'), 'i');
      categoryCondition = {
        $or: [
          { category: regexPattern }, { description: regexPattern }
        ]
      };
    }


    const searchQuery = req.query.search as string || '';
  let searchQuertCondition = {};

  if (searchQuery) {
    queryCondition = true;
    const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = new RegExp(escapedSearchQuery, 'i');

    searchQuertCondition = {
      $or: [
        { title: regexPattern },
        
      ]
    };
  }

  if (queryCondition) {
    query = {
      $and: [
        categoryCondition,
        searchQuertCondition,

      ]
    };
  }


  const itemsList = await alKitab
    .find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  if (itemsList.length === 0) {
    res.status(404).json({ success: false, message: 'No alKitab found.' });
  } else {
    res.json({
      success: true,
      totalPages,
      currentPage: page,
      itemsList,
    });
  }
} catch (error) {
  res.status(500).json({ success: false });
}
});


router.get(`/item/:id`, async (req: Request, res: Response) => {
  try {
    const item = await alKitab.findById(req.params.id);
    console.log(item);

    if (!item) {
      res.status(404).json({ success: false, message: 'alKitab not found.' });
    } else {
      res.send(item);
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});


module.exports = router;