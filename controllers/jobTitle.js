const JobTitle = require('../models/jobTitle');
const Page = require('../models/page');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.jobTitleById = (req, res, next, id) => {
  JobTitle.findById(id).exec((err, jobTitle) => {
    if (err || !jobTitle) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.jobTitle = jobTitle;
    next();
  });
};
const findPage = async (req, res) => {

  let i = 0;
  let pageslist = [];
  do {
    const page = await Page.findById(req.body.pages[i].value);
    pageslist.push(page);

    i++;
  } while (req.body.pages.length > i);

  const jobTitle = new JobTitle({ name: req.body.name, icon: req.body.icon, pages: pageslist });
  jobTitle.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
}
exports.create = (req, res) => {
  findPage(req, res)
};

exports.read = (req, res) => {
  return res.json(req.jobTitle);
};


exports.update = (req, res) => {

  JobTitle.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name, icon: req.body.icon
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};

exports.remove = (req, res) => {
  JobTitle.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'jobTitle deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};


exports.listPages = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = req.query.key ? { _id: req.query.key } : {}

  JobTitle
    .find(query)
    // .skip(pageSize * current)
    // .limit(pageSize)
    .populate('pages')
    .populate('pages.page1')
    .sort({ createdAt: 1 })
    .then((dataPages) => {
      const data = dataPages[0].pages
      res.json({
        data: data,
        success: true,
        current,
        pageSize,
        total: dataPages[0].pages.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        error: 'jobtitle not found',
        success: false,
      })
    })

};


exports.listJobTitles = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0



  JobTitle
    .find()
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select('name icon _id')
    .then((jobtitles) => {
      res.json({
        data: jobtitles,
        success: true,
        current,
        pageSize,
        total: jobtitles.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        error: 'jobtitle not found',
        success: false,
      })
    })
};
