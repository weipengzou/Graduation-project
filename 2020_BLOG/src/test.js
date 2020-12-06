const axios = require('axios')
let testHttp = async () => {
  let res = await axios({
    url: 'https://zwp1.top:3000/auth/register',
    method: 'post',
    data: {
      account: 'testacc',
      password: 'testpwd',
    },
  })
  console.log('res', res)
}
testHttp()
