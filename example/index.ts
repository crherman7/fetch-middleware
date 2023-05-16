const {default: Api, middleware} = require('../src');

const api = new Api('https://cat-fact.herokuapp.com');

api.use(middleware.json);

api.request('facts').then((res: {}) => {
  console.log(res);
});
