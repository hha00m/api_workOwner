const Page = require('../models/page');
const PagePermisions = require('../models/pagePermisions');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.pageById = (req, res, next, id) => {
  Page.findById(id).exec((err, page) => {
    if (err || !page) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.page = page;
    next();
  });
};

exports.create = (req, res) => {
  const page = new Page(req.body);
  page.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.page);
};

const getSubPages = async (req, res) => {
  try {
    const page = await Page.findById(req.body.parent);
    const Pagep = new PagePermisions({ name: req.body.name });
    req.body.page === 'page1' ? page.page1 = Pagep :
      req.body.page === 'page2' ? page.page2 = Pagep :
        req.body.page === 'page3' ? page.page3 = Pagep :
          req.body.page === 'page4' ? page.page4 = Pagep :
            req.body.page === 'page5' ? page.page5 = Pagep :
              req.body.page === 'page6' ? page.page6 = Pagep :
                req.body.page === 'page7' ? page.page7 = Pagep :
                  req.body.page === 'page8' ? page.page8 = Pagep :
                    req.body.page === 'page9' ? page.page9 = Pagep :
                      req.body.page === 'page10' ? page.page10 = Pagep :
                        page.page11 = Pagep;

    page.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json(data);
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: errorHandler(err),
    })

  }

}

exports.addSubpage = (req, res) => {
  return getSubPages(req, res);

};


exports.update = (req, res) => {

  Page.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name, page1: req.body.page1, page2: req.body.page2,
      page3: req.body.page3, page4: req.body.page5, page2: req.body.page5,
      page6: req.body.page6, page7: req.body.page7, page8: req.body.page8,
      page9: req.body.page9, page10: req.body.page10, page11: req.body.page11
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};

exports.remove = (req, res) => {
  Page.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'page deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};


exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = req.query.name ? { $text: { $search: req.query.name } } : {}

  Page
    .find(query)
    // .skip(pageSize * current)
    // .limit(pageSize)
    .populate('page1', ' name update remove create read list -_id')
    .populate('page2', ' name update remove create read list')
    .populate('page3', ' name update remove create read list')
    .populate('page4', ' name update remove create read list')
    .populate('page5', ' name update remove create read list')
    .populate('page6', ' name update remove create read list')
    .populate('page7', ' name update remove create read list')
    .populate('page8', ' name update remove create read list')
    .populate('page9', ' name update remove create read list')
    .populate('page10', ' name update remove create read list')
    .populate('page11', ' name update remove create read list')
    .sort({ name: 1 })
    .then((pages) => {
      res.json({
        data: pages,
        success: true,
        current,
        pageSize,
        total: pages.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        error: 'page not found',
        success: false,
      })
    })

};
